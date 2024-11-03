from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM
import json
class LlamaService:
    def __init__(self):
        self.model = OllamaLLM(model="llama2")

    def extract_prescription(self, prescription_text: str) -> dict:
        # Template with fully escaped JSON braces to avoid variable interpretation
        prescription_template = """
You are a medical assistant AI. Your task is to extract relevant details from the provided prescription text and return the result strictly as structured JSON. Do not include any notes, explanations, or additional text — only return the JSON.

Prescription Text:
{text}

Strictly Return the following JSON format:
{{
    "Patient Name": "<Patient Name>",
    "Complaints": "<Complaints>",
    "Vital Signs": {{
        "BP": "<BP value>",
        "Pulse": "<Pulse rate>",
        "Temperature": "<Temperature>"
    }},
    "Diagnosis": "<Diagnosis>",
    "Medicines": [
        {{
            "Name": "<Medicine Name>",
            "Dose": "<Dosage>",
            "Frequency": "<Frequency>",
            "Duration": "<Duration>",
            "Quantity": "<Quantity>",
            "Composition": "<Composition>"
        }}
        // If there are more medicines, list them in the same format.
    ]
}}
Ensure the output is formatted properly as valid JSON.
        """

        # Create a prompt template
        prescription_prompt = ChatPromptTemplate.from_template(prescription_template)

        # Format the input prompt with the prescription text
        formatted_prompt = {"text": prescription_text}

        # Chain the prompt and model together
        chain = prescription_prompt | self.model

        # Generate the response using the LLaMA2 model
        response = chain.invoke(formatted_prompt)
        print(response)
        try:
            extracted_data = json.loads(response)  # Parse the response as JSON
        except json.JSONDecodeError:
            # logging.error("Failed to parse response as JSON: %s", response)
            raise ValueError("The response from LlamaService is not valid JSON.")

        return extracted_data
        # Return the generated response as JSON
        # return response
