from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Design(Base):
    __tablename__ = "designs"

    id = Column(Integer, primary_key=True, index=True)
    style = Column(String)
    image_path = Column(String)
    result = Column(String)