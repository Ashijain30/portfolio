"""Services package exposing lead and AI operations."""
from app.services.lead_service import (
    get_all_leads,
    get_lead_by_id,
    create_lead,
    update_lead,
    delete_lead,
    seed_leads_if_empty
)
from app.services.ai_service import generate_ai_response

__all__ = [
    "get_all_leads",
    "get_lead_by_id",
    "create_lead",
    "update_lead",
    "delete_lead",
    "seed_leads_if_empty",
    "generate_ai_response"
]
