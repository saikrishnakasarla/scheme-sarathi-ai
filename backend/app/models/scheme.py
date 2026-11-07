from sqlalchemy import Column, Integer, String, Text, Boolean, Float, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(50), unique=True, index=True)
    name_te = Column(String(100), nullable=False) # e.g. "రైతులకు పథకాలు"
    name_en = Column(String(100), nullable=False) # e.g. "Farmer Schemes"
    name_hi = Column(String(100), nullable=True)  # e.g. "किसान योजनाएं"
    icon = Column(String(50), default="Sprout")   # Lucide icon name
    description_te = Column(Text, nullable=False)
    description_en = Column(Text, nullable=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    schemes = relationship("Scheme", back_populates="category")


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    
    # Names
    name_te = Column(String(200), nullable=False, index=True)
    name_en = Column(String(200), nullable=False, index=True)
    name_hi = Column(String(200), nullable=True)
    code = Column(String(50), nullable=True, index=True) # e.g. PM-KISAN, PMAY-G
    
    # Jurisdiction & Level
    level = Column(String(50), default="Central") # "Central", "Andhra Pradesh", "State"
    state = Column(String(100), default="All India")
    target_beneficiaries = Column(JSON, default=list) # ["Farmer", "Small Landholder"]
    
    # Overview
    purpose_te = Column(Text, nullable=False)
    purpose_en = Column(Text, nullable=False)
    benefits_te = Column(Text, nullable=False)
    benefits_en = Column(Text, nullable=False)
    financial_amount = Column(String(100), nullable=True) # e.g. "₹6,000 / year"
    
    # Criteria & Rules
    eligibility_criteria_te = Column(JSON, default=list) # List of Telugu points
    eligibility_criteria_en = Column(JSON, default=list) # List of English points
    exclusions_te = Column(JSON, default=list)
    exclusions_en = Column(JSON, default=list)
    
    # Structured matching rules for the smart recommendation engine
    match_rules = Column(JSON, default=dict)
    # {
    #   "min_age": 18,
    #   "max_age": 70,
    #   "max_income": 300000,
    #   "occupations": ["farmer", "agricultural_worker"],
    #   "genders": ["all", "male", "female"],
    #   "land_required": True,
    #   "max_land_acres": 5.0,
    #   "student_only": False,
    #   "women_only": False,
    #   "bpl_only": True
    # }
    
    # Documents & Procedures
    required_documents = Column(JSON, default=list)
    # [{"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "బ్యాంక్ ఖాతాతో లింక్ అయి ఉండాలి"}]
    
    application_procedure_te = Column(JSON, default=list)
    application_procedure_en = Column(JSON, default=list)
    application_mode = Column(String(50), default="Online & MeeSeva") # "Online", "Grama Sachivalayam", "MeeSeva", "Both"
    
    # Verification & Trust
    official_website = Column(String(255), nullable=False)
    portal_name = Column(String(100), nullable=False)
    helpline_number = Column(String(100), nullable=True)
    verified = Column(Boolean, default=True)
    verification_source = Column(String(200), default="Official Portal")
    last_verified_date = Column(String(50), default="2026-03-01")
    warning_notes_te = Column(Text, nullable=True)
    warning_notes_en = Column(Text, nullable=True)
    
    # FAQs
    faqs = Column(JSON, default=list)
    # [{"q_te": "...", "a_te": "...", "q_en": "...", "a_en": "..."}]
    
    view_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    category = relationship("Category", back_populates="schemes")
