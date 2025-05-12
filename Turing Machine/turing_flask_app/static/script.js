// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // DOM element references
    const runBtn = document.getElementById('run_btn');
    const binaryInput = document.getElementById('binary_input');
    const errorMessage = document.getElementById('error_message');
    const resultsSection = document.getElementById('results_section');
    const tapeContainer = document.getElementById('tape_container');
    const resultContent = document.getElementById('result_content');
    const stepsBody = document.getElementById('steps_body');
    const explanationContent = document.getElementById('explanation_content');
    const themeToggleBtn = document.getElementById('theme_toggle_btn');
    const stateDiagramSvg = d3.select('#state_diagram');

    // Initialize theme based on user preference or default to light
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Theme toggle event listener
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Run button and Enter key event listeners
    runBtn.addEventListener('click', processInput);
    binaryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processInput();
        }
    });

    function processInput() {
        const input = binaryInput.value.trim();
        
        // Validate input
        if (!input) {
            showError('Please enter a binary number');
            return;
        }
        
        if (!/^[01]+$/.test(input)) {
            showError('Input must contain only 0s and 1s');
            return;
        }
        
        clearError();
        
        // Show loading state
        runBtn.disabled = true;
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Send request to server
        fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `binary_input=${encodeURIComponent(input)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error);
                return;
            }
            
            displayResults(data);
        })
        .catch(error => {
            showError('An error occurred while processing your request');
            console.error('Error:', error);
        })
        .finally(() => {
            runBtn.disabled = false;
            runBtn.innerHTML = '<i class="fas fa-play"></i> Run';
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        resultsSection.style.display = 'none';
    }

    function clearError() {
        errorMessage.textContent = '';
    }

    function displayResults(data) {
        // Show results section
        resultsSection.style.display = 'block';
        
        // Animate tape visualization
        animateTape(data.input, data.history);
        
        // Display result with animation
        resultContent.style.opacity = '0';
        resultContent.innerHTML = data.is_divisible ? `
            <div class="result-accept">
                <i class="fas fa-check-circle"></i> The binary number ${data.input} 
                (${parseInt(data.input, 2)} in decimal) is divisible by 3.
            </div>
        ` : `
            <div class="result-reject">
                <i class="fas fa-times-circle"></i> The binary number ${data.input} 
                (${parseInt(data.input, 2)} in decimal) is not divisible by 3.
            </div>
        `;
        setTimeout(() => {
            resultContent.style.transition = 'opacity 0.5s';
            resultContent.style.opacity = '1';
        }, 100);
        
        // Render and animate state diagram
        renderStateDiagram(data.transition_data, data.history);
        
        // Render computation steps with animation
        renderStepsTable(data.history);
        
        // Display explanation
        explanationContent.innerHTML = data.explanation;
        
        // Scroll to results smoothly
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    function animateTape(input, history) {
        tapeContainer.innerHTML = '';
        const tape = input.split('');
        
        // Determine tape bounds
        const headPositions = history.map(step => step.head);
        const minPos = Math.min(...headPositions, 0);
        const maxPos = Math.max(...headPositions, tape.length - 1);
        
        // Create tape cells
        for (let i = minPos; i <= maxPos; i++) {
            const cell = document.createElement('div');
            cell.className = 'tape-cell';
            cell.textContent = (i >= 0 && i < tape.length) ? tape[i] : 'B';
            if (i < 0 || i >= tape.length) {
                cell.classList.add('blank');
            }
            tapeContainer.appendChild(cell);
        }

        // Animate head movement
        history.forEach((step, index) => {
            if (index < history.length - 1) { // Skip final state
                setTimeout(() => {
                    // Clear previous active cell
                    const prevActive = tapeContainer.querySelector('.active');
                    if (prevActive) {
                        prevActive.classList.remove('active');
                    }
                    
                    // Set new active cell
                    const cellIndex = step.head - minPos;
                    const cell = tapeContainer.children[cellIndex];
                    if (cell) {
                        cell.classList.add('active');
                        cell.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    }
                }, step.animation_delay * 1000); // Convert seconds to milliseconds
            }
        });
    }

    function renderStepsTable(history) {
        stepsBody.innerHTML = '';
        
        history.forEach(step => {
            const row = document.createElement('tr');
            
            // Highlight final state row
            if (step.action.includes('Final state')) {
                row.className = step.state === 'qAccept' ? 'accept-row' : 'reject-row';
            }
            
            row.innerHTML = `
                <td>${step.step}</td>
                <td>${step.head}</td>
                <td>${step.state}</td>
                <td>${step.symbol || ''}</td>
                <td>${step.action}</td>
            `;
            
            stepsBody.appendChild(row);
        });
    }

    function renderStateDiagram(transitionData, history) {
        // Clear previous diagram
        stateDiagramSvg.selectAll('*').remove();

        // Set SVG dimensions
        const width = 600;
        const height = 400;
        stateDiagramSvg.attr('viewBox', `0 0 ${width} ${height}`);

        // Define nodes and links
        const nodes = transitionData.nodes;
        const links = transitionData.links;

        // Initialize force simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));

        // Draw links
        const link = stateDiagramSvg.append('g')
            .selectAll('path')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'state-link')
            .attr('fill', 'none')
            .attr('stroke', '#999')
            .attr('stroke-width', 2);

        // Draw link labels
        const linkLabel = stateDiagramSvg.append('g')
            .selectAll('text')
            .data(links)
            .enter()
            .append('text')
            .attr('class', 'link-label')
            .attr('fill', 'var(--text-color)')
            .attr('font-size', '12px')
            .text(d => d.label);

        // Draw nodes
        const node = stateDiagramSvg.append('g')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'state-node');

        node.append('circle')
            .attr('r', 20)
            .attr('fill', d => d.id === 'qAccept' ? 'var(--accept-color)' : d.id === 'qReject' ? 'var(--reject-color)' : '#3498db');

        node.append('text')
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(d => d.id);

        // Update positions on simulation tick
        simulation.on('tick', () => {
            link.attr('d', d => {
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
                return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
            });

            linkLabel
                .attr('x', d => (d.source.x + d.target.x) / 2)
                .attr('y', d => (d.source.y + d.target.y) / 2);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Animate state transitions based on history
        history.forEach((step, index) => {
            if (index < history.length - 1) {
                setTimeout(() => {
                    // Clear previous active states
                    node.classed('active', false);
                    link.classed('active', false);

                    // Highlight current state
                    node.filter(d => d.id === step.state).classed('active', true);

                    // Highlight transition (if any)
                    const nextStep = history[index + 1];
                    if (nextStep) {
                        const currentLink = links.find(l => l.source.id === step.state && l.target.id === nextStep.state);
                        if (currentLink) {
                            link.filter(d => d.source.id === currentLink.source.id && d.target.id === currentLink.target.id)
                                .classed('active', true);
                        }
                    }
                }, step.animation_delay * 1000);
            }
        });
    }
});