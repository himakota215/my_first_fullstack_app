from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel
from database import get_db
from models import User
from jose import JWTError, jwt
from datetime import timedelta
import datetime
import os
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


@router.post("/register")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()

    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )

    db_email = db.query(User).filter(User.email == user.email).first()

    if db_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user.password)

    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = os.getenv("SECRET_KEY") # మీ .env ఫైల్ లో దీన్ని సెట్ చేయండి
ALGORITHM = "HS256"
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user


class TokenData(BaseModel):
    username: str | None = None

class UserLogin(BaseModel):
    username: str
    password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login")
def login_for_access_token(UserLogin: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == UserLogin.username).first()
    if not db_user or not verify_password(UserLogin.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=30) # Token expiry time
    access_token = create_access_token(
        data={"sub": db_user.username}, 
    )
    return {"access_token": access_token, "token_type": "bearer"}
