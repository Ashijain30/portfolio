"""Automated tests for FastAPI endpoints using TestClient."""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.lead_service import reset_leads_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def run_around_tests():
    """Reset the in-memory database before and after each test."""
    reset_leads_db()
    yield
    reset_leads_db()


def test_health_check():
    """1. Test that GET /api/health returns 200 and healthy status."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_get_all_leads():
    """2. Test that GET /api/leads returns a JSON array of mock leads."""
    response = client.get("/api/leads")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 5
    first_lead = data[0]
    assert "id" in first_lead
    assert "name" in first_lead
    assert "location" in first_lead
    assert "budget" in first_lead


def test_get_lead_by_valid_id():
    """3. Test that GET /api/leads/{id} returns an existing lead."""
    response = client.get("/api/leads/lead-101")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "lead-101"
    assert data["name"] == "Rajesh Sharma"
    assert "Whitefield" in data["location"]


def test_get_lead_by_invalid_id_returns_404():
    """4. Test that GET /api/leads/{invalid_id} returns 404 with error message."""
    response = client.get("/api/leads/non-existent-999")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()


def test_create_lead_valid_payload():
    """5. Test that POST /api/leads with valid data creates and returns a lead."""
    payload = {
        "name": "Arjun Kapoor",
        "location": "Indiranagar, Bangalore",
        "property_requirement": "4 BHK Penthouse with Terrace",
        "budget": "₹4.5 Cr - ₹5.0 Cr",
        "buying_timeline": "Within 15 days",
        "customer_message": "Looking to purchase immediately. Ready to transfer deposit this week."
    }
    response = client.post("/api/leads", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["id"].startswith("lead-")
    assert data["name"] == payload["name"]
    assert data["location"] == payload["location"]
    assert data["property_requirement"] == payload["property_requirement"]

    # Verify that the new lead is retrievable via GET
    get_response = client.get(f"/api/leads/{data['id']}")
    assert get_response.status_code == 200
    assert get_response.json()["name"] == payload["name"]


def test_create_lead_invalid_payload_returns_422():
    """6. Test that POST /api/leads with missing required fields returns 422."""
    # Missing required 'property_requirement' and 'budget'
    invalid_payload = {
        "name": "Incomplete User",
        "location": "Indiranagar"
    }
    response = client.post("/api/leads", json=invalid_payload)
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data
    assert isinstance(data["detail"], list)
