"""API router for Inbound Lead management."""
from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.lead import LeadCreate, LeadResponse
from app.services import lead_service

router = APIRouter(
    prefix="/api/leads",
    tags=["Leads"]
)


@router.get(
    "",
    response_model=List[LeadResponse],
    summary="List all inbound leads",
    description="Retrieve all inbound real-estate leads stored in the pipeline."
)
def list_leads() -> List[LeadResponse]:
    """Return all leads from the service layer."""
    return lead_service.get_all_leads()


@router.get(
    "/{lead_id}",
    response_model=LeadResponse,
    summary="Get lead by ID",
    description="Fetch full details for a single inbound real-estate lead by its unique identifier."
)
def get_lead(lead_id: str) -> LeadResponse:
    """Return a single lead or raise 404 if not found."""
    lead = lead_service.get_lead_by_id(lead_id)
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lead with id '{lead_id}' not found"
        )
    return lead


@router.post(
    "",
    response_model=LeadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Intake new inbound lead",
    description="Validate customer details via Pydantic and store as a new lead."
)
def create_new_lead(lead_in: LeadCreate) -> LeadResponse:
    """Validate and register a new lead."""
    created_lead = lead_service.create_lead(lead_in)
    return created_lead
