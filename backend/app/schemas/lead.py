"""Pydantic schemas for Inbound Lead request validation and response serialization."""
from pydantic import BaseModel, Field, ConfigDict


class LeadCreate(BaseModel):
    """Schema for validating inbound lead creation requests.
    
    Contains only fields submitted by the client during lead intake.
    Server-generated attributes (like ID) are excluded.
    """
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full customer name",
        examples=["Rajesh Sharma"]
    )
    location: str = Field(
        ...,
        min_length=2,
        max_length=150,
        description="Micro-market or locality of interest",
        examples=["Whitefield, Bangalore"]
    )
    property_requirement: str = Field(
        ...,
        min_length=3,
        max_length=255,
        description="Configuration and property type required",
        examples=["3 BHK Luxury Apartment with Balcony"]
    )
    budget: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="Stated budget range",
        examples=["₹1.8 Cr - ₹2.2 Cr"]
    )
    buying_timeline: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="Target closing timeline",
        examples=["Within 15 days"]
    )
    customer_message: str = Field(
        ...,
        min_length=5,
        max_length=2000,
        description="Inbound inquiry message text or salesperson notes",
        examples=["Looking to finalize a 3 BHK before school starts in June. Pre-approved loan with HDFC."]
    )


class LeadUpdate(LeadCreate):
    """Schema for validating lead update (PUT) requests.
    
    Validates replacement of all core lead fields during edit.
    """
    pass


class LeadResponse(BaseModel):
    """Schema for serializing lead data returned to API consumers.
    
    Includes the immutable server-generated ID alongside all confirmed lead details.
    'from_attributes=True' enables automatic serialization from SQLAlchemy ORM objects.
    """
    id: str = Field(..., description="Unique lead identifier", examples=["lead-101"])
    name: str = Field(..., description="Full customer name")
    location: str = Field(..., description="Target locality")
    property_requirement: str = Field(..., description="Property specifications")
    budget: str = Field(..., description="Stated budget")
    buying_timeline: str = Field(..., description="Buying timeline")
    customer_message: str = Field(..., description="Customer inquiry message")

    model_config = ConfigDict(from_attributes=True)
