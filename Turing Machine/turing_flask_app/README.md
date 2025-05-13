# Turing Machine Simulator
A web-based educational tool designed to simulate a Turing Machine that checks if a binary number is divisible by 3. 
The application provides an animated tape visualization, an interactive state transition diagram powered by D3.js,
a step-by-step computation table, and a detailed explanation of the process, making it ideal for learning about Turing Machines and automata theory.

## Features

Interactive Input: Enter binary strings (0s and 1s) to test for divisibility by 3.

Animated Tape Visualization: Displays the Turing Machine's tape with head movement animation.

Interactive State Diagram: Visualizes state transitions using D3.js, highlighting active states.

Step-by-Step Computation Table: Lists each step with state, head position, symbol read, and action.

Detailed Explanation: Provides a comprehensive breakdown of the Turing Machine's operation, including state meanings and transition rules.

Theme Toggle: Switch between light and dark themes, with preferences saved in local storage.

Error Handling: Validates input and displays clear error messages for invalid characters.

Responsive Design: Optimized for both desktop and mobile devices.


## Technologies Used

Backend: Python, Flask

Frontend: HTML, CSS, JavaScript

Visualization: D3.js (loaded via CDN)

Styling: Custom CSS with light/dark themes, Font Awesome icons (loaded via CDN)

Dependencies: Managed via Python requirements.txt (Flask, Werkzeug, Pandas)


## Installation

### Follow these steps to set up the project locally:
```bash
git clone https://github.com/Mohameddfxxcxx/turing-machine-simulator.git
cd turing-machine-simulator
```
### Set Up a Virtual Environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Install Dependencies:
```bash
pip install -r requirements.txt
```
Note: Ensure you have Python 3.8+ installed. 

### The requirements.txt includes:
```bash
flask==2.0.1
werkzeug==2.0.1
pandas>=2.1.0
```

## Verify Directory Structure: 
#### Ensure the following files are present:
```bash
turing-machine-simulator/
├── app.py
├── requirements.txt
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
└── README.md
```
Note: External libraries (D3.js, Font Awesome) are loaded via CDN in index.html.


## Usage

### Run the Application:
```bash
python app.py
```
The application will start in debug mode on http://127.0.0.1:5000.


### Access the Web Interface: Open a browser and navigate to http://127.0.0.1:5000.



## Interact with the Turing Machine:

Enter a binary string (e.g., "110" for 6 in decimal) in the input field and click "Run" or press Enter.

The application validates the input (only 0s and 1s allowed).

### View the results, including:

Tape Visualization: Animated tape showing head movement.

Result: Indicates if the number is divisible by 3 (e.g., 110 is divisible, 101 is not).

State Diagram: Animated D3.js diagram of state transitions.

Computation Steps: Table of each step’s details.

Explanation: Detailed breakdown with state meanings and mathematical transitions.

Toggle between light and dark themes using the button in the top-right corner.


## Project Structure
```bash
turing-machine-simulator/
├── app.py              # Flask application entry point and Turing Machine logic
├── requirements.txt    # Python dependencies
├── static/             # Static assets
│   ├── script.js       # Frontend JavaScript logic, including D3.js visualization
│   └── style.css       # CSS styling with light/dark themes
├── templates/          # HTML templates
│   └── index.html      # Main webpage with input form and visualizations
└── README.md           # Project documentation
```
