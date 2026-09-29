"""Database configuration, engine setup, and session management using SQLAlchemy."""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import Generator
from app.config import settings

# SQLite requires 'check_same_thread: False' so requests across threads can share connections safely in FastAPI
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    echo=False  # Set to True if SQL query logging is needed during debugging
)

# Factory for creating new database sessions per request
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Declarative Base for ORM models
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that creates and yields a database session.
    
    Guarantees session closure after request handling finishes, preventing connection leaks.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
