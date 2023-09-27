from sqlalchemy import Column, String, Integer, Enum
from db.base import Base

class USER(Base):
    __tablename__ = "USER"
    ID = Column(Integer, primary_key=True,index=True)
    Username = Column(String, index=True)
    Password = Column(String, index=True)
    Role = Column(Enum('Admin', 'User'), index=True)
