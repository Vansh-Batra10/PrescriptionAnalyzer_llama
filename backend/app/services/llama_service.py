from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM

class LlamaService:
    def __init__(self):
        self.model = OllamaLLM(model="llama2")

    def extract_prescription(self, prescription_text: str) -> dict:
        prescription_template = """
        You are a medical assistant AI. Extract the following details from the prescription text and return it as JSON.

        Prescription Text:
        {text}

        JSON format:
        {
            "Patient Name": "<Patient Name>",
            "Complaints": "<Complaints>",
            "Vital Signs": {
                "BP": "<BP value>",
                "Pulse": "<Pulse rate>",
                "Temperature": "<Temperature>"
            },
            "Diagnosis": "<Diagnosis>",
            "Medicines": [
                {
                    "Name": "<Medicine Name>",
                    "Dose": "<Dosage>",
                    "Frequency": "<Frequency>",
                    "Duration": "<Duration>",
                    "Quantity": "<Quantity>",
                    "Composition": "<Composition>"
                }
            ]
        }
        """
        prescription_prompt = ChatPromptTemplate.from_template(prescription_template)
        formatted_prompt = {"text": prescription_text}
        chain = prescription_prompt | self.model
        response = chain.invoke(formatted_prompt)
        return response
