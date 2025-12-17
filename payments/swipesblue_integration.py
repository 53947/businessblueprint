class SwipesBlueGateway:
    def __init__(self):
        self.ready = False
    
    def initialize(self, api_key):
        """To be implemented with NMI/SwipesBlue docs"""
        self.ready = True
        return self.ready
    
    def process_payment(self, amount, details):
        if not self.ready:
            raise Exception("Gateway not initialized")
        # Implementation will be added tomorrow
        return {"status": "pending", "message": "SwipesBlue integration coming tomorrow"}
