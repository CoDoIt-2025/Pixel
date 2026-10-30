from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import SystemSettings
from app.schemas.schemas import UserSettingsResponse

router = APIRouter(prefix="/settings", tags=["Settings"])

DEFAULT_SETTINGS = {
    "profile": {
        "name": "Pixel Administrator",
        "email": "admin@pixel.dev",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        "role": "Super Admin",
        "bio": "Studio Lead at Pixel Business Solutions LLC.",
        "timezone": "UTC+4:00 (Oman / GST)",
    },
    "company": {
        "name": "Pixel Business Solutions LLC",
        "email": "contact@pixelbusiness.om",
        "phone": "+968 2400 0000",
        "address": "Muscat, Sultanate of Oman | Thrissur, Kerala",
        "taxId": "CR-1049281",
        "currency": "OMR (ر.ع.)",
        "website": "https://pixelbusiness.om",
        "description": "Pixel Business Solutions LLC helps businesses build a clearer online presence through website design, SEO, Google Business Profile management, social media management and AI visibility. For restaurants and hotels, we also offer digital QR menus.",
    },
    "seo": {
        "metaTitle": "Website Design and Digital Marketing Oman | Pixel",
        "metaDescription": "Explore website design, SEO, Google Business Profile, social media, AI visibility and QR menus for businesses in Oman. Discuss your project with Pixel.",
        "keywords": "Website Design Oman, SEO Oman, Google Business Profile Oman, Social Media Oman, AI Visibility, Digital QR Menu Oman, Thrissur Kerala",
        "ogImage": "https://pixelbusiness.om/og-cover.png",
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
        "primaryColor": "#F5C542",
        "theme": "light",
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
