from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse
from app.services import rag_service

router = APIRouter(prefix="/ai", tags=["Conversational AI"])

@router.post("/chat", response_model=ChatMessageResponse)
async def chat_with_sarathi(req: ChatMessageRequest, db: Session = Depends(get_db)):
    return await rag_service.generate_chat_response(db, req)
