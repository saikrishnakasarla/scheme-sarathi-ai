from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.conversation import Feedback
from app.schemas.chat import FeedbackRequest

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.post("")
def submit_feedback(req: FeedbackRequest, db: Session = Depends(get_db)):
    fb = Feedback(
        session_id=req.session_id,
        scheme_id=req.scheme_id,
        rating=req.rating,
        comment=req.comment,
        voice_used=req.voice_used
    )
    db.add(fb)
    db.commit()
    return {"status": "success", "message": "ధన్యవాదాలు! మీ అమూల్యమైన అభిప్రాయం నమోదైంది."}

@router.get("")
def list_feedback(db: Session = Depends(get_db)):
    items = db.query(Feedback).order_by(Feedback.id.desc()).limit(20).all()
    return items
