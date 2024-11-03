# from fastapi import FastAPI, Depends, UploadFile, File
# from auth import router as auth_router
# # from backend.app.core.dependencies import get_current_user
# from database import engine, metadata
# from models import vitals, medicines, reports
# from sqlalchemy.orm import sessionmaker
# import shutil
# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI()
# origins = [
#     "http://localhost:3000",  # Replace with the actual origin of your frontend
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all HTTP methods, including OPTIONS
#     allow_headers=["*"],  # Allows all headers
# )

# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# import jwt

# security = HTTPBearer()
# SECRET_KEY = "your_secret_key"

# def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     token = credentials.credentials
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
#         user_id = payload.get('user_id')
#         if user_id is None:
#             raise HTTPException(status_code=401, detail='Invalid token')
#         return user_id
#     except jwt.PyJWTError:
#         raise HTTPException(status_code=401, detail='Invalid token')

# app.include_router(auth_router)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# metadata.create_all(engine)

# @app.get('/api/vitals')
# def get_vitals(user_id: int = Depends(get_current_user)):
#     db = SessionLocal()
#     user_vitals = db.query(vitals).filter(vitals.c.user_id == user_id).order_by(vitals.c.date.desc()).first()
#     return {
#         'bp': user_vitals.bp,
#         'pulse': user_vitals.pulse,
#         'temperature': user_vitals.temperature
#     }

# @app.get('/api/vitals/history')
# def get_vitals_history(user_id: int = Depends(get_current_user)):
#     db = SessionLocal()
#     vitals_history = db.query(vitals).filter(vitals.c.user_id == user_id).all()
#     bp_history = [{'date': v.date, 'systolic': v.bp.split('/')[0], 'diastolic': v.bp.split('/')[1]} for v in vitals_history]
#     return {'bpHistory': bp_history}

# @app.get('/api/medicines')
# def get_medicines(user_id: int = Depends(get_current_user)):
#     db = SessionLocal()
#     meds = db.query(medicines).filter(medicines.c.user_id == user_id).all()
#     return [{'name': m.name, 'dose': m.dose, 'frequency': m.frequency, 'duration': m.duration} for m in meds]

# @app.get('/api/reports')
# def get_reports(user_id: int = Depends(get_current_user)):
#     db = SessionLocal()
#     user_reports = db.query(reports).filter(reports.c.user_id == user_id).all()
#     return [{'name': r.name, 'url': r.url} for r in user_reports]

# # @app.post('/prescriptions/upload')
# # def upload_report(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
# #     file_location = f"files/{file.filename}"
# #     with open(file_location, "wb+") as file_object:
# #         shutil.copyfileobj(file.file, file_object)
# #     db = SessionLocal()
# #     new_report = reports.insert().values(user_id=user_id, name=file.filename, url=file_location)
# #     db.execute(new_report)
# #     db.commit()
# #     return {'info': 'Report uploaded'}

# @app.post('/api/chatbot')
# def chatbot_interaction(message: str, user_id: int = Depends(get_current_user)):
#     # Integrate your LLM or chatbot logic here
#     # For now, we'll return a placeholder response
#     reply = f"You said: {message}"
#     return {'reply': reply}
# from typing import List, Dict
# @app.get("/extracted-medicines")
# async def get_extracted_medicines() -> Dict[str, List[Dict[str, str]]]:
#     # Placeholder response with an empty list of medicines
#     return {"medicines": []}


# from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
# from app.services.llama_service import LlamaService
# # from app.core.dependencies import get_current_user
# import PyPDF2
# from fastapi import Depends, HTTPException, status
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# import jwt

# llama_service = LlamaService()
# security = HTTPBearer()
# SECRET_KEY = "your_secret_key"

# def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     token = credentials.credentials
#     print("Received token in FastAPI:", token)  # Log token to debug
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
#         user_id = payload.get('user_id')
#         if user_id is None:
#             raise HTTPException(status_code=401, detail='Invalid token')
#         print("Decoded user_id:", user_id)  # Log user_id to debug
#         return user_id
#     except jwt.PyJWTError as e:
#         print(f"Token decoding error: {e}")
#         raise HTTPException(status_code=401, detail='Invalid token')

# import os
# @app.post('/prescriptions/upload')
# def upload_report(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
#     # Ensure the directory exists
    
#     file_directory = "files"
#     os.makedirs(file_directory, exist_ok=True)  # Create the directory if it doesn’t exist

#     file_location = f"{file_directory}/{file.filename}"
#     with open(file_location, "wb+") as file_object:
#         shutil.copyfileobj(file.file, file_object)

