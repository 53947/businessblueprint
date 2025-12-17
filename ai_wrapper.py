import emergency_constraint

def generate_ai_response(prompt):
    # Replace with your actual AI call
    from your_ai_module import generate
    raw_response = generate(prompt)
    return emergency_constraint.harden_response(raw_response)
