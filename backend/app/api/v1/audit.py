from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import AuditRequest, Inquiry, ActivityItem
from app.schemas.schemas import AuditRequestCreate, AuditRequestResponse

class AuditStatusUpdate(BaseModel):
    status: str

router = APIRouter(prefix="/audit-requests", tags=["Audit Requests"])

@router.get("", response_model=List[AuditRequestResponse])
def get_audit_requests(db: Session = Depends(get_db)):
    audits = db.query(AuditRequest).order_by(AuditRequest.created_at.desc()).all()
    return [
        AuditRequestResponse(
            id=a.id,
            company_name=a.company_name,
            phone_number=a.phone_number,
            google_maps_link=a.google_maps_link or "",
            google_maps_na=bool(a.google_maps_na),
            website_link=a.website_link or "",
            website_na=bool(a.website_na),
            social_media_links=a.social_media_links or "",
            social_media_na=bool(a.social_media_na),
            email=a.email or "",
            status=a.status or "New",
            created_at=a.created_at.strftime("%Y-%m-%d %H:%M:%S") if a.created_at else ""
        ) for a in audits
    ]

@router.post("", response_model=AuditRequestResponse, status_code=status.HTTP_201_CREATED)
def create_audit_request(data: AuditRequestCreate, db: Session = Depends(get_db)):
    audit = AuditRequest(
        company_name=data.company_name,
        phone_number=data.phone_number,
        google_maps_link=data.google_maps_link or "",
        google_maps_na=data.google_maps_na,
        website_link=data.website_link or "",
        website_na=data.website_na,
        social_media_links=data.social_media_links or "",
        social_media_na=data.social_media_na,
        email=data.email or "",
        status="New"
    )
    db.add(audit)

    # Also register as an inquiry so it appears in the existing admin dashboard seamlessly
    maps_info = "[Not Available]" if data.google_maps_na else (data.google_maps_link or "Not provided")
    web_info = "[Not Available]" if data.website_na else (data.website_link or "Not provided")
    social_info = "[Not Available]" if data.social_media_na else (data.social_media_links or "Not provided")
    
    inquiry_message = (
        f"Digital Presence Audit Request\n"
        f"Phone: {data.phone_number}\n"
        f"Google Maps / GBP: {maps_info}\n"
        f"Website: {web_info}\n"
        f"Social Media: {social_info}\n"
        f"Email: {data.email or 'Not provided'}"
    )

    inquiry = Inquiry(
        name=data.company_name,
        email=data.email or f"audit-{data.phone_number.replace(' ', '')}@pixelbusiness.om",
        company=data.company_name,
        service="Digital Presence Audit",
        budget="Free Audit",
        message=inquiry_message,
        status="New",
        date=datetime.utcnow().strftime("%Y-%m-%d"),
        replies=[]
    )
    db.add(inquiry)

    # Activity feed item
    activity = ActivityItem(
        user="Website Visitor",
        action="requested digital presence audit",
        target=data.company_name,
        type="inquiry"
    )
    db.add(activity)

    db.commit()
    db.refresh(audit)

    return AuditRequestResponse(
        id=audit.id,
        company_name=audit.company_name,
        phone_number=audit.phone_number,
        google_maps_link=audit.google_maps_link or "",
        google_maps_na=bool(audit.google_maps_na),
        website_link=audit.website_link or "",
        website_na=bool(audit.website_na),
        social_media_links=audit.social_media_links or "",
        social_media_na=bool(audit.social_media_na),
        email=audit.email or "",
        status=audit.status or "New",
        created_at=audit.created_at.strftime("%Y-%m-%d %H:%M:%S") if audit.created_at else ""
    )


@router.patch("/{audit_id}/status", response_model=AuditRequestResponse)
def update_audit_status(audit_id: str, payload: AuditStatusUpdate, db: Session = Depends(get_db)):
    audit = db.query(AuditRequest).filter(AuditRequest.id == audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit request not found")
    audit.status = payload.status
    db.commit()
    db.refresh(audit)
    return AuditRequestResponse(
        id=audit.id,
        company_name=audit.company_name,
        phone_number=audit.phone_number,
        google_maps_link=audit.google_maps_link or "",
        google_maps_na=bool(audit.google_maps_na),
        website_link=audit.website_link or "",
        website_na=bool(audit.website_na),
        social_media_links=audit.social_media_links or "",
        social_media_na=bool(audit.social_media_na),
        email=audit.email or "",
        status=audit.status or "New",
        created_at=audit.created_at.strftime("%Y-%m-%d %H:%M:%S") if audit.created_at else ""
    )


@router.delete("/{audit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_audit_request(audit_id: str, db: Session = Depends(get_db)):
    audit = db.query(AuditRequest).filter(AuditRequest.id == audit_id).first()
    if not audit:
        raise HTTPException(status_code=404, detail="Audit request not found")
    db.delete(audit)
    db.commit()
    return None


