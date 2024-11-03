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