#     db = SessionLocal()
#     new_report = reports.insert().values(user_id=user_id, name=file.filename, url=file_location)
#     db.execute(new_report)
#     db.commit()
#     if not file.filename.endswith(".pdf"):
#         raise HTTPException(status_code=400, detail="Only PDF files are supported")

#     # Extract text from the uploaded PDF
#     pdf_reader = PyPDF2.PdfReader(file.file)
#     prescription_text = ""
#     for page in pdf_reader.pages:
#         prescription_text += page.extract_text()

#     # Use LLaMA service to extract structured prescription data
#     extracted_data = llama_service.extract_prescription(prescription_text)

#     return {"extracted_data": extracted_data}
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from auth import router as auth_router
from database import engine, metadata, SessionLocal
from models import vitals, medicines, reports, prescriptions
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
import shutil
import jwt
import os
import PyPDF2
from llama_service import LlamaService

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Dict
import re
import datetime
app = FastAPI()
from sqlalchemy.orm import Session
os.makedirs("files", exist_ok=True)
from fastapi.staticfiles import StaticFiles
# # # Serve static files from "files" directory
# app.mount("/prescriptions", StaticFiles(directory="files"), name="prescriptions")


origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()
SECRET_KEY = "your_secret_key"

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get('user_id')
        if user_id is None:
            raise HTTPException(status_code=401, detail='Invalid token')
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail='Invalid token')

app.include_router(auth_router)
# metadata.drop_all(engine)
metadata.create_all(engine)
llama_service = LlamaService()

@app.get('/vitals')  # Changed from /api/vitals to /vitals
def get_vitals(user_id: int = Depends(get_current_user)):
    db = SessionLocal()
    user_vitals = db.query(vitals).filter(vitals.c.user_id == user_id).order_by(vitals.c.date.desc()).first()
    if not user_vitals:
        return {}
    return {
        'bp': user_vitals.bp,
        'pulse': user_vitals.pulse,
        'temperature': user_vitals.temperature
    }

@app.get('/vitals/history')  # Changed from /api/vitals/history to /vitals/history
def get_vitals_history(user_id: int = Depends(get_current_user)):
    db = SessionLocal()
    vitals_history = db.query(vitals).filter(vitals.c.user_id == user_id).all()
    return [{'date': v.date, 'bp': v.bp, 'pulse': v.pulse} for v in vitals_history]

@app.get('/medicines')  # Changed from /api/medicines to /medicines
def get_medicines(user_id: int = Depends(get_current_user)):
    db = SessionLocal()
    meds = db.query(medicines).filter(medicines.c.user_id == user_id).all()
    return [{'name': m.name, 'dose': m.dose, 'frequency': m.frequency, 'duration': m.duration} for m in meds]
@app.get('/medicines/history')  # Add a route for all medicine histories
def get_medicine_history(user_id: int = Depends(get_current_user)):
    db = SessionLocal()
    prescriptions = db.query(medicines).filter(medicines.c.user_id == user_id).all()

    # Group by prescription (assuming each medicine entry has a 'prescription_id' field)
    grouped_medicines = {}
    for med in prescriptions:
        prescription_id = med.prescription_id  # Add this field if not already present
        if prescription_id not in grouped_medicines:
            grouped_medicines[prescription_id] = []
        grouped_medicines[prescription_id].append({
            'name': med.name,
            'dose': med.dose,
            'frequency': med.frequency,
            'duration': med.duration,
        })

    return grouped_medicines
from fastapi import Query
from fastapi.responses import FileResponse
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
@app.get("/prescriptions/list")
async def list_prescriptions():
    try:
        files = os.listdir("files")
        # Return file names only, not the full path
        return {"files": files}
    except FileNotFoundError:
        return {"files": []}

# Endpoint to serve individual files on demand
@app.get("/prescriptions/view/{filename}")
async def view_prescription(filename: str):
    file_path = f"files/{filename}"
    if os.path.isfile(file_path):
        # Serve the file with a 'filename' response header for clarity
        return FileResponse(file_path, media_type="application/pdf", filename=filename)
    else:
        raise HTTPException(status_code=404, detail="File not found")

# @app.post('/prescriptions/upload')
# async def upload_report(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
#     # Check and create directory if needed
#     file_directory = "files"
#     os.makedirs(file_directory, exist_ok=True)
#     file_location = f"{file_directory}/{file.filename}"

#     # Save file
#     with open(file_location, "wb+") as file_object:
#         shutil.copyfileobj(file.file, file_object)

