"""SQLAlchemy ORM Model representing the 'leads' database table."""
import uuid
from sqlalchemy import Column, String, Text
from app.database import Base


def generate_lead_id() -> str:
    """Generate a clean, readable unique lead identifier."""
    return f"lead-{uuid.uuid4().hex[:6]}"


class Lead(Base):
    """Lead ORM entity mapped to SQLite 'leads' table."""
    __tablename__ = "leads"

    id = Column(
        String(50),
        primary_key=True,
        default=generate_lead_id,
        index=True,
        doc="Unique primary key identifier"
    )
    name = Column(
        String(100),
        nullable=False,
        doc="Customer full name"
    )
    location = Column(
        String(150),
        nullable=False,
        doc="Preferred property locality / city"
    )
    property_requirement = Column(
        String(255),
        nullable=False,
        doc="Property specifications and configuration"
    )
    budget = Column(
        String(50),
        nullable=False,
        doc="Stated budget range"
    )
    buying_timeline = Column(
        String(50),
        nullable=False,
        doc="Customer's purchase timeframe"
    )
    customer_message = Column(
        Text,
        nullable=False,
        doc="Original inquiry text or notes"
    )
