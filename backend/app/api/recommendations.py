from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services import recommendation_service
from app.schemas.recommendation import ProfileCheckRequest, RecommendationResponse

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.post("", response_model=RecommendationResponse)
def get_recommendations(profile: ProfileCheckRequest, db: Session = Depends(get_db)):
    return recommendation_service.get_recommendations_for_profile(db, profile)
