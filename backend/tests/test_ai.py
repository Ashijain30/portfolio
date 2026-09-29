"""Automated tests for the AI integration endpoints using mocked Gemini service."""
from unittest.mock import patch
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_ai_test_endpoint_success():
    """Verify POST /api/ai/test returns transformed text when Gemini succeeds."""
    mock_ai_text = "A real estate lead is a potential client expressing interest in purchasing, selling, or leasing property."

    with patch("app.services.ai_service.generate_ai_response", return_value=mock_ai_text) as mock_generate:
        response = client.post(
            "/api/ai/test",
            json={"prompt": "Explain what a real estate lead is in one sentence."}
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert data["response"] == mock_ai_text
        mock_generate.assert_called_once_with("Explain what a real estate lead is in one sentence.")


def test_ai_test_endpoint_missing_api_key():
    """Verify POST /api/ai/test returns 503 Service Unavailable when API key is missing."""
    with patch(
        "app.services.ai_service.generate_ai_response",
        side_effect=ValueError("GEMINI_API_KEY is not configured on the server.")
    ):
        response = client.post(
            "/api/ai/test",
            json={"prompt": "Explain real estate lead."}
        )
        assert response.status_code == 503
        data = response.json()
        assert "detail" in data
        assert "GEMINI_API_KEY is not configured" in data["detail"]


def test_ai_test_endpoint_gemini_error():
    """Verify POST /api/ai/test returns 502 Bad Gateway when Gemini API fails."""
    with patch(
        "app.services.ai_service.generate_ai_response",
        side_effect=RuntimeError("Gemini API Error: Upstream service quota exceeded.")
    ):
        response = client.post(
            "/api/ai/test",
            json={"prompt": "Explain real estate lead."}
        )
        assert response.status_code == 502
        data = response.json()
        assert "detail" in data
        assert "Gemini API Error" in data["detail"]


def test_ai_test_endpoint_validation_error():
    """Verify POST /api/ai/test returns 422 when required prompt is missing or too short."""
    # Missing 'prompt' field
    response = client.post("/api/ai/test", json={})
    assert response.status_code == 422

    # Prompt shorter than min_length=3
    response2 = client.post("/api/ai/test", json={"prompt": "a"})
    assert response2.status_code == 422
