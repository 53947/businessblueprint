import jinja2
import os
from pathlib import Path

class AIService:
    def __init__(self):
        self.env = jinja2.Environment(loader=jinja2.FileSystemLoader('prompts/'))

    def generate_assessment(self, business_data):
        template = self.env.get_template('assessment_sporting_v1.jinja')
        prompt = template.render(**