"""Automated database-backed API tests with test database isolation."""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models.lead import Lead
from app.services.lead_service import INITIAL_SEED_LEADS

# Isolated in-memory SQLite database dedicated exclusively to automated tests
TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=test_engine
)


def override_get_db():
    """Dependency override providing an isolated test database session."""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


# Wire the dependency override into the FastAPI app
app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    """Create fresh tables and seed data before each test, then drop all afterwards."""
    Base.metadata.create_all(bind=test_engine)
    db = TestingSessionLocal()
    try:
        for seed_data in INITIAL_SEED_LEADS:
            db.add(Lead(**seed_data))
        db.commit()
    finally:
        db.close()

    yield

    Base.metadata.drop_all(bind=test_engine)


def test_1_health_check_still_works():
    """1. Health endpoint still works."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_2_get_leads_returns_database_records():
    """2. GET /api/leads returns database records."""
    response = client.get("/api/leads")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 5
    ids = [lead["id"] for lead in data]
    assert "lead-101" in ids
    assert "lead-102" in ids


def test_3_get_lead_by_valid_id():
    """3. GET /api/leads/{id} returns an existing record."""
    response = client.get("/api/leads/lead-101")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "lead-101"
    assert data["name"] == "Rajesh Sharma"
    assert "Whitefield" in data["location"]


def test_4_get_lead_by_invalid_id_returns_404():
    """4. GET /api/leads/{invalid_id} returns 404."""
    response = client.get("/api/leads/non-existent-999")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()


def test_5_post_leads_creates_database_record():
    """5. POST /api/leads creates a database record."""
    payload = {
        "name": "Kavita Rao",
        "location": "Indiranagar, Bangalore",
        "property_requirement": "3 BHK Penthouse with Terrace",
        "budget": "₹3.8 Cr",
        "buying_timeline": "Within 30 days",
        "customer_message": "Looking for immediate site visit. Loan pre-approved."
    }
    response = client.post("/api/leads", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["name"] == payload["name"]
    assert data["budget"] == payload["budget"]


def test_6_created_lead_can_subsequently_be_retrieved():
    """6. The created lead can subsequently be retrieved via GET."""
    payload = {
        "name": "Arjun Singhal",
        "location": "Sarjapur Road, Bangalore",
        "property_requirement": "4 BHK Independent Villa",
        "budget": "₹4.2 Cr",
        "buying_timeline": "Within 15 days",
        "customer_message": "Ready to book this weekend if OC is received."
    }
    create_res = client.post("/api/leads", json=payload)
    assert create_res.status_code == 201
    created_id = create_res.json()["id"]

    # Verify retrieval
    get_res = client.get(f"/api/leads/{created_id}")
    assert get_res.status_code == 200
    assert get_res.json()["id"] == created_id
    assert get_res.json()["name"] == payload["name"]


def test_7_put_leads_updates_record():
    """7. PUT /api/leads/{id} updates a record."""
    update_payload = {
        "name": "Rajesh Sharma (Updated)",
        "location": "Whitefield Prime, Bangalore",
        "property_requirement": "3 BHK Luxury Apartment (High Floor)",
        "budget": "₹2.0 Cr - ₹2.5 Cr",
        "buying_timeline": "Immediate / 7 days",
        "customer_message": "Updated timeline to 7 days due to urgent relocation."
    }
    response = client.put("/api/leads/lead-101", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "lead-101"
    assert data["name"] == "Rajesh Sharma (Updated)"
    assert data["budget"] == "₹2.0 Cr - ₹2.5 Cr"

    # Confirm persistence in DB
    verify_res = client.get("/api/leads/lead-101")
    assert verify_res.json()["name"] == "Rajesh Sharma (Updated)"


def test_8_delete_leads_removes_record():
    """8. DELETE /api/leads/{id} removes a record."""
    response = client.delete("/api/leads/lead-105")
    assert response.status_code == 200
    assert "deleted" in response.json()["message"].lower()

    # Confirm total leads count decreased
    list_res = client.get("/api/leads")
    ids = [lead["id"] for lead in list_res.json()]
    assert "lead-105" not in ids
    assert len(list_res.json()) == 4


def test_9_retrieving_deleted_lead_returns_404():
    """9. Retrieving a deleted lead returns 404."""
    # Delete lead-104
    del_res = client.delete("/api/leads/lead-104")
    assert del_res.status_code == 200

    # Attempt to retrieve deleted lead-104
    get_res = client.get("/api/leads/lead-104")
    assert get_res.status_code == 404
    assert "not found" in get_res.json()["detail"].lower()


def test_10_invalid_post_payload_returns_422():
    """10. Invalid POST payload still returns 422."""
    # Missing required 'property_requirement' and 'budget'
    invalid_payload = {
        "name": "Incomplete Prospect",
        "location": "Hebbal"
    }
    response = client.post("/api/leads", json=invalid_payload)
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data
    assert isinstance(data["detail"], list)
