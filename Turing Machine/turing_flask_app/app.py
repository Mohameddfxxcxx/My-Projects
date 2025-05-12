# Flask web application for a Turing Machine that checks binary number divisibility by 3
# Features: Animated tape visualization, interactive state transition diagram, step-by-step explanation
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

class TuringMachine:
    def __init__(self, tape):
        # Initialize the Turing Machine with the input binary string
        self.tape = list(tape)  # Tape as a list of characters (0, 1)
        self.head = 0           # Tape head starts at position 0
        self.state = 'q0'       # Initial state (remainder 0)
        self.step_count = 0     # Track number of steps
        self.history = []       # Store computation history for visualization
        self.transitions = {    # Define state transition rules
            ('q0', '0'): ('q0', 'R'),
            ('q0', '1'): ('q1', 'R'),
            ('q0', 'B'): ('qAccept', 'R'),
            ('q1', '0'): ('q2', 'R'),
            ('q1', '1'): ('q0', 'R'),
            ('q1', 'B'): ('qReject', 'R'),
            ('q2', '0'): ('q1', 'R'),
            ('q2', '1'): ('q2', 'R'),
            ('q2', 'B'): ('qReject', 'R'),
        }
    
    def step(self):
        # Execute one step of the Turing Machine
        # Get current symbol (B for blank if out of bounds)
        current_symbol = self.tape[self.head] if 0 <= self.head < len(self.tape) else 'B'
        
        # Get transition rule based on current state and symbol
        transition = self.transitions.get((self.state, current_symbol), None)
        
        # Record step details for animation and explanation
        self.history.append({
            'step': self.step_count,
            'head': self.head,
            'state': self.state,
            'symbol': current_symbol,
            'action': f"Read '{current_symbol}', state {self.state}",
            'animation_delay': self.step_count * 0.5  # Delay for animation (seconds)
        })
        
        if transition:
            new_state, move = transition
            self.state = new_state
            # Move head based on transition rule
            if move == 'R':
                self.head += 1
            elif move == 'L':
                self.head -= 1
            # Update action description
            self.history[-1]['action'] += f" → Move {move}, new state {new_state}"
        
        self.step_count += 1
    
    def run(self):
        # Run the Turing Machine until it reaches an accept or reject state
        while self.state not in ('qAccept', 'qReject'):
            self.step()
        
        # Record final state
        self.history.append({
            'step': self.step_count,
            'head': self.head,
            'state': self.state,
            'symbol': '',
            'action': f"Final state: {self.state}",
            'animation_delay': self.step_count * 0.5
        })
        
        return self.state == 'qAccept'

    def get_transition_data(self):
        # Return transition data for D3.js state diagram
        nodes = set()
        links = []
        for (state, symbol), (new_state, move) in self.transitions.items():
            nodes.add(state)
            nodes.add(new_state)
            links.append({
                'source': state,
                'target': new_state,
                'label': f"{symbol}/{move}"
            })
        return {
            'nodes': [{'id': node} for node in nodes],
            'links': links
        }

@app.route('/')
def index():
    # Render the main page
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    # Handle form submission and process binary input
    binary_input = request.form['binary_input']
    
    # Validate input (only 0s and 1s allowed)
    if not binary_input or not all(c in '01' for c in binary_input):
        return jsonify({
            'error': 'Invalid input. Please enter a binary number (0s and 1s only).'
        })
    
    # Initialize and run the Turing Machine
    tm = TuringMachine(binary_input)
    is_divisible = tm.run()
    transition_data = tm.get_transition_data()
    
    # Prepare response data for the frontend
    response = {
        'input': binary_input,
        'is_divisible': is_divisible,
        'history': tm.history,
        'transition_data': transition_data,
        'explanation': generate_explanation(binary_input, is_divisible, tm.history)
    }
    
    return jsonify(response)

def generate_explanation(binary_input, is_divisible, history):
    # Generate a detailed HTML explanation of the Turing Machine's operation
    explanation = []
    
    # Introduction
    explanation.append(f"<h3>Analysis of Binary Number: {binary_input}</h3>")
    explanation.append("<p>This Turing Machine checks if a binary number is divisible by 3 by tracking the remainder as it reads each digit.</p>")
    
    # State meanings
    explanation.append("<h4>State Meanings:</h4>")
    explanation.append("<ul>")
    explanation.append("<li><strong>q0</strong>: Current remainder is 0 (divisible by 3)</li>")
    explanation.append("<li><strong>q1</strong>: Current remainder is 1</li>")
    explanation.append("<li><strong>q2</strong>: Current remainder is 2</li>")
    explanation.append("<li><strong>qAccept</strong>: Input is divisible by 3</li>")
    explanation.append("<li><strong>qReject</strong>: Input is not divisible by 3</li>")
    explanation.append("</ul>")
    
    # Transition rules with mathematical explanation
    explanation.append("<h4>Transition Rules:</h4>")
    explanation.append("<p>For each digit read, the machine updates the remainder state:</p>")
    explanation.append("<ul>")
    explanation.append("<li>In state q0 (remainder 0):")
    explanation.append("<ul>")
    explanation.append("<li>Read '0' → stay in q0 (0×2+0=0, still divisible by 3)</li>")
    explanation.append("<li>Read '1' → move to q1 (0×2+1=1, remainder 1)</li>")
    explanation.append("</ul></li>")
    explanation.append("<li>In state q1 (remainder 1):")
    explanation.append("<ul>")
    explanation.append("<li>Read '0' → move to q2 (1×2+0=2, remainder 2)</li>")
    explanation.append("<li>Read '1' → move to q0 (1×2+1=3, remainder 0)</li>")
    explanation.append("</ul></li>")
    explanation.append("<li>In state q2 (remainder 2):")
    explanation.append("<ul>")
    explanation.append("<li>Read '0' → move to q1 (2×2+0=4, remainder 1)</li>")
    explanation.append("<li>Read '1' → stay in q2 (2×2+1=5, remainder 2)</li>")
    explanation.append("</ul></li>")
    explanation.append("</ul>")
    
    # Step-by-step computation history
    explanation.append("<h4>Computation Steps:</h4>")
    explanation.append("<ol>")
    for step in history[:-1]:
        explanation.append(f"<li>{step['action']}</li>")
    explanation.append(f"<li>{history[-1]['action']}</li>")
    explanation.append("</ol>")
    
    # Conclusion with decimal conversion
    explanation.append("<h4>Conclusion:</h4>")
    if is_divisible:
        explanation.append(f"<p class='result-accept'>The binary number {binary_input} (<strong>{int(binary_input, 2)} in decimal</strong>) is divisible by 3.</p>")
    else:
        explanation.append(f"<p class='result-reject'>The binary number {binary_input} (<strong>{int(binary_input, 2)} in decimal</strong>) is not divisible by 3.</p>")
    
    return "\n".join(explanation)

if __name__ == '__main__':
    # Run the Flask application in debug mode
    app.run(debug=True)