from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services import scheme_service
from app.schemas.scheme import SchemeDetail
from typing import Optional

router = APIRouter(prefix="/schemes", tags=["Schemes"])

@router.get("")
def list_schemes(
    category: Optional[str] = Query(None, description="Category slug"),
    level: Optional[str] = Query(None, description="Jurisdiction level"),
    q: Optional[str] = Query(None, description="Search term in Telugu or English"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return scheme_service.get_schemes_list(db, category_slug=category, level=level, query=q, skip=skip, limit=limit)

@router.get("/{identifier}", response_model=SchemeDetail)
def get_scheme(identifier: str, db: Session = Depends(get_db)):
    scheme = scheme_service.get_scheme_by_id_or_slug(db, identifier)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme

@router.get("/{identifier}/documents")
def get_scheme_documents(identifier: str, db: Session = Depends(get_db)):
    scheme = scheme_service.get_scheme_by_id_or_slug(db, identifier)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return {
        "scheme_id": scheme.id,
        "scheme_name_te": scheme.name_te,
        "scheme_name_en": scheme.name_en,
        "required_documents": scheme.required_documents or []
    }

@router.get("/{identifier}/sources")
def get_scheme_sources(identifier: str, db: Session = Depends(get_db)):
    scheme = scheme_service.get_scheme_by_id_or_slug(db, identifier)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return {
        "scheme_id": scheme.id,
        "scheme_name_te": scheme.name_te,
        "official_website": scheme.official_website,
        "portal_name": scheme.portal_name,
        "verification_source": scheme.verification_source,
        "verified": scheme.verified,
        "last_verified_date": scheme.last_verified_date,
        "helpline_number": scheme.helpline_number
    }
