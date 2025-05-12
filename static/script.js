document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const inputField = document.getElementById('binary-input');
    const checkButton = document.getElementById('check-btn');
    const errorMessage = document.getElementById('error-message');
    const exampleButtons = document.querySelectorAll('.example-btn');
    const states = document.querySelectorAll('.state');
    const resultMessage = document.getElementById('result-message');
    const pathDetails = document.getElementById('path-details');
    
    // Event listeners
    checkButton.addEventListener('click', processInput);
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') processInput();
    });
    
    exampleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            inputField.value = this.dataset.example;
            processInput();
        });
    });
    
    /**
     * Process the input string through the DFA
     */
    function processInput() {
        const input = inputField.value.trim();
        
        // Validate input
        if (!/^[01]*$/.test(input)) {
            showError('Please enter a valid binary string (only 0s and 1s allowed)');
            return;
        }
        
        // Clear previous state
        clearVisualization();
        hideError();
        
        // Send request to server
        fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input_string: input })
        })
        .then(response => response.json())
        .then(data => {
            displayResult(data);
            animateDFA(data.path, input);
        })
        .catch(error => {
            console.error('Error:', error);
            showError('An error occurred while processing your request');
        });
    }
    
    /**
     * Display the final result
     */
    function displayResult(data) {
        resultMessage.textContent = data.message;
        resultMessage.className = data.accepts ? 'success' : 'failure';
        
        // Build step-by-step explanation
        pathDetails.innerHTML = '';
        data.path.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step';
            
            const header = document.createElement('div');
            header.className = 'step-header';
            
            if (index === 0) {
                header.innerHTML = `<span class="step-state">Initial State: ${step.state}</span>`;
            } else {
                header.innerHTML = `
                    <span class="step-state">State: ${step.state}</span>
                    <span class="step-input">Input: '${step.input}'</span>
                `;
            }
            
            const message = document.createElement('div');
            message.className = 'step-message';
            message.textContent = step.message;
            
            stepDiv.appendChild(header);
            stepDiv.appendChild(message);
            pathDetails.appendChild(stepDiv);
        });
    }
    
    /**
     * Animate the DFA processing
     */
    function animateDFA(path, input) {
        let delay = 0;
        const stepDuration = 800;
        
        // Highlight each step with delay
        path.forEach((step, index) => {
            setTimeout(() => {
                // Highlight current state
                states.forEach(state => {
                    state.classList.remove('active', 'pulse');
                    if (state.id === step.state) {
                        state.classList.add('active', 'pulse');
                    }
                });
                
                // Highlight corresponding step in explanation
                const steps = document.querySelectorAll('.step');
                if (steps[index]) {
                    steps[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    steps[index].classList.add('pulse');
                    setTimeout(() => {
                        steps[index].classList.remove('pulse');
                    }, 500);
                }
                
            }, delay);
            
            // Increase delay for next step
            if (index < path.length - 1) {
                delay += stepDuration;
            }
        });
    }
    
    /**
     * Clear visualization and results
     */
    function clearVisualization() {
        states.forEach(state => state.classList.remove('active'));
        resultMessage.textContent = '';
        resultMessage.className = '';
        pathDetails.innerHTML = '';
    }
    
    /**
     * Show error message
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    /**
     * Hide error message
     */
    function hideError() {
        errorMessage.style.display = 'none';
    }
});