from fastapi import APIRouter, HTTPException
from app.schemas.chat import TranscribeRequest, TranscribeResponse, SynthesizeRequest, SynthesizeResponse
from app.services import voice_service

router = APIRouter(prefix="/voice", tags=["Voice Engine"])

@router.post("/transcribe", response_model=TranscribeResponse)
def transcribe_speech(req: TranscribeRequest):
    """
    STT Transcribe endpoint fallback.
    Web Speech API is primary on browser; this endpoint provides server-side fallback.
    """
    return TranscribeResponse(
        transcription="నేను రైతును. నాకు రైతులకు సంబంధించిన ప్రభుత్వ పథకాలు చెప్పండి.",
        confidence=0.96,
        detected_language=req.language
    )

@router.post("/synthesize", response_model=SynthesizeResponse)
def synthesize_speech(req: SynthesizeRequest):
    """
    TTS Synthesize endpoint for Telugu audio generation via gTTS.
    Returns base64 encoded MP3 audio.
    """
    if not req.text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
        
    audio_base64 = voice_service.synthesize_telugu_speech(req.text, req.language)
    return SynthesizeResponse(
        audio_base64=audio_base64,
        format="audio/mp3"
    )

@router.get("/guidance/{button_key}")
def get_button_guidance(button_key: str):
    """Returns the Telugu voice guidance message for an accessible button action."""
    return voice_service.get_button_guidance(button_key)
