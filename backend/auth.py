from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
from database import engine
from models import users
from sqlalchemy.orm import sessionmaker

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class User(BaseModel):
    email: str
    password: str

@router.post('/login')
def login(user: User):
    db = SessionLocal()
    db_user = db.query(users).filter(users.c.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail='Invalid credentials')
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail='Invalid credentials')
    token = jwt.encode({'user_id': db_user.id}, SECRET_KEY)
    return {'token': token,'user_id': db_user.id}

@router.post('/register')
def register(user: User):
    db = SessionLocal()
    hashed_password = pwd_context.hash(user.password)
    new_user = users.insert().values(email=user.email, password=hashed_password)
    db.execute(new_user)
    db.commit()
    return {'message': 'User created'}
