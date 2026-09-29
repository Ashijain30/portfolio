"""FastAPI application entry point for Masal AI Backend."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers.leads import router as leads_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="Backend API for Masal AI real-estate sales prioritization and assistant"
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
