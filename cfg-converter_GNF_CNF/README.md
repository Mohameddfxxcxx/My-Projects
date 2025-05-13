# Grammar Converter
Grammar Converter is a powerful web-based educational tool designed to transform Context-Free Grammars (CFGs) into Chomsky Normal Form (CNF) or Greibach Normal Form (GNF).
It provides an interactive interface for students, educators, and researchers to explore formal language theory.
The application offers step-by-step grammar simplification, string parsing, example word generation, and test case creation to compare original and converted grammars. 
Built with a Flask backend and a React frontend, it combines robust computation with a user-friendly experience.


## Table of Contents

Features

Technologies Used

Prerequisites

Installation

Usage

Project Structur

Acknowledgments


## Features

#### Grammar Conversion:

Converts CFGs to Chomsky Normal Form (CNF) or Greibach Normal Form (GNF).

Displays a detailed simplification timeline with intermediate grammar states.

Handles complex grammars with left recursion and unit productions.


#### String Parsing:

Tests whether a given string is derived from the original or converted grammar.

Uses an Earley parser for efficient CFG parsing.

#### Example Word Generation:

Generates valid example words (default: 5) for both original and converted grammars.

Ensures unique and concise outputs for educational purposes.


#### Test Case Generation:

Creates test cases to compare acceptance/rejection behavior between grammars.

Identifies strings accepted or rejected by each grammar for validation.

#### Interactive Frontend:

Built with React for a dynamic and responsive user interface.

Supports real-time input validation and error messaging.

#### Robust Backend:

Powered by Flask with CORS support for flexible API access.

Handles grammar validation and conversion with custom exception handling.


#### Educational Value:

Ideal for learning automata theory, formal languages, and compiler design.

Includes detailed messages explaining each simplification step.



## Technologies Used

#### Backend

Python 3.8+: Core programming language.

Flask: Web framework for API and static file serving.

Flask-CORS: Enables cross-origin requests for frontend-backend communication.

NLTK: Used for parsing and grammar-related utilities.

Gunicorn: WSGI server for production deployment.



#### Frontend

React: JavaScript library for building the user interface (assumed based on client/build).

HTML/CSS: Static assets served from client/build.

JavaScript: Handles frontend logic and API interactions.


#### Dependencies

Managed via requirements.txt (see Installation).

Key libraries: click, jinja2, werkzeug, python-dotenv, nltk.


## Prerequisites

Python 3.8+: Install from python.org.

Node.js 16+ (if rebuilding the frontend): Install from nodejs.org.

Git: For cloning the repository.

pip: Python package manager (included with Python).

Virtual Environment: Recommended for dependency isolation.


## Installation

Follow these steps to set up the Grammar Converter locally:

#### Clone the Repository:
```bash
git clone https://github.com/Mohameddfxxcxx/My-Projects.git
cd grammar-converte
```

#### Set Up a Virtual Environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Python Dependencies:
```bash
pip install -r requirements.txt
```
The requirements.txt 

### includes:
```bash
click==8.1.3
Flask==2.2.2
Flask-Cors==3.0.10
gunicorn==20.1.0
importlib-metadata==4.12.0
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.1
python-dotenv==0.21.0
six==1.16.0
Werkzeug==2.2.2
zipp==3.8.1
attrs~=21.4.0
wheel~=0.36.2
retry~=0.9.2
py~=1.11.0
tornado~=6.1
ipython~=7.16.1
decorator~=5.1.1
setuptools==65.3.0
nltk~=3.7
```
#### (Optional) Build the Frontend:
If you have the React source code in client/:
```bash
cd client
npm install
npm run build
cd ..
```
Ensure the client/build folder contains index.html and static assets.

#### Verify Directory Structure:
```bash
grammar-converter/
├── server.py
├── requirements.txt
├── client/
│   └── build/
│       ├── index.html
│       └── static/
├── converter/
│   ├── Chomsky.py
│   ├── Converter.py
│   ├── Exceptions.py
│   ├── Grammar.py
│   ├── Greibach.py
│   ├── Parser.py
│   ├── Rule.py
│   ├── TestcaseGenerator.py
│   └── util.py
└── README.md
```

## Troubleshooting:

If pip install fails, ensure pip is up-to-date: pip install --upgrade pip.

If NLTK requires additional data, run python -m nltk.downloader all in the virtual environment.

## Usage

#### Run the Application:
```bash
python server.py
```
The server starts in debug mode on http://127.0.0.1:4999.

#### Access the Web Interface:

Open a browser and navigate to http://127.0.0.1:4999.

### Interact with the Grammar Converter:

#### Input a Grammar:

#### Enter a CFG in JSON format, e.g.:
```bash
[
  {"lhs": "S", "rhs": ["aS", "b"]},
  {"lhs": "A", "rhs": ["aA", "ε"]}
]
```
The grammar must be a valid CFG (single non-terminal on LHS).



### Select Conversion Form:

Choose Chomsky Normal Form (1) or Greibach Normal Form (2).



#### Convert:

Click the convert button to process the grammar.

View the simplification timeline and final converted grammar.



#### Test Strings:

Enter a string (e.g., "aab") to check if it’s derived from the original or converted grammar.

Results show acceptance status for both grammars.


#### Generate Example Words:

Request example words (default: 5) to see valid derivations.

Compare outputs from original and converted grammars.


#### Generate Test Cases:

Create test cases to validate grammar equivalence.

View strings accepted/rejected by each grammar.



## Project Structure
```bash
grammar-converter/
├── server.py                   # Flask application entry point
├── requirements.txt            # Python dependencies
├── client/                     # React frontend source (assumed)
│   └── build/                  # Built static files
│       ├── index.html          # Main HTML file
│       └── static/             # CSS, JS, and other assets
├── converter/                  # Core grammar conversion logic
│   ├── Chomsky.py              # Chomsky Normal Form conversion
│   ├── Converter.py            # Abstract converter base class
│   ├── Exceptions.py           # Custom exceptions (e.g., GrammarIsNotCFG)
│   ├── Grammar.py              # CFG representation and utilities
│   ├── Greibach.py             # Greibach Normal Form conversion
│   ├── Parser.py               # Earley parser for string testing
│   ├── Rule.py                 # Grammar rule representation
│   ├── TestcaseGenerator.py    # Test case generation logic
│   └── util.py                 # Utility functions (e.g., symbol detection)
└── README.md                   # Project documentation
```

## Acknowledgments

Tutorials: The Greibach Normal Form conversion is inspired by these YouTube tutorials by Neso Academy.

Contributors: Thanks to all who contribute to improving this tool.

Open Source: Built with amazing libraries like Flask, NLTK, and React.
