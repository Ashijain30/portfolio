"""API router for AI connectivity and verification endpoints."""
from fastapi import APIRouter, HTTPException, status
from app.schemas.ai import AITestRequest, AITestResponse
from app.services import ai_service

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"]
)


@router.post(
    "/test",
    response_model=AITestResponse,
    summary="Test Gemini AI integration",
    description="Send a test prompt to the real Google Gemini model to verify API credentials and connectivity."
)
def test_gemini_connection(req: AITestRequest) -> AITestResponse:
    """Validate prompt, call Gemini via ai_service, and return the generated text."""
    try:
        generated_text = ai_service.generate_ai_response(req.prompt)
        return AITestResponse(response=generated_text)
    except ValueError as e:
        # Configuration issue (e.g. missing API key)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except RuntimeError as e:
        # Upstream Gemini model or network failure
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(e)
        )
    except Exception as e:
        # Generic internal error fallback
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected internal error occurred: {str(e)}"
        )
