import os
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from app.core.config import settings
from app.core.database import engine, Base
import app.models.models  # ensure models are registered
from app.api.v1 import (
    auth,
    projects,
    clients,
    team,
    services,
    blog,
    inquiries,
    testimonials,
    faqs,
    dashboard,
    settings as settings_router,
    audit,
    upload,
    banners,
)

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables in SQLite on startup if they do not exist
    Base.metadata.create_all(bind=engine)
    
    # Auto-migrate: Ensure columns exist in SQLite if table was created previously
    with engine.connect() as conn:
        for col_def in [
            "ALTER TABLE services ADD COLUMN banner_image TEXT DEFAULT ''",
            "ALTER TABLE services ADD COLUMN banner_video TEXT DEFAULT ''",
            "ALTER TABLE services ADD COLUMN media_type TEXT DEFAULT 'illustration'",
            "ALTER TABLE services ADD COLUMN show_in_banner BOOLEAN DEFAULT 1",
        ]:
            try:
                conn.execute(text(col_def))
                conn.commit()
            except Exception:
                pass

        # Populate default 3D banners if empty
        banner_defaults = [
            ("https://i.ibb.co/VYCbZY9c/Google-Business-Profile-Management.jpg", ["%google%", "%gbp%", "%local seo%"]),
            ("https://i.ibb.co/1HYpvQT/Whats-App-Image-2026-11-10-at-9-56-33-PM.jpg", ["%website%", "%web design%"]),
            ("https://i.ibb.co/Q7rFf537/SEO-Services.jpg", ["%seo%"]),
            ("https://i.ibb.co/JwKCL0V2/Whats-App-Image-2026-11-10-at-9-56-30-PM.jpg", ["%ai%"]),
            ("https://i.ibb.co/Z1wNF9pn/Custom-Software-Web-Apps.jpg", ["%software%", "%web app%"]),
            ("https://i.ibb.co/PsCVpKW6/Social-Media-Management.jpg", ["%social%"]),
            ("https://i.ibb.co/G3Vy5PCw/Whats-App-Image-2026-11-10-at-9-56-29-PM.jpg", ["%ad%"]),
            ("https://i.ibb.co/QFmZx0bc/Whats-App-Image-2026-11-10-at-9-56-30-PM-1.jpg", ["%graphic%", "%video%"]),
            ("https://i.ibb.co/sp4TX1T0/Whats-App-Image-2026-11-10-at-9-56-32-PM-1.jpg", ["%qr%", "%menu%"]),
        ]
        for img_url, patterns in banner_defaults:
            for pat in patterns:
                try:
                    conn.execute(
                        text("UPDATE services SET banner_image = :img, media_type = 'image', show_in_banner = 1 WHERE (banner_image IS NULL OR banner_image = '') AND LOWER(title) LIKE :pat"),
                        {"img": img_url, "pat": pat}
                    )
                    conn.commit()
                except Exception:
                    pass
                
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows Next.js dev server on any port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Uploads
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Include v1 Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(clients.router, prefix=settings.API_V1_STR)
app.include_router(team.router, prefix=settings.API_V1_STR)
app.include_router(services.router, prefix=settings.API_V1_STR)
app.include_router(blog.router, prefix=settings.API_V1_STR)
app.include_router(inquiries.router, prefix=settings.API_V1_STR)
app.include_router(testimonials.router, prefix=settings.API_V1_STR)
app.include_router(faqs.router, prefix=settings.API_V1_STR)
app.include_router(settings_router.router, prefix=settings.API_V1_STR)
app.include_router(audit.router, prefix=settings.API_V1_STR)
app.include_router(upload.router, prefix=settings.API_V1_STR)
app.include_router(banners.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
    }

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "database": "sqlite"}
