"""AI Service for Google Gemini API integration and structured lead qualification analysis.

Encapsulates all communication with the Google GenAI SDK.
Guarantees API keys remain server-side and enforces Pydantic validation over structured AI outputs.
"""
import re
import logging
from google import genai
from google.genai import types
from google.genai.errors import APIError
from pydantic import ValidationError

from app.config import settings
from app.models.lead import Lead
from app.schemas.lead_analysis import LeadAnalysis

logger = logging.getLogger(__name__)


def generate_ai_response(prompt: str) -> str:
    """Send a plain text prompt to the Google Gemini model and return the text response.
    
    Used for general text generation and baseline connectivity testing.
    """
    api_key = settings.GEMINI_API_KEY.strip() if settings.GEMINI_API_KEY else ""

    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY is not configured on the server. "
            "Please provide a valid Gemini API key in your backend .env file."
        )

    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt
        )

        if not response or not response.text:
            raise RuntimeError("Gemini model returned an empty or unusable response.")

        return response.text.strip()

    except ValueError:
        raise
    except APIError as e:
        logger.error(f"Gemini API error occurred: {e}")
        err_msg = getattr(e, "message", None) or "Upstream Gemini API rejected the request."
        raise RuntimeError(f"Gemini API Error: {err_msg}")
    except Exception as e:
        logger.error(f"Unexpected error communicating with Gemini: {e}")
        raise RuntimeError(f"Failed to communicate with AI provider: {str(e)}")


def build_lead_analysis_prompt(lead: Lead) -> str:
    """Construct an AI instruction prompt grounded in the selected lead's actual details."""
    return f"""You are an elite real-estate sales copilot assisting a property consultant.
Analyze the following inbound real-estate lead carefully and generate a qualification dossier.

LEAD DOSSIER:
- Customer Name: {lead.name}
- Target Locality / Micro-Market: {lead.location}
- Property Requirement: {lead.property_requirement}
- Stated Budget: {lead.budget}
- Buying Timeline: {lead.buying_timeline}
- Original Customer Message: "{lead.customer_message}"

OBJECTIVE:
Evaluate the lead's true purchase readiness and provide structured sales intelligence:
1. summary: A crisp 1-2 sentence executive briefing on who this buyer is and what they want.
2. intent: The customer's core buying motivation (e.g., primary residence upgrade, time-pressured family relocation, passive investment).
3. key_requirements: Specific extracted requirements, features, or constraints (location, layout, amenities, handover condition).
4. objections_or_concerns: Explicit hesitations or implicit risks (budget gap, timeline friction, documentation, loan approval).
5. recommended_next_action: The single most impactful, tactical next step the salesperson should take immediately.
6. suggested_response: A personalized, persuasive reply message that directly addresses their message and moves them toward an appointment.
"""


def clean_json_text(raw_text: str) -> str:
    """Strip markdown codeblock wrappers if the model includes them."""
    cleaned = raw_text.strip()
    if cleaned.startswith("```"):
        # Remove opening ```json or ```
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
        # Remove trailing ```
        cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()


def analyze_lead_with_gemini(lead: Lead) -> LeadAnalysis:
    """Perform real structured AI analysis on an inbound lead using Gemini.
    
    Utilizes Gemini's native JSON output schema capabilities and validates the
    resulting structure against the LeadAnalysis Pydantic schema.
    
    Args:
        lead: SQLAlchemy Lead ORM entity retrieved from SQLite.
        
    Returns:
        Validated LeadAnalysis Pydantic model instance.
        
    Raises:
        ValueError: When GEMINI_API_KEY is not configured.
        RuntimeError: When model generation fails or response cannot be parsed/validated.
    """
    api_key = settings.GEMINI_API_KEY.strip() if settings.GEMINI_API_KEY else ""

    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY is not configured on the server. "
            "Please provide a valid Gemini API key in your backend .env file."
        )

    prompt = build_lead_analysis_prompt(lead)

    try:
        client = genai.Client(api_key=api_key)

        # Enforce structured JSON output directly at the model decoding layer
        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=LeadAnalysis,
            temperature=0.2  # Low temperature for deterministic qualification
        )

        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config=config
        )

        if not response or not response.text:
            raise RuntimeError("Gemini model returned an empty response for lead analysis.")

        clean_text = clean_json_text(response.text)

        # Validate against the Pydantic schema (Defense in Depth)
        validated_analysis = LeadAnalysis.model_validate_json(clean_text)
        return validated_analysis

    except ValueError:
        raise
    except APIError as e:
        logger.error(f"Gemini API error during lead analysis: {e}")
        err_msg = getattr(e, "message", None) or "Upstream Gemini API rejected the analysis request."
        raise RuntimeError(f"Gemini API Error: {err_msg}")
    except (ValidationError, Exception) as e:
        logger.error(f"Structured validation failed for lead analysis: {e}")
        raise RuntimeError(f"Failed to parse structured AI qualification analysis: {str(e)}")
