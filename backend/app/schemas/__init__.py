"""Pydantic schemas package for API request and response data validation."""
from app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse
from app.schemas.ai import AITestRequest, AITestResponse

__all__ = [
    "LeadCreate",
    "LeadUpdate",
    "LeadResponse",
    "AITestRequest",
    "AITestResponse"
]
