# Masal AI — AI-Powered Real Estate Lead Prioritization & Sales Assistant

> **Round 2 Forward Deployed Engineer (FDE) Assignment**  
> An intelligent inbound lead triage, scoring, and follow-up generation platform designed for real-estate sales teams.

---

## 🌟 Overview

Real-estate sales teams face high volumes of inbound inquiries with mixed intent, unclear timelines, and varying budgets. **Masal AI** is designed to immediately prioritize inbound leads into actionable categories (**HOT**, **WARM**, **COLD**), provide deep AI-grounded insights, offer conversational context-aware Q&A, and generate one-click tailored follow-up communications (WhatsApp, Email, Call Scripts).

---

## 🏗️ System Architecture

```
masal-ai/
├── frontend/               # React + Vite Single Page Application
│   ├── src/
│   │   ├── components/     # Modular UI widgets (LeadCard, PriorityBadge, Chat, etc.)
│   │   ├── services/       # API client communicating with backend
│   │   ├── App.jsx         # Main Salesperson Dashboard
│   │   └── main.jsx        # Frontend entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # FastAPI Python Backend
│   ├── app/
│   │   ├── routers/        # API endpoints (leads, ai_chat, follow_ups)
│   │   ├── services/       # Core business logic (Gemini AI service, Priority engine)
│   │   ├── config.py       # Pydantic Settings & environment variable configuration
│   │   ├── database.py     # SQLite engine & session management
│   │   ├── models.py       # SQLAlchemy ORM models
│   │   ├── schemas.py      # Pydantic validation schemas
│   │   └── main.py         # FastAPI application lifecycle and middleware
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore              # Repository ignore rules (secrets, venvs, DBs, node_modules)
├── .env.example            # Root environment variable template
└── README.md               # Project documentation
```

---

## 🚀 Key Modules & Design Rationale

1. **Frontend (React + Vite + Modern CSS / Tailwind):**
   - **Vite:** Ultra-fast HMR and build performance.
   - **Pure React:** Kept clean, modular, and easy to explain during a technical interview.
   - **Zero Secrets:** All AI calls route exclusively through the backend; no API keys exposed client-side.

2. **Backend (Python FastAPI + SQLite):**
   - **FastAPI:** High performance, native async support, automated OpenAPI documentation (`/docs`), and rigorous schema validation via Pydantic.
   - **SQLite:** Lightweight, zero-config, embedded ACID-compliant relational storage, ideal for local deployment and interviews.
   - **Gemini API:** State-of-the-art multimodal / text LLM with high token throughput and native structured JSON output capability.

3. **Security & Configuration:**
   - Secrets managed via `.env` files, strictly ignored in `.gitignore`.
   - Production-ready CORS policies and input validation.

---

## 🧭 Development Roadmap (Phase-by-Phase)

- [x] **PHASE 1:** Product architecture and project setup
- [ ] **PHASE 2:** Frontend structure and UI
- [ ] **PHASE 3:** Backend and API
- [ ] **PHASE 4:** SQLite database and lead CRUD
- [ ] **PHASE 5:** Real AI integration
- [ ] **PHASE 6:** AI analysis + structured output
- [ ] **PHASE 7:** Priority scoring
- [ ] **PHASE 8:** Lead-specific conversational AI
- [ ] **PHASE 9:** AI Follow-up Generator
- [ ] **PHASE 10:** Integration and end-to-end testing
- [ ] **PHASE 11:** UI polish and error handling
- [ ] **PHASE 12:** Deployment preparation
- [ ] **PHASE 13:** README and documentation
- [ ] **PHASE 14:** Final testing and interview preparation
