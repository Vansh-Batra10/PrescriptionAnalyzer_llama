from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.services.llama_service import LlamaService
# from app.core.dependencies import get_current_user
import PyPDF2
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

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

router = APIRouter()

llama_service = LlamaService()

@router.post("/upload")
async def upload_prescription(file: UploadFile = File(...), user_id: int = Depends(get_current_user)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Extract text from the uploaded PDF
    pdf_reader = PyPDF2.PdfReader(file.file)
    prescription_text = ""
    for page in pdf_reader.pages:
        prescription_text += page.extract_text()

    # Use LLaMA service to extract structured prescription data
    extracted_data = llama_service.extract_prescription(prescription_text)

    return {"extracted_data": extracted_data}
