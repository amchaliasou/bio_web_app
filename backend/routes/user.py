from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.hash import bcrypt

from db.database import SessionLocal
from models.user import USER
from schemas.user import (
    Token,
    TokenData,
    USERBase,
    UserCreate,
    UserLogin,
    UserInDB,
    UserOut,
)

router = r = APIRouter()

# Define a secret key and token expiration time
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 48


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
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
    db = SessionLocal()
    user = db.query(USER).filter(USER.Username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user


@router.post("/register")
def register_user(user: UserCreate):
    db = SessionLocal()
    hashed_password = bcrypt.hash(user.Password)
    db_user = USER(Username=user.Username, Password=hashed_password, Role="Admin")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"ID": db_user.ID, "Username": db_user.Username, "Role": db_user.Role}


@router.post("/login")
async def login_for_access_token(user: UserLogin):
    db = SessionLocal()
    db_user = db.query(USER).filter(USER.Username == user.Username).first()
    if db_user is None or not bcrypt.verify(user.Password, db_user.Password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.Username}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": db_user.Role,
        "username": db_user.Username,
    }


@r.get("/authorization", response_model=UserOut)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return {
        "Username": current_user.Username,
        "Role": current_user.Role,
        "ID": current_user.ID,
    }
