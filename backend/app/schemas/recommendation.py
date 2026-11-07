from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.scheme import SchemeSummary

class ProfileCheckRequest(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = "all" # male, female, other, all
    state: Optional[str] = "Andhra Pradesh"
    district: Optional[str] = None
    village: Optional[str] = None
    occupation: Optional[str] = None # farmer, student, women_shg, artisan, small_business, daily_wage, unemployed, etc.
    annual_income: Optional[float] = None
    land_acres: Optional[float] = 0.0
    is_student: Optional[bool] = False
    has_disability: Optional[bool] = False
    has_ration_card: Optional[bool] = True
    ration_card_type: Optional[str] = "White (BPL)" # White, Pink, None
    language: Optional[str] = "te" # te, en, hi

class SchemeMatchResult(BaseModel):
    scheme: SchemeSummary
    score: int # 0 to 100
    status: str # "eligible", "needs_more_info", "ineligible"
    matched_criteria_te: List[str] = []
    unmatched_criteria_te: List[str] = []
    matched_criteria_en: List[str] = []
    unmatched_criteria_en: List[str] = []
    required_documents: List[Dict[str, Any]] = []
    voice_guidance_te: str = ""

class RecommendationResponse(BaseModel):
    total_evaluated: int
    eligible_count: int
    potentially_eligible_count: int
    recommendations: List[SchemeMatchResult]
    summary_te: str
    summary_en: str
    voice_narration_te: str
    disclaimer_te: str
    disclaimer_en: str
