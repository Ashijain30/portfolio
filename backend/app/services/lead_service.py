"""In-memory Lead Service.

Provides business operations for lead retrieval and creation.
Acts as a decoupled service layer that will be swapped for SQLite / SQLAlchemy in Phase 4.
"""
from typing import List, Optional
import uuid
from app.schemas.lead import LeadCreate


# Initial realistic real-estate leads (in-memory storage for Phase 3)
_INITIAL_LEADS = [
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

# In-memory working collection
_leads_db: List[dict] = [lead.copy() for lead in _INITIAL_LEADS]


def get_all_leads() -> List[dict]:
    """Retrieve all leads from in-memory storage."""
    return list(_leads_db)


def get_lead_by_id(lead_id: str) -> Optional[dict]:
    """Find and return a single lead by its unique identifier."""
    for lead in _leads_db:
        if lead["id"] == lead_id:
            return lead
    return None


def create_lead(lead_in: LeadCreate) -> dict:
    """Create a new lead with a generated unique ID and store in-memory."""
    new_id = f"lead-{uuid.uuid4().hex[:6]}"
    lead_dict = {
        "id": new_id,
        "name": lead_in.name.strip(),
        "location": lead_in.location.strip(),
        "property_requirement": lead_in.property_requirement.strip(),
        "budget": lead_in.budget.strip(),
        "buying_timeline": lead_in.buying_timeline.strip(),
        "customer_message": lead_in.customer_message.strip(),
    }
    # Prepend to simulate most recent first
    _leads_db.insert(0, lead_dict)
    return lead_dict


def reset_leads_db() -> None:
    """Helper for automated testing to reset in-memory state back to initial."""
    global _leads_db
    _leads_db = [lead.copy() for lead in _INITIAL_LEADS]
