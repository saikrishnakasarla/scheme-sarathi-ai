from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.schemas.scheme import SchemeSummary

class ChatMessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = "guest-session"
    language: Optional[str] = "te" # te, en, hi
    profile_context: Optional[Dict[str, Any]] = None

class ChatMessageResponse(BaseModel):
    response_text: str
    language: str = "te"
    audio_base64: Optional[str] = None
    suggested_questions: List[str] = []
    recommended_schemes: List[SchemeSummary] = []
    requires_verification: bool = False
    source_portals: List[str] = []

class TranscribeRequest(BaseModel):
    audio_base64: Optional[str] = None
    language: str = "te-IN"

class TranscribeResponse(BaseModel):
    transcription: str
    confidence: float = 0.95
    detected_language: str = "te-IN"

class SynthesizeRequest(BaseModel):
    text: str
    language: str = "te"

class SynthesizeResponse(BaseModel):
    audio_base64: str
    format: str = "audio/mp3"

class FeedbackRequest(BaseModel):
    session_id: Optional[str] = None
    scheme_id: Optional[int] = None
    rating: int = 5
    comment: Optional[str] = None
    voice_used: Optional[str] = "yes"
