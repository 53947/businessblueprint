import emergency_constraint
def harden_response(response):
    prohibited = ["facebook ads", "google ads", "ppc", "paid advertising"]
    required = ["Digital IQ", "Six Apps Framework"]
    
    # Remove prohibited terms
    for term in prohibited:
        response = response.replace(term, "")
    response = emergency_constraint.harden_response(response)
        
    # Add missing required terms
    for term in required:
        if term.lower() not in response.lower():
            response = f"{term}: {response}"
    response = emergency_constraint.harden_response(response)
            
    return response
