from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import SystemSettings
from app.schemas.schemas import UserSettingsResponse

router = APIRouter(prefix="/settings", tags=["Settings"])

DEFAULT_SETTINGS = {
    "profile": {
        "name": "Sarah Connor",
        "email": "sarah.connor@pixel.dev",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        "role": "Super Admin",
        "bio": "Engineering Lead & Fullstack Architect at Pixel.",
        "timezone": "UTC+5:30 (IST)",
    },
    "company": {
        "name": "Pixel Technologies Inc.",
        "email": "hello@pixel.dev",
        "phone": "+1 (555) 019-2834",
        "address": "548 Market St, Suite 34000, San Francisco, CA 94104",
        "taxId": "EIN-82-9481923",
        "currency": "USD ($)",
        "website": "https://pixel.dev",
    },
    "seo": {
        "metaTitle": "Pixel | Elite Enterprise Software Studio",
        "metaDescription": "Bespoke web applications, AI engineering, and cloud platforms for ambitious global enterprises.",
        "keywords": "Enterprise Software, Next.js, React, Cloud, AI Solutions",
        "ogImage": "https://pixel.dev/og-cover.png",
        "googleAnalyticsId": "G-PXEL82710",
    },
    "notifications": {
        "emailAlerts": True,
        "weeklyDigest": True,
        "milestoneAlerts": True,
        "securityAlerts": True,
        "marketingUpdates": False,
    },
    "appearance": {
        "primaryColor": "indigo",
        "compactMode": False,
        "highContrast": False,
    },
}

@router.get("", response_model=UserSettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    setting_row = db.query(SystemSettings).filter(SystemSettings.id == "default").first()
    if not setting_row:
        setting_row = SystemSettings(
            id="default",
            profile=DEFAULT_SETTINGS["profile"],
            company=DEFAULT_SETTINGS["company"],
            seo=DEFAULT_SETTINGS["seo"],
            notifications=DEFAULT_SETTINGS["notifications"],
            appearance=DEFAULT_SETTINGS["appearance"],
        )
        db.add(setting_row)
        db.commit()
        db.refresh(setting_row)
        
    return {
        "profile": setting_row.profile or DEFAULT_SETTINGS["profile"],
        "company": setting_row.company or DEFAULT_SETTINGS["company"],
        "seo": setting_row.seo or DEFAULT_SETTINGS["seo"],
        "notifications": setting_row.notifications or DEFAULT_SETTINGS["notifications"],
        "appearance": setting_row.appearance or DEFAULT_SETTINGS["appearance"],
    }

@router.put("", response_model=UserSettingsResponse)
def update_settings(updates: dict, db: Session = Depends(get_db)):
    setting_row = db.query(SystemSettings).filter(SystemSettings.id == "default").first()
    if not setting_row:
        setting_row = SystemSettings(id="default")
        db.add(setting_row)

    for section in ["profile", "company", "seo", "notifications", "appearance"]:
        if section in updates and isinstance(updates[section], dict):
            current = getattr(setting_row, section) or DEFAULT_SETTINGS[section]
            updated_dict = {**current, **updates[section]}
            setattr(setting_row, section, updated_dict)

    db.commit()
    db.refresh(setting_row)
    return {
        "profile": setting_row.profile,
        "company": setting_row.company,
        "seo": setting_row.seo,
        "notifications": setting_row.notifications,
        "appearance": setting_row.appearance,
    }
