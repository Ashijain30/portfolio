"""FastAPI application entry point for Masal AI Backend with SQLite and Gemini integration."""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models import Lead  # Ensures Lead model is registered with Base metadata
from app.routers.leads import router as leads_router
from app.routers.ai import router as ai_router
from app.services import lead_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager: sets up database tables and idempotent seed data."""
    # Create SQLite database tables if they do not exist
    Base.metadata.create_all(bind=engine)

    # Seed initial demo leads idempotently (no duplicates on restart)
    db = SessionLocal()
    try:
        lead_service.seed_leads_if_empty(db)
    finally:
        db.close()

    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="Backend API for Masal AI real-estate sales prioritization and assistant",
    lifespan=lifespan
)

# Configure Cross-Origin Resource Sharing (CORS) for Vite frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register modular API routers
app.include_router(leads_router)
app.include_router(ai_router)


@app.get("/", tags=["System"])
def read_root():
    """Root diagnosis endpoint indicating backend status and link to OpenAPI docs."""
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs": "/docs",
        "health": "/api/health"
    }


@app.get("/api/health", tags=["System"])
def health_check():
    """Health check endpoint for liveness probes and uptime monitoring."""
    return {
        "status": "healthy",
        "version": "0.1.0"
    }
