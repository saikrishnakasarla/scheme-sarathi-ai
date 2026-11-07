from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.database import engine, Base, SessionLocal
from app.services.scheme_service import seed_database_if_empty

# Import routers
from app.api import schemes, categories, recommendations, eligibility, ai, voice, admin, feedback

# Create all database tables
Base.metadata.create_all(bind=engine)

# Seed database on startup
db = SessionLocal()
try:
    seed_database_if_empty(db)
finally:
    db.close()

app = FastAPI(
    title="Scheme Sarathi API",
    description="AI-Powered Government Scheme Recommendation & Telugu Voice Assistance Platform for Rural Citizens",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers
app.include_router(schemes.router, prefix=settings.API_V1_STR)
app.include_router(categories.router, prefix=settings.API_V1_STR)
app.include_router(recommendations.router, prefix=settings.API_V1_STR)
app.include_router(eligibility.router, prefix=settings.API_V1_STR)
app.include_router(ai.router, prefix=settings.API_V1_STR)
app.include_router(voice.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(feedback.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "project": "Scheme Sarathi – AI-Powered Government Scheme Platform",
        "description": "గ్రామీణ పౌరుల సంక్షేమ పథకాల సిఫార్సు & తెలుగు వాయిస్ సహాయక వేదిక",
        "status": "online",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "voice_support": ["te-IN", "en-IN", "hi-IN"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
