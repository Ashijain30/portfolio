"""Automated tests for Phase 6 AI Lead Analysis endpoint."""
from unittest.mock import patch
from app.models.lead import Lead
from app.schemas.lead_analysis import LeadAnalysis
from app.services.ai_service import build_lead_analysis_prompt


def test_prompt_builder_contains_lead_context():
    """Verify that build_lead_analysis_prompt incorporates all relevant lead fields."""
    sample_lead = Lead(
        id="lead-test",
        name="Sunita Rao",
        location="Indiranagar, Bangalore",
        property_requirement="3 BHK Penthouse",
        budget="₹3.5 Cr",
        buying_timeline="15 days",
        customer_message="Need immediate closing with bank loan approval."
    )
    prompt = build_lead_analysis_prompt(sample_lead)
    assert "Sunita Rao" in prompt
    assert "Indiranagar, Bangalore" in prompt
    assert "3 BHK Penthouse" in prompt
    assert "₹3.5 Cr" in prompt
    assert "15 days" in prompt
    assert "Need immediate closing with bank loan approval." in prompt


def test_analyze_lead_success(client):
    """1. Test successful AI lead analysis returns 200 and matches LeadAnalysis schema."""
    mock_analysis = LeadAnalysis(
        summary="High-intent buyer seeking a 3 BHK in Whitefield with urgent 15-day timeline.",
        intent="Immediate primary residence purchase driven by school calendar.",
        key_requirements=["3 BHK Luxury Apartment", "Whitefield", "Balcony", "Clubhouse"],
        objections_or_concerns=["Tight 15-day closing window", "Verification of occupancy certificate"],
        recommended_next_action="Schedule Saturday morning site tour and assist with HDFC loan documents.",
        suggested_response="Hi Rajesh, I have 2 ready-to-move 3 BHK units in Whitefield matching your ₹2 Cr budget."
    )

    with patch("app.services.ai_service.analyze_lead_with_gemini", return_value=mock_analysis) as mock_analyze:
        response = client.post("/api/leads/lead-101/analyze")
        assert response.status_code == 200
        data = response.json()
        assert data["summary"] == mock_analysis.summary
        assert data["intent"] == mock_analysis.intent
        assert len(data["key_requirements"]) == 4
        assert len(data["objections_or_concerns"]) == 2
        assert "recommended_next_action" in data
        assert "suggested_response" in data
        mock_analyze.assert_called_once()


def test_analyze_lead_not_found(client):
    """2. Test that analyzing a non-existent lead returns 404."""
    response = client.post("/api/leads/non-existent-lead-999/analyze")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()


def test_analyze_lead_missing_api_key(client):
    """3. Test that missing GEMINI_API_KEY returns 503 Service Unavailable."""
    with patch(
        "app.services.ai_service.analyze_lead_with_gemini",
        side_effect=ValueError("GEMINI_API_KEY is not configured on the server.")
    ):
        response = client.post("/api/leads/lead-101/analyze")
        assert response.status_code == 503
        data = response.json()
        assert "GEMINI_API_KEY is not configured" in data["detail"]


def test_analyze_lead_gemini_provider_failure(client):
    """4. Test that upstream Gemini failure returns 502 Bad Gateway."""
    with patch(
        "app.services.ai_service.analyze_lead_with_gemini",
        side_effect=RuntimeError("Gemini API Error: Quota exceeded or service temporarily unavailable.")
    ):
        response = client.post("/api/leads/lead-101/analyze")
        assert response.status_code == 502
        data = response.json()
        assert "Gemini API Error" in data["detail"]


def test_analyze_lead_malformed_ai_output(client):
    """5. Test that malformed JSON or validation failure returns 502 safely without crashing."""
    with patch(
        "app.services.ai_service.analyze_lead_with_gemini",
        side_effect=RuntimeError("Failed to parse structured AI qualification analysis: Invalid JSON format.")
    ):
        response = client.post("/api/leads/lead-101/analyze")
        assert response.status_code == 502
        data = response.json()
        assert "Failed to parse structured AI qualification analysis" in data["detail"]
