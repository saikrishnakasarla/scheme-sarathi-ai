from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any
from datetime import datetime

class CategoryBase(BaseModel):
    slug: str
    name_te: str
    name_en: str
    name_hi: Optional[str] = None
    icon: str
    description_te: str
    description_en: str
    sort_order: int = 0

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    scheme_count: Optional[int] = 0

    class Config:
        from_attributes = True


class SchemeBase(BaseModel):
    slug: str
    category_id: int
    name_te: str
    name_en: str
    name_hi: Optional[str] = None
    code: Optional[str] = None
    level: str = "Central"
    state: str = "All India"
    target_beneficiaries: List[str] = []
    purpose_te: str
    purpose_en: str
    benefits_te: str
    benefits_en: str
    financial_amount: Optional[str] = None
    eligibility_criteria_te: List[str] = []
    eligibility_criteria_en: List[str] = []
    exclusions_te: List[str] = []
    exclusions_en: List[str] = []
    match_rules: Dict[str, Any] = {}
    required_documents: List[Dict[str, Any]] = []
    application_procedure_te: List[str] = []
    application_procedure_en: List[str] = []
    application_mode: str = "Online & MeeSeva"
    official_website: str
    portal_name: str
    helpline_number: Optional[str] = None
    verified: bool = True
    verification_source: str = "Official Government Portal"
    last_verified_date: str = "2026-03-01"
    warning_notes_te: Optional[str] = None
    warning_notes_en: Optional[str] = None
    faqs: List[Dict[str, Any]] = []

class SchemeCreate(SchemeBase):
    pass

class SchemeUpdate(BaseModel):
    name_te: Optional[str] = None
    name_en: Optional[str] = None
    benefits_te: Optional[str] = None
    benefits_en: Optional[str] = None
    financial_amount: Optional[str] = None
    verified: Optional[bool] = None
    official_website: Optional[str] = None
    last_verified_date: Optional[str] = None

class SchemeSummary(BaseModel):
    id: int
    slug: str
    category_id: int
    category_name_te: Optional[str] = None
    category_name_en: Optional[str] = None
    name_te: str
    name_en: str
    code: Optional[str] = None
    level: str
    financial_amount: Optional[str] = None
    purpose_te: str
    purpose_en: str
    benefits_te: str
    benefits_en: str
    verified: bool
    official_website: str
    match_score: Optional[int] = None
    eligibility_status: Optional[str] = None # "eligible", "potentially_eligible", "not_eligible"
    reason: Optional[str] = None

    class Config:
        from_attributes = True

class SchemeDetail(SchemeBase):
    id: int
    category: Optional[CategoryResponse] = None
    view_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
