import jinja2
import os
from pathlib import Path

class AIService:
    def __init__(self):
        self.env = jinja2.Environment(loader=jinja2.FileSystemLoader('prompts/'))
    
    def generate_assessment(self, business_data):
        template = self.env.get_template('assessment_sporting_v1.jinja')
        prompt = template.render(**business_data)
        # Add your AI API call here
        # response = your_ai_api(prompt)
        return {"status": "success", "prompt": prompt}
    
    def generate_coaching(self, user_data):
        template = self.env.get_template('coach_sporting_v1.jinja')
        prompt = template.render(**user_data)
        # Add your AI API call here
        # response = your_ai_api(prompt)
        return {"status": "success", "prompt": prompt}