#     db = SessionLocal()
#     new_report = reports.insert().values(user_id=user_id, name=file.filename, url=file_location)
#     db.execute(new_report)
#     db.commit()

#     # Only accept PDFs
#     if not file.filename.endswith(".pdf"):
#         raise HTTPException(status_code=400, detail="Only PDF files are supported")

#     # Extract text from PDF
#     pdf_reader = PyPDF2.PdfReader(file.file)
#     prescription_text = "".join(page.extract_text() for page in pdf_reader.pages)
#     print(prescription_text)
#     # Use LLaMA service to extract data
#     extracted_data = llama_service.extract_prescription(prescription_text)
#     from datetime import datetime
#     # Save vitals and medicines to database
#     vitals_data = extracted_data.get("Vital Signs", {})
#     if vitals_data:
#         db.execute(vitals.insert().values(
#             user_id=user_id,
#             bp=vitals_data.get("BP"),
#             pulse=int(vitals_data.get("Pulse", 0)),
#             temperature=vitals_data.get("Temperature", None),
#             date=datetime.utcnow()
#         ))

#     medicines_data = extracted_data.get("Medicines", [])
#     for med in medicines_data:
#         db.execute(medicines.insert().values(
#             user_id=user_id,
#             name=med.get("Name"),
#             dose=med.get("Dose"),
#             frequency=med.get("Frequency"),
#             duration=med.get("Duration"),
#             date=datetime.utcnow()
#         ))

#     db.commit()
#     return {"extracted_data": extracted_data}
from datetime import datetime
# @app.post('/prescriptions/upload')
# async def upload_report(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
#     # Check and create directory if needed
#     file_directory = "files"
#     os.makedirs(file_directory, exist_ok=True)
#     file_location = f"{file_directory}/{file.filename}"

#     # Save file
#     with open(file_location, "wb+") as file_object:
#         shutil.copyfileobj(file.file, file_object)

#     db = SessionLocal()
#     new_report = reports.insert().values(user_id=user_id, name=file.filename, url=file_location)
#     db.execute(new_report)
#     db.commit()

#     # Only accept PDFs
#     if not file.filename.endswith(".pdf"):
#         raise HTTPException(status_code=400, detail="Only PDF files are supported")

#     # Extract text from PDF
#     pdf_reader = PyPDF2.PdfReader(file.file)
#     prescription_text = "".join(page.extract_text() for page in pdf_reader.pages)
#     print(prescription_text)
    
#     # Use LLaMA service to extract data
#     extracted_data = llama_service.extract_prescription(prescription_text)

#     # Save vitals and medicines to database
#     vitals_data = extracted_data.get("Vital Signs", {})
    
#     # Convert pulse_raw to a string if it's an integer
#     pulse_raw = str(vitals_data.get("Pulse", "0 bpm"))  # Default to "0 bpm" if not provided
    
#     # Remove non-numeric characters from pulse_raw for analytics storage
#     pulse_cleaned = int(re.sub(r'\D', '', pulse_raw)) if pulse_raw else 0

#     if vitals_data:
#         db.execute(vitals.insert().values(
#             user_id=user_id,
#             bp=vitals_data.get("BP"),
#             pulse=pulse_cleaned,  # Store numeric value for calculations
#             temperature=vitals_data.get("Temperature", None),
#             date=datetime.utcnow()
#         ))

#     medicines_data = extracted_data.get("Medicines", [])
#     for med in medicines_data:
#         db.execute(medicines.insert().values(
#             user_id=user_id,
#             name=med.get("Name"),
#             dose=med.get("Dose"),
#             frequency=med.get("Frequency"),
#             duration=med.get("Duration"),
#             quantity=med.get("Quantity", None),
#             date=datetime.utcnow()
#         ))

#     db.commit()
#     return {"extracted_data": extracted_data}
# @app.post('/prescriptions/upload')
# async def upload_report(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
#     # Check and create directory if needed
#     user_folder = f'files/{user_id}'
#     os.makedirs(user_folder, exist_ok=True)
    
#     file_location = f"{user_folder}/{file.filename}"

#     # Save the file
#     with open(file_location, "wb+") as file_object:
#         shutil.copyfileobj(file.file, file_object)

#     db = SessionLocal()
    
#     # Only accept PDFs
#     if not file.filename.endswith(".pdf"):
#         raise HTTPException(status_code=400, detail="Only PDF files are supported")

#     # Extract text from PDF
#     pdf_reader = PyPDF2.PdfReader(file.file)
#     prescription_text = "".join(page.extract_text() for page in pdf_reader.pages)
#     print(prescription_text)
    
