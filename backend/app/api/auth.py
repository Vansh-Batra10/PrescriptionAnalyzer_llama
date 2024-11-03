from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import UserCreate, UserLogin, Token
from app.models import user as models
from app.database import get_db
from app.core.security import create_access_token, verify_password, get_password_hash
from sqlalchemy.exc import IntegrityError
router = APIRouter()


@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Normalize email to lowercase to avoid case-sensitive duplicates
    email_lower = user.email.lower()
    
    # Check for existing user
    db_user = db.query(models.User).filter(models.User.email == email_lower).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user instance with hashed password
    hashed_password = get_password_hash(user.password)
    new_user = models.User(email=email_lower, password=hashed_password)

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()  # Rollback to avoid partial commits
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Generate access token
    token = create_access_token({"user_id": new_user.id})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}
