from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Testimonial, ActivityItem
from app.schemas.schemas import TestimonialCreate, TestimonialResponse

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

class TestimonialStatusUpdate(BaseModel):
    status: str

@router.get("", response_model=List[TestimonialResponse])
def get_testimonials(
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Testimonial)
    if status and status != "ALL":
        query = query.filter(Testimonial.status == status)
    testimonials = query.order_by(Testimonial.rating.desc()).all()
    return [
        TestimonialResponse(
            id=t.id,
            clientName=t.client_name,
            clientRole=t.client_role,
            company=t.company,
            avatar=t.avatar or "",
            rating=t.rating,
            quote=t.quote,
            project=t.project or "",
            status=t.status,
            date=t.date or ""
        ) for t in testimonials
    ]

@router.post("", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(data: TestimonialCreate, db: Session = Depends(get_db)):
    t = Testimonial(
        client_name=data.clientName,
        client_role=data.clientRole,
        company=data.company,
        avatar=data.avatar or "",
        rating=data.rating,
        quote=data.quote,
        project=data.project or "",
        status=data.status,
        date=datetime.utcnow().strftime("%b %Y")
    )
    db.add(t)
    db.commit()
    db.refresh(t)
    return TestimonialResponse(
        id=t.id,
        clientName=t.client_name,
        clientRole=t.client_role,
        company=t.company,
        avatar=t.avatar or "",
        rating=t.rating,
        quote=t.quote,
        project=t.project or "",
        status=t.status,
        date=t.date or ""
    )

@router.patch("/{testimonial_id}/status", response_model=TestimonialResponse)
def update_testimonial_status(testimonial_id: str, payload: TestimonialStatusUpdate, db: Session = Depends(get_db)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    t.status = payload.status
    db.add(ActivityItem(
        user="Admin User",
        action=f"marked testimonial as {payload.status.lower()}",
        target=f"{t.client_name} ({t.company})",
        type="testimonial"
    ))
    db.commit()
    db.refresh(t)
    return TestimonialResponse(
        id=t.id,
        clientName=t.client_name,
        clientRole=t.client_role,
        company=t.company,
        avatar=t.avatar or "",
        rating=t.rating,
        quote=t.quote,
        project=t.project or "",
        status=t.status,
        date=t.date or ""
    )

@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(testimonial_id: str, db: Session = Depends(get_db)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(t)
    db.commit()
    return None