#     # Use LLaMA service to extract data
#     extracted_data = llama_service.extract_prescription(prescription_text)

#     # Create a new prescription record
#     new_prescription = prescriptions.insert().values(user_id=user_id, name=file.filename, date=datetime.utcnow())
#     prescription_result = db.execute(new_prescription)
#     prescription_id = prescription_result.inserted_primary_key[0]  # Get the generated prescription_id

#     # Save vitals to the database if available
#     # vitals_data = extracted_data.get("Vital Signs", {})
#     # pulse_raw = str(vitals_data.get("Pulse", "0 bpm"))  # Default to "0 bpm" if not provided
#     # pulse_cleaned = int(re.sub(r'\D', '', pulse_raw)) if pulse_raw else 0

#     # if vitals_data:
#     #     db.execute(vitals.insert().values(
#     #         user_id=user_id,
#     #         bp=vitals_data.get("BP"),
#     #         pulse=pulse_cleaned,  # Store numeric value for calculations
#     #         temperature=vitals_data.get("Temperature", None),
#     #         date=datetime.utcnow()
#     #     ))
#     # Assuming extracted_data includes a "BP" key like "120/80 mmHg"
#     vitals_data = extracted_data.get("Vital Signs", {})
#     bp_value = str(vitals_data.get("BP", "0/0 mmHg"))  # Default to "0/0 mmHg" if not provided
#     pulse_value = vitals_data.get("Pulse", "0 bpm")
#     if isinstance(pulse_value, int):
#         pulse_cleaned = pulse_value
#     else:
#         pulse_cleaned = int(re.sub(r'\D', '', str(pulse_value)))
# # Ensure the BP value format is complete with both systolic and diastolic values
#     if bp_value:
#         systolic, diastolic = bp_value.split("/") if "/" in bp_value else (bp_value, "0")
#         db.execute(vitals.insert().values(
#             user_id=user_id,
#             bp=f"{systolic}/{diastolic}",  # Store both systolic and diastolic parts
#             pulse=pulse_cleaned,  # Extract numeric pulse value
#             temperature=vitals_data.get("Temperature", None),
#             date=datetime.utcnow()
#         ))

#     # Save each medicine to the medicines table with the prescription_id
#     medicines_data = extracted_data.get("Medicines", [])
#     for med in medicines_data:
#         db.execute(medicines.insert().values(
#             user_id=user_id,
#             prescription_id=prescription_id,  # Link to the prescription
#             name=med.get("Name"),
#             dose=med.get("Dose"),
#             frequency=med.get("Frequency"),
#             duration=med.get("Duration"),
#             quantity=med.get("Quantity", None),
#             date=datetime.utcnow()
#         ))

