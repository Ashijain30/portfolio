"""SQLAlchemy-backed Lead Service.

Encapsulates all database persistence and querying logic for the Lead model.
"""
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadUpdate

# Initial realistic seed dataset for development and demos
INITIAL_SEED_LEADS = [
    {
        "id": "lead-101",
        "name": "Rajesh Sharma",
        "location": "Whitefield, Bangalore",
        "property_requirement": "3 BHK Luxury Apartment with Balcony",
        "budget": "₹1.8 Cr - ₹2.2 Cr",
        "buying_timeline": "Within 15 days",
        "customer_message": "Need ready-to-move 3 BHK before school opens in June. Pre-approved loan with HDFC."
    },
    {
        "id": "lead-102",
        "name": "Priya Mehta",
        "location": "Koramangala, Bangalore",
        "property_requirement": "4 BHK Gated Community Villa with Private Garden",
        "budget": "₹3.5 Cr - ₹4.0 Cr",
        "buying_timeline": "Within 30 days",
        "customer_message": "Relocating from London next month. Cash buyer seeking top-tier gated community."
    },
    {
        "id": "lead-103",
        "name": "Anand Verma",
        "location": "HSR Layout, Bangalore",
        "property_requirement": "2 BHK or Compact 3 BHK close to Metro",
        "budget": "₹95 Lakh - ₹1.1 Cr",
        "buying_timeline": "1 to 2 months",
        "customer_message": "First-time homebuyer currently renting in Sector 2. Comparing resale vs new launch."
    },
    {
        "id": "lead-104",
        "name": "Sneha Kulkarni",
        "location": "Devanahalli / Airport Road",
        "property_requirement": "Residential Plot for Long-term Investment",
        "budget": "₹50 Lakh - ₹65 Lakh",
        "buying_timeline": "3 to 6 months",
        "customer_message": "Evaluating plotted developments near Aerospace Park. Still deciding whether to wait for festive offers."
    },
    {
        "id": "lead-105",
        "name": "Vikram Malhotra",
        "location": "Hebbal or North Bangalore",
        "property_requirement": "General inquiry on retirement community homes",
        "budget": "Around ₹40 Lakh",
        "buying_timeline": "1+ year / Just exploring",
        "customer_message": "Just checking prices for retirement in 2-3 years. Prefer email brochures only, do not call."
    }
]


def get_all_leads(db: Session) -> List[Lead]:
    """Retrieve all leads from SQLite, ordered with newest first."""
    return db.query(Lead).all()


def get_lead_by_id(db: Session, lead_id: str) -> Optional[Lead]:
    """Query a single lead by its primary key ID."""
    return db.query(Lead).filter(Lead.id == lead_id).first()


def create_lead(db: Session, lead_in: LeadCreate) -> Lead:
    """Persist a new lead record into SQLite with automatic ID generation."""
    db_lead = Lead(
        name=lead_in.name.strip(),
        location=lead_in.location.strip(),
        property_requirement=lead_in.property_requirement.strip(),
        budget=lead_in.budget.strip(),
        buying_timeline=lead_in.buying_timeline.strip(),
        customer_message=lead_in.customer_message.strip(),
    )
    try:
        db.add(db_lead)
        db.commit()
        db.refresh(db_lead)
        return db_lead
    except Exception:
        db.rollback()
        raise


def update_lead(db: Session, lead_id: str, lead_update: LeadUpdate) -> Optional[Lead]:
    """Update all fields of an existing lead record."""
    db_lead = get_lead_by_id(db, lead_id)
    if not db_lead:
        return None

    db_lead.name = lead_update.name.strip()
    db_lead.location = lead_update.location.strip()
    db_lead.property_requirement = lead_update.property_requirement.strip()
    db_lead.budget = lead_update.budget.strip()
    db_lead.buying_timeline = lead_update.buying_timeline.strip()
    db_lead.customer_message = lead_update.customer_message.strip()

    try:
        db.commit()
        db.refresh(db_lead)
        return db_lead
    except Exception:
        db.rollback()
        raise


def delete_lead(db: Session, lead_id: str) -> bool:
    """Delete an existing lead record by ID. Returns True if deleted, False if not found."""
    db_lead = get_lead_by_id(db, lead_id)
    if not db_lead:
        return False

    try:
        db.delete(db_lead)
        db.commit()
        return True
    except Exception:
        db.rollback()
        raise


def seed_leads_if_empty(db: Session) -> None:
    """Idempotently seed initial demo leads if the table is currently empty."""
    if db.query(Lead).count() == 0:
        for seed_data in INITIAL_SEED_LEADS:
            db_lead = Lead(**seed_data)
            db.add(db_lead)
        try:
            db.commit()
        except Exception:
            db.rollback()
            raise
