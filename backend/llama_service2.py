# llama_service2.py
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM
import json
from sqlalchemy.orm import Session
from models import vitals, prescriptions, medicines, reports
import re



class PersonalizedLlamaService:
    def __init__(self, db: Session):
        self.model = OllamaLLM(model="llama2")
        self.db = db

    def get_patient_context(self, user_id: int) -> dict:
            # Fetch patient's vitals, prescriptions, medicines, and reports
            vitals_data = self.db.query(vitals).filter(vitals.c.user_id == user_id).all()
            prescriptions_data = self.db.query(prescriptions).filter(prescriptions.c.user_id == user_id).all()
            medicines_data = self.db.query(medicines).filter(medicines.c.user_id == user_id).all()
            reports_data = self.db.query(reports).filter(reports.c.user_id == user_id).all()
            
            # Format the context data with diagnosis included in prescriptions
            context = {
                "Vitals": [
                    {
                        "bp": v.bp,
                        "pulse": v.pulse,
                        "temperature": v.temperature,
                        "date": v.date.isoformat(),
                        "prescription_id": v.prescription_id
                    } for v in vitals_data
                ],
                "Prescriptions": [
                    {
                        "id": p.id,
                        "name": p.name,
                        "diagnosis": p.diagnosis,  # Include diagnosis here
                        "date": p.date.isoformat()
                    } for p in prescriptions_data
                ],
                "Medicines": [
                    {
                        "name": m.name,
                        "dose": m.dose,
                        "frequency": m.frequency,
                        "duration": m.duration,
                        "quantity": m.quantity,
                        "date": m.date.isoformat(),
                        "prescription_id": m.prescription_id
                    } for m in medicines_data
                ],
                "Reports": [
                    {
                        "name": r.name,
                        "url": r.url
                    } for r in reports_data
                ]
            }
            print(context)
            return context
    def format_response(self, response_text):
        # Convert numbered lists (1. , 2. , etc.) into <li> tags with a <ol> wrapper
        formatted_text = re.sub(r'^\d+\.\s(.+)$', r'<li>\1</li>', response_text, flags=re.MULTILINE)
        
        # Check if the response starts with numbers to wrap it in an ordered list
        if "<li>" in formatted_text:
            formatted_text = f"<ol>{formatted_text}</ol>"
        
        # Additionally, if using "*" for bullets, handle those as well
        formatted_text = re.sub(r'^\*\s(.+)$', r'<li>\1</li>', formatted_text, flags=re.MULTILINE)
        if "<li>" in formatted_text:
            formatted_text = f"<ul>{formatted_text}</ul>"
        
        return formatted_text

    def generate_response(self, user_id: int, question: str) -> str:
        # Get patient-specific context
        patient_context = self.get_patient_context(user_id)
        print(patient_context)
        # Generate prompt with context and question as a single string
        prompt = f"""
        You are a medical assistant AI. A patient has the following medical data:
        {json.dumps(patient_context, indent=2)}

        Patient's question:
        {question}

        Provide a clear, structured response with numbered or bullet points, without any conversational tone. Avoid using phrases like "Good day" or placeholders like Patient's Name"
        """

        print(prompt)
        # Pass the prompt as a string directly to invoke
        response = self.model.invoke(prompt)
        formatted_response = self.format_response(response)
        print(formatted_response)
        return formatted_response
