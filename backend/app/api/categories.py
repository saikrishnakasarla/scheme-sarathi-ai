from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services import scheme_service

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("")
def list_categories(db: Session = Depends(get_db)):
    return scheme_service.get_all_categories(db)
