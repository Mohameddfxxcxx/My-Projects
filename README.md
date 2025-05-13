# DFA 101 Substring Visualizer
A web-based educational tool designed to visualize how a Deterministic Finite Automaton (DFA) processes binary
strings to detect the substring "101". The application provides a step-by-step execution trace 
and animates the DFA's state transitions, making it ideal for learning automata theory.


## Features

Interactive Input: Enter binary strings (0s and 1s) to test against the DFA.

Step-by-Step Visualization: Displays the DFA's state transitions with detailed explanations.

Animated State Diagram: Highlights active states during processing.

Example Inputs: Predefined binary strings for quick testing.

Error Handling: Validates input and displays clear error messages for invalid characters.

Responsive Design: Works on both desktop and mobile devices.


## Technologies Used


Backend: Python, Flask

Frontend: HTML, CSS, JavaScript

Styling: Custom CSS with responsive design

Dependencies: Managed via Python requirements.txt



## Installation

### Follow these steps to set up the project locally:

#### Clone the Repository:

```bash
git clone https://github.com/your-username/dfa-101-visualizer.git
cd dfa-101-visualizer
```

#### Set Up a Virtual Environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies:
```bash
pip install -r requirements.txt
```
Note: Ensure you have Python 3.8+ installed.


## Verify Directory Structure: Ensure the following files are present:
```bash
dfa-101-visualizer/
├── app.py
├──26    ├── dfa_101.py
├── requirements.txt
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
└── README.md
```

### Usage

#### Run the Application:
```bash
python app.py
```
The application will start in debug mode on http://127.0.0.1:5000.

### Access the Web Interface: Open a browser and navigate to http://127.0.0.1:5000.

#### Interact with the DFA:

Enter a binary string in the input field and click "Run DFA" or press Enter.

Alternatively, click example buttons (e.g., "101", "0101") to test predefined inputs.

View the animated state transitions and detailed execution trace below the input section.


### Project Structure
```bash
dfa-101-visualizer/
├── app.py              # Flask application entry point
├── dfa_101.py          # DFA logic for recognizing "101"
├── requirements.txt    # Python dependencies
├── static/             # Static assets
│   ├── script.js       # Frontend JavaScript logic
│   └── style.css       # CSS styling
├── templates/          # HTML templates
│   └── index.html      # Main webpage
└── README.md           # Project documentation
```

