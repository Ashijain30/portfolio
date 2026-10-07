"""API router for Inbound Lead management with database persistence."""
from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse
from app.services import lead_service

router = APIRouter(
    prefix="/api/leads",
    tags=["Leads"]
)


@router.get(
    "",
    response_model=List[LeadResponse],
    summary="List all inbound leads",
    description="Retrieve all inbound real-estate leads stored in the SQLite database."
)
def list_leads(db: Session = Depends(get_db)) -> List[LeadResponse]:
    """Return all leads from the database."""
    return lead_service.get_all_leads(db)


@router.get(
    "/{lead_id}",
    response_model=LeadResponse,
    summary="Get lead by ID",
    description="Fetch a single inbound lead by its unique primary key."
)
def get_lead(lead_id: str, db: Session = Depends(get_db)) -> LeadResponse:
    """Return a single lead or raise 404 if not found."""
    lead = lead_service.get_lead_by_id(db, lead_id)
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
    description="Validate customer details via Pydantic and persist as a new record in SQLite."
)
def create_new_lead(
    lead_in: LeadCreate,
    db: Session = Depends(get_db)
) -> LeadResponse:
    """Validate and register a new lead in the database."""
    return lead_service.create_lead(db, lead_in)


@router.put(
    "/{lead_id}",
    response_model=LeadResponse,
    summary="Update existing lead",
    description="Update all fields for an existing inbound lead."
)
def update_existing_lead(
    lead_id: str,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db)
) -> LeadResponse:
    """Update lead record or raise 404 if not found."""
    updated_lead = lead_service.update_lead(db, lead_id, lead_update)
    if not updated_lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lead with id '{lead_id}' not found"
        )
    return updated_lead


@router.delete(
    "/{lead_id}",
    summary="Delete lead by ID",
    description="Remove an inbound lead record from the database."
)
def delete_existing_lead(
    lead_id: str,
    db: Session = Depends(get_db)
) -> Dict[str, str]:
    """Delete lead record or raise 404 if not found."""
    deleted = lead_service.delete_lead(db, lead_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lead with id '{lead_id}' not found"
        )
    return {"message": f"Lead with id '{lead_id}' successfully deleted"}
