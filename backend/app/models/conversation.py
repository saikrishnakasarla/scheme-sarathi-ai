from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, DateTime
from datetime import datetime
from app.database.database import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), unique=True, index=True)
    language = Column(String(20), default="te") # "te", "en", "hi"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False, index=True)
    sender = Column(String(20), nullable=False) # "user", "sarathi"
    content = Column(Text, nullable=False)
    audio_url = Column(String(255), nullable=True)
    recommended_scheme_ids = Column(JSON, default=list)
    metadata_info = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), nullable=True)
    scheme_id = Column(Integer, nullable=True)
    rating = Column(Integer, default=5)
    comment = Column(Text, nullable=True)
    voice_used = Column(String(20), default="yes")
    created_at = Column(DateTime, default=datetime.utcnow)

class AnalyticsLog(Base):
    __tablename__ = "analytics_logs"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(50), nullable=False) # "voice_search", "eligibility_check", "scheme_view", "apply_click"
    detail = Column(Text, nullable=True)
    language = Column(String(20), default="te")
    created_at = Column(DateTime, default=datetime.utcnow)
