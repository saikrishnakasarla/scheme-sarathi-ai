from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services import scheme_service, recommendation_service
from app.schemas.recommendation import ProfileCheckRequest, SchemeMatchResult
from typing import Optional

router = APIRouter(prefix="/eligibility", tags=["Eligibility Checker"])

@router.post("/check")
def check_eligibility(
    profile: ProfileCheckRequest,
    scheme_id: Optional[int] = Query(None, description="Check for specific scheme or all"),
    db: Session = Depends(get_db)
):
    if scheme_id:
        scheme = scheme_service.get_scheme_by_id_or_slug(db, str(scheme_id))
        if not scheme:
            raise HTTPException(status_code=404, detail="Scheme not found")
        cat = scheme.category
        res = recommendation_service.evaluate_scheme_eligibility(
            scheme, profile,
            cat.name_te if cat else "",
            cat.name_en if cat else ""
        )
        return {
            "single_scheme": True,
            "result": res
        }
    else:
        # Full evaluation
        return recommendation_service.get_recommendations_for_profile(db, profile)