#     db.commit()
#     return {"extracted_data": extracted_data}
@app.post('/prescriptions/upload')
async def upload_report(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
    # Create user folder if it does not exist
    user_folder = f'files/{user_id}'
    os.makedirs(user_folder, exist_ok=True)
    
    file_location = f"{user_folder}/{file.filename}"
    
    # Save the file to disk
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    db = SessionLocal()
    
    # Only accept PDFs
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Extract text from PDF
    pdf_reader = PyPDF2.PdfReader(file.file)
    prescription_text = "".join(page.extract_text() for page in pdf_reader.pages)
    print("Extracted prescription text:", prescription_text)
    
    # Use LLaMA service to extract structured prescription data
    extracted_data = llama_service.extract_prescription(prescription_text)

    # Extract diagnosis from the extracted data
    diagnosis = extracted_data.get("Diagnosis", "No diagnosis provided")

    # Insert the prescription with diagnosis into the database
    new_prescription = prescriptions.insert().values(
        user_id=user_id,
        name=file.filename,
        diagnosis=diagnosis,  # Store diagnosis
        date=datetime.utcnow()
    )
    prescription_result = db.execute(new_prescription)
    prescription_id = prescription_result.inserted_primary_key[0]  # Get the generated prescription_id

    # Save vitals to the database if available
    vitals_data = extracted_data.get("Vital Signs", {})
    bp_value = str(vitals_data.get("BP", "0/0 mmHg"))  # Default to "0/0 mmHg" if not provided
    pulse_value = vitals_data.get("Pulse", "0 bpm")
    pulse_cleaned = int(re.sub(r'\D', '', str(pulse_value))) if pulse_value else 0

    if bp_value:
        systolic, diastolic = bp_value.split("/") if "/" in bp_value else (bp_value, "0")
        db.execute(vitals.insert().values(
            user_id=user_id,
            prescription_id=prescription_id,  # Link to the prescription
            bp=f"{systolic}/{diastolic}",  # Store both systolic and diastolic parts
            pulse=pulse_cleaned,
            temperature=vitals_data.get("Temperature", None),
            date=datetime.utcnow()
        ))

    # Save each medicine to the medicines table with the prescription_id
    medicines_data = extracted_data.get("Medicines", [])
    for med in medicines_data:
        db.execute(medicines.insert().values(
            user_id=user_id,
            prescription_id=prescription_id,  # Link to the prescription
            name=med.get("Name"),
            dose=med.get("Dose"),
            frequency=med.get("Frequency"),
            duration=med.get("Duration"),
            quantity=med.get("Quantity", None),
            date=datetime.utcnow()
        ))

    db.commit()
    return {"extracted_data": extracted_data}


from pydantic import BaseModel
class ChatRequest(BaseModel):
    message: str
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
from llama_service2 import PersonalizedLlamaService
# @app.post("/chatbot")
# async def chatbot_interaction(request: ChatRequest, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
#     print("Received request to /chatbot with user_id:", user_id, "and message:", request.message)
#     llama_service = PersonalizedLlamaService(db)
    
#     try:
#         response = llama_service.generate_response(user_id=user_id, question=request.message)
#         print("Generated response:", response)
#         return {"reply": response}
#     except Exception as e:
#         print("Error generating response for user_id", user_id, ":", str(e))
#         # raise HTTPException(status_code=500, detail="An error occurred while processing the message.")
#         return{"reply": "There is some issue at backend. Please try after some time"}
from models import chat_history
@app.post("/chatbot")
async def chatbot_interaction(request: ChatRequest, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    print("Received request to /chatbot with user_id:", user_id, "and message:", request.message)
    llama_service = PersonalizedLlamaService(db)
    
    # Save user message to the chat history
    db.execute(chat_history.insert().values(
        user_id=user_id,
        role='user',
        message=request.message,
        timestamp=datetime.utcnow()
    ))
    db.commit()

    try:
        response = llama_service.generate_response(user_id=user_id, question=request.message)
        print("Generated response:", response)

        # Save bot response to the chat history
        db.execute(chat_history.insert().values(
            user_id=user_id,
            role='bot',
            message=response,
            timestamp=datetime.utcnow()
        ))
        db.commit()

        return {"reply": response}
    except Exception as e:
        print("Error generating response for user_id", user_id, ":", str(e))
        raise HTTPException(status_code=500, detail="An error occurred while processing the message.")
@app.get("/chat_history")
async def get_chat_history(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    chat_records = db.query(chat_history).filter(chat_history.c.user_id == user_id).order_by(chat_history.c.timestamp).all()
    history = [{"role": record.role, "message": record.message, "timestamp": record.timestamp.isoformat()} for record in chat_records]
    return {"history": history}
@app.get("/generatepatientsummary")
async def generate_patient_summary(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    llama_service = PersonalizedLlamaService(db)
    summary = llama_service.generate_response(user_id, "Provide a summary of the patient's medical history.")
    return {"summary": summary}
@app.get("/prescriptions")
async def list_prescriptions(user_id: int = Depends(get_current_user)):
    user_folder = f"files/{user_id}"  # Path to the user's files directory

    # Check if the user's folder exists
    if not os.path.isdir(user_folder):
        return JSONResponse(content={"files": []}, status_code=200)

    # List all files in the user's folder
    files = os.listdir(user_folder)
    files = [file for file in files if os.path.isfile(os.path.join(user_folder, file))]  # Filter to ensure only files

    # Return the list of filenames
    return JSONResponse(content={"files": files}, status_code=200)
# @app.get("/files/{user_id}/{filename}")
# async def get_file(filename: str,user_id: int = Depends(get_current_user)):
#     # Ensure the requested user_id matches the logged-in user (for security)
#     print(user_id)
    
#     # Path to the file
#     file_path = f"files/{user_id}/{filename}"

#     # Check if file exists
#     if not os.path.isfile(file_path):
#         raise HTTPException(status_code=404, detail="File not found")

#     # Serve the file
#     return FileResponse(path=file_path, media_type='application/pdf', filename=filename)
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("user_id")
    except jwt.PyJWTError:
        return None

@app.get("/files/{user_id}/{filename}")
async def get_file(user_id: int, filename: str, token: str = Query(...)):
    decoded_user_id = verify_token(token)
    if decoded_user_id != user_id:
        raise HTTPException(status_code=403, detail="Access forbidden")

    file_path = os.path.join("files", str(user_id), filename)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path, media_type="application/pdf")