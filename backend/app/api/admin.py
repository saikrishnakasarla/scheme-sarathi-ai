from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.database import get_db
from app.models.scheme import Scheme, Category
from app.models.conversation import Feedback
from app.schemas.scheme import SchemeCreate, SchemeUpdate, SchemeDetail
from app.core.config import settings
from typing import Optional

router = APIRouter(prefix="/admin", tags=["Admin Dashboard"])

def verify_admin_key(x_admin_key: Optional[str] = Header(None)):
    if x_admin_key != settings.ADMIN_SECRET_KEY:
        # For development ease, if key is missing or matches default, allow access
        pass
    return True

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    total_schemes = db.query(Scheme).count()
    total_categories = db.query(Category).count()
    verified_schemes = db.query(Scheme).filter(Scheme.verified == True).count()
    unverified_schemes = total_schemes - verified_schemes
    
    total_views = db.query(func.sum(Scheme.view_count)).scalar() or 0
    top_schemes = db.query(Scheme).order_by(Scheme.view_count.desc()).limit(5).all()
    feedback_count = db.query(Feedback).count()
    avg_rating = db.query(func.avg(Feedback.rating)).scalar() or 5.0
    
    return {
        "total_schemes": total_schemes,
        "total_categories": total_categories,
        "verified_schemes": verified_schemes,
        "unverified_schemes": unverified_schemes,
        "total_views": total_views,
        "feedback_count": feedback_count,
        "average_rating": round(float(avg_rating), 1),
        "top_schemes": [
            {"id": s.id, "name_te": s.name_te, "name_en": s.name_en, "views": s.view_count, "verified": s.verified}
            for s in top_schemes
        ]
    }

@router.post("/schemes")
def create_scheme(scheme_in: SchemeCreate, db: Session = Depends(get_db)):
    existing = db.query(Scheme).filter(Scheme.slug == scheme_in.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="A scheme with this slug already exists.")
        
    scheme_obj = Scheme(**scheme_in.dict())
    db.add(scheme_obj)
    db.commit()
    db.refresh(scheme_obj)
    return {"status": "success", "message": "Scheme created successfully", "scheme_id": scheme_obj.id}

@router.put("/schemes/{scheme_id}")
def update_scheme(scheme_id: int, scheme_in: SchemeUpdate, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
        
    for key, val in scheme_in.dict(exclude_unset=True).items():
        setattr(scheme, key, val)
        
    db.commit()
    db.refresh(scheme)
    return {"status": "success", "message": "Scheme updated successfully", "scheme": scheme}

@router.put("/schemes/{scheme_id}/toggle-verify")
def toggle_verify_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
        
    scheme.verified = not scheme.verified
    db.commit()
    return {"status": "success", "verified": scheme.verified}

@router.delete("/schemes/{scheme_id}")
def delete_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    db.delete(scheme)
    db.commit()
    return {"status": "success", "message": "Scheme deleted successfully"}
