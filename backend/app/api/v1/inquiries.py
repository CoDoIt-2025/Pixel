import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Inquiry, ActivityItem
from app.schemas.schemas import InquiryCreate, InquiryResponse, InquiryReplyCreate

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])

class StatusUpdate(BaseModel):
    status: str

@router.get("", response_model=List[InquiryResponse])
def get_inquiries(
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Inquiry)
    if status and status != "ALL":
        query = query.filter(Inquiry.status == status)
    inquiries = query.order_by(Inquiry.date.desc()).all()
    return [
        InquiryResponse(
            id=i.id,
            name=i.name,
            email=i.email,
            company=i.company or "",
            service=i.service or "",
            budget=i.budget or "",
            message=i.message,
            date=i.date or "",
            status=i.status,
            replies=i.replies or []
        ) for i in inquiries
    ]

@router.post("", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
def create_inquiry(data: InquiryCreate, db: Session = Depends(get_db)):
    inquiry = Inquiry(
        name=data.name,
        email=data.email,
        company=data.company or "",
        service=data.service or "",
        budget=data.budget or "",
        message=data.message,
        status=data.status,
        date=datetime.utcnow().strftime("%Y-%m-%d"),
        replies=[]
    )
    db.add(inquiry)
    db.add(ActivityItem(
        user="Website Visitor",
        action="submitted new client RFP",
        target=f"{inquiry.name} ({inquiry.company or 'Direct'})",
        type="inquiry"
    ))
    db.commit()
    db.refresh(inquiry)
    return InquiryResponse(
        id=inquiry.id,
        name=inquiry.name,
        email=inquiry.email,
        company=inquiry.company or "",
        service=inquiry.service or "",
        budget=inquiry.budget or "",
        message=inquiry.message,
        date=inquiry.date or "",
        status=inquiry.status,
        replies=inquiry.replies or []
    )

@router.patch("/{inquiry_id}/status", response_model=InquiryResponse)
def update_inquiry_status(inquiry_id: str, payload: StatusUpdate, db: Session = Depends(get_db)):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
        
    inquiry.status = payload.status
    db.commit()
    db.refresh(inquiry)
    return InquiryResponse(
        id=inquiry.id,
        name=inquiry.name,
        email=inquiry.email,
        company=inquiry.company or "",
        service=inquiry.service or "",
        budget=inquiry.budget or "",
        message=inquiry.message,
        date=inquiry.date or "",
        status=inquiry.status,
        replies=inquiry.replies or []
    )

@router.post("/{inquiry_id}/replies", response_model=InquiryResponse)
def reply_to_inquiry(inquiry_id: str, reply: InquiryReplyCreate, db: Session = Depends(get_db)):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
        
    new_reply = {
        "id": f"REP-{str(uuid.uuid4())[:8]}",
        "sender": reply.sender or "Pixel Support Team",
        "message": reply.message,
        "timestamp": datetime.utcnow().strftime("%b %d, %Y %I:%M %p")
    }
    replies = list(inquiry.replies or [])
    replies.append(new_reply)
    inquiry.replies = replies
    
    # Auto mark as In Progress or Resolved
    if inquiry.status == "New":
        inquiry.status = "In Progress"
        
    db.add(ActivityItem(
        user="Admin User",
        action="replied to inquiry",
        target=inquiry.name,
        type="inquiry"
    ))
    db.commit()
    db.refresh(inquiry)
    return InquiryResponse(
        id=inquiry.id,
        name=inquiry.name,
        email=inquiry.email,
        company=inquiry.company or "",
        service=inquiry.service or "",
        budget=inquiry.budget or "",
        message=inquiry.message,
        date=inquiry.date or "",
        status=inquiry.status,
        replies=inquiry.replies or []
    )

@router.delete("/{inquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_inquiry(inquiry_id: str, db: Session = Depends(get_db)):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    db.delete(inquiry)
    db.commit()
    return None
