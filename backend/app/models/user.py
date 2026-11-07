from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, DateTime
from datetime import datetime
from app.database.database import Base

class CitizenProfile(Base):
    __tablename__ = "citizen_profiles"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), unique=True, index=True)
    full_name = Column(String(100), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String(20), nullable=True) # male, female, other
    state = Column(String(100), default="Andhra Pradesh")
    district = Column(String(100), nullable=True)
    village = Column(String(100), nullable=True)
    occupation = Column(String(50), nullable=True) # farmer, student, artisan, women_shg, worker, small_business, unemployed
    annual_income = Column(Float, nullable=True)
    land_acres = Column(Float, default=0.0)
    is_student = Column(Boolean, default=False)
    has_disability = Column(Boolean, default=False)
    has_ration_card = Column(Boolean, default=True)
    ration_card_type = Column(String(50), default="White (BPL)") # White, Pink, None
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class SavedScheme(Base):
    __tablename__ = "saved_schemes"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), index=True)
    scheme_id = Column(Integer, index=True)
    saved_at = Column(DateTime, default=datetime.utcnow)
