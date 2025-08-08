import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"

class Settings:
    PROJECT_NAME: str = "My FastAPI App"
    FRONTEND_DIST: Path = FRONTEND_DIST

settings = Settings()
