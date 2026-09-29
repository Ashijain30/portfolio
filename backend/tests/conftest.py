"""Shared pytest configuration, test database fixtures, and TestClient setup."""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models.lead import Lead
from app.services.lead_service import INITIAL_SEED_LEADS

# In-memory SQLite database shared across test fixtures with thread isolation
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


@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    """Create fresh tables and seed demo leads before each test; drop tables after."""
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


@pytest.fixture
def client():
    """Reusable TestClient fixture."""
    return TestClient(app)
