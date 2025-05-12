class DFA_101:
    """
    A Deterministic Finite Automaton (DFA) that recognizes strings containing
    the substring "101" with step-by-step processing capability.
    """
    def __init__(self):
        # Define DFA components
        self.states = {"q0", "q1", "q2", "q3"}
        self.alphabet = {"0", "1"}
        self.transitions = {
            "q0": {"0": ("q0", "Remained in q0 (no progress towards '101')"), 
                   "1": ("q1", "Moved to q1 (saw '1')")},
            "q1": {"0": ("q2", "Moved to q2 (saw '10')"), 
                   "1": ("q1", "Remained in q1 (still waiting for '0')")},
            "q2": {"0": ("q0", "Reset to q0 (pattern broken)"), 
                   "1": ("q3", "Moved to q3 (found '101'!)")},
            "q3": {"0": ("q3", "Stayed in accepting state q3"), 
                   "1": ("q3", "Stayed in accepting state q3")}
        }
        self.start_state = "q0"
        self.accept_states = {"q3"}

    def accepts(self, input_string):
        """Check if the input string contains '101' and return the path taken."""
        current_state = self.start_state
        path = [{
            'state': current_state,
            'input': '',
            'message': f"Started in {current_state}"
        }]
        
        for i, char in enumerate(input_string):
            if char not in self.alphabet:
                return {
                    'accepts': False,
                    'path': path,
                    'message': f"Invalid character '{char}' in input"
                }
            
            next_state, message = self.transitions[current_state][char]
            path.append({
                'state': next_state,
                'input': char,
                'message': f"Step {i+1}: Read '{char}' - {message}"
            })
            current_state = next_state
        
        return {
            'accepts': current_state in self.accept_states,
            'path': path,
            'message': "Accepted! Found '101'" if current_state in self.accept_states 
                      else "Rejected: Never reached accepting state q3"
        }