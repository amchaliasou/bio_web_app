from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str
    
class USERBase(BaseModel):
    ID: int
    Username: str
    Password: str
    Role: str

# Output model for sending user information as responses
class UserOut(BaseModel):
    ID: int
    Username: str
    Role: str

# Input model for registering a new user
class UserCreate(BaseModel):
    Username: str
    Password: str
    Role: str

# Input model for logging in an existing user
class UserLogin(BaseModel):
    Username: str
    Password: str
    
class UserInDB(BaseModel):
    username: str
    hashed_password: str
