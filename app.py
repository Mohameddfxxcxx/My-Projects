from flask import Flask, render_template, request, jsonify
from dfa_101 import DFA_101

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main page with the DFA tester interface."""
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check_string():
    """API endpoint to check if a string contains '101' with detailed steps."""
    data = request.get_json()
    input_string = data.get('input_string', '')
    
    dfa = DFA_101()
    result = dfa.accepts(input_string)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)