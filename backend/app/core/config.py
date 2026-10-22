from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Pixel Admin API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # SQLite Database
    SQLITE_DB_PATH: Path = BASE_DIR / "data" / "pixel.db"
    
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        self.SQLITE_DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        # Use 4 slashes for absolute Windows path or 3 slashes with forward slashes
        clean_path = str(self.SQLITE_DB_PATH).replace("\\", "/")
        return f"sqlite:///{clean_path}"

    # JWT Security
    SECRET_KEY: str = "pixel-super-secret-production-key-change-in-env-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ]

    class Config:
        case_sensitive = True

settings = Settings()
