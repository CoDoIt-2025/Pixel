from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Banner, ActivityItem
from app.schemas.schemas import BannerCreate, BannerUpdate, BannerResponse

router = APIRouter(prefix="/banners", tags=["Banners"])

def to_response(b: Banner) -> BannerResponse:
    return BannerResponse(
        id=b.id,
        title=b.title,
        subtitle=b.subtitle or "",
        mediaUrl=b.media_url,
        mediaType=b.media_type or "image",
        ctaText=b.cta_text or "Learn More",
        ctaLink=b.cta_link or "#audit-request",
        badgeText=b.badge_text or "Commercial Showcase",
        isActive=bool(b.is_active),
        sortOrder=b.sort_order or 0,
        createdAt=b.created_at.strftime("%Y-%m-%d %H:%M") if b.created_at else "",
    )

@router.get("", response_model=List[BannerResponse])
def get_banners(
    active_only: bool = Query(False),
    db: Session = Depends(get_db)
):
    query = db.query(Banner)
    if active_only:
        query = query.filter(Banner.is_active == True)
    banners = query.order_by(Banner.sort_order.asc(), Banner.created_at.desc()).all()
    return [to_response(b) for b in banners]

@router.post("", response_model=BannerResponse, status_code=status.HTTP_201_CREATED)
def create_banner(data: BannerCreate, db: Session = Depends(get_db)):
    banner = Banner(
        title=data.title,
        subtitle=data.subtitle or "",
        media_url=data.mediaUrl,
        media_type=data.mediaType,
        cta_text=data.ctaText or "Learn More",
        cta_link=data.ctaLink or "#audit-request",
        badge_text=data.badgeText or "Commercial Showcase",
        is_active=data.isActive,
        sort_order=data.sortOrder,
    )
    db.add(banner)
    db.add(ActivityItem(
        user="Admin User",
        action="created hero banner",
        target=banner.title,
        type="banner"
    ))
    db.commit()
    db.refresh(banner)
    return to_response(banner)

@router.put("/{banner_id}", response_model=BannerResponse)
def update_banner(banner_id: str, data: BannerUpdate, db: Session = Depends(get_db)):
    banner = db.query(Banner).filter(Banner.id == banner_id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")

    update_data = data.dict(exclude_unset=True)
    mapping = {
        "mediaUrl": "media_url",
        "mediaType": "media_type",
        "ctaText": "cta_text",
        "ctaLink": "cta_link",
        "badgeText": "badge_text",
        "isActive": "is_active",
        "sortOrder": "sort_order",
    }
    for json_k, db_k in mapping.items():
        if json_k in update_data:
            update_data[db_k] = update_data.pop(json_k)

    for k, v in update_data.items():
        if hasattr(banner, k) and v is not None:
            setattr(banner, k, v)

    db.add(ActivityItem(
        user="Admin User",
        action="updated hero banner",
        target=banner.title,
        type="banner"
    ))
    db.commit()
    db.refresh(banner)
    return to_response(banner)

@router.patch("/{banner_id}/toggle", response_model=BannerResponse)
def toggle_banner(banner_id: str, db: Session = Depends(get_db)):
    banner = db.query(Banner).filter(Banner.id == banner_id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")

    banner.is_active = not banner.is_active
    db.commit()
    db.refresh(banner)
    return to_response(banner)

@router.delete("/{banner_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_banner(banner_id: str, db: Session = Depends(get_db)):
    banner = db.query(Banner).filter(Banner.id == banner_id).first()
    if not banner:
        raise HTTPException(status_code=404, detail="Banner not found")

    db.delete(banner)
    db.commit()
    return None

