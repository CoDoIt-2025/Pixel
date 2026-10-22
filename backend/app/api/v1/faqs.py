from typing import List, Optional
from datetime import datetime
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.core.database import get_db
from app.models.models import FAQ, ActivityItem
from app.schemas.schemas import FAQCreate, FAQUpdate, FAQResponse

router = APIRouter(prefix="/faqs", tags=["FAQs"])

def serialize_faq(f: FAQ) -> FAQResponse:
    return FAQResponse(
        id=f.id,
        question=f.question,
        answer=f.answer,
        category=f.category or "General",
        order=f.order if f.order is not None else 0,
        isActive=bool(f.is_active),
        createdAt=f.created_at.isoformat() if f.created_at else None,
    )

@router.get("", response_model=List[FAQResponse])
def get_faqs(
    category: Optional[str] = None,
    search: Optional[str] = None,
    active_only: bool = False,
    db: Session = Depends(get_db),
):
    query = db.query(FAQ)
    if active_only:
        query = query.filter(FAQ.is_active == True)
    if category and isinstance(category, str) and category.upper() != "ALL":
        query = query.filter(FAQ.category == category)
    if search and isinstance(search, str):
        search_pattern = f"%{search.strip()}%"
        query = query.filter(
            or_(
                FAQ.question.ilike(search_pattern),
                FAQ.answer.ilike(search_pattern),
                FAQ.category.ilike(search_pattern),
            )
        )

    faqs = query.order_by(FAQ.order.asc(), FAQ.created_at.asc()).all()
    return [serialize_faq(f) for f in faqs]

@router.post("", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
def create_faq(data: FAQCreate, db: Session = Depends(get_db)):
    faq_id = f"FAQ-{int(datetime.utcnow().timestamp())}"
    faq = FAQ(
        id=faq_id,
        question=data.question.strip(),
        answer=data.answer.strip(),
        category=data.category.strip() or "General",
        order=data.order,
        is_active=data.isActive,
        created_at=datetime.utcnow(),
    )
    db.add(faq)

    # Activity log
    db.add(
        ActivityItem(
            user="Admin User",
            action="created new FAQ",
            target=faq.question[:50] + ("..." if len(faq.question) > 50 else ""),
            type="faq",
        )
    )

    db.commit()
    db.refresh(faq)
    return serialize_faq(faq)

@router.get("/{faq_id}", response_model=FAQResponse)
def get_faq(faq_id: str, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return serialize_faq(faq)

@router.put("/{faq_id}", response_model=FAQResponse)
def update_faq(faq_id: str, data: FAQUpdate, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")

    if data.question is not None:
        faq.question = data.question.strip()
    if data.answer is not None:
        faq.answer = data.answer.strip()
    if data.category is not None:
        faq.category = data.category.strip()
    if data.order is not None:
        faq.order = data.order
    if data.isActive is not None:
        faq.is_active = data.isActive

    db.add(
        ActivityItem(
            user="Admin User",
            action="updated FAQ",
            target=faq.question[:50] + ("..." if len(faq.question) > 50 else ""),
            type="faq",
        )
    )

    db.commit()
    db.refresh(faq)
    return serialize_faq(faq)

@router.patch("/{faq_id}/toggle", response_model=FAQResponse)
def toggle_faq(faq_id: str, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")

    faq.is_active = not faq.is_active
    status_str = "activated" if faq.is_active else "deactivated"
    db.add(
        ActivityItem(
            user="Admin User",
            action=f"{status_str} FAQ",
            target=faq.question[:50] + ("..." if len(faq.question) > 50 else ""),
            type="faq",
        )
    )

    db.commit()
    db.refresh(faq)
    return serialize_faq(faq)

@router.delete("/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_faq(faq_id: str, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")

    q_title = faq.question[:50]
    db.delete(faq)
    db.add(
        ActivityItem(
            user="Admin User",
            action="deleted FAQ",
            target=q_title,
            type="faq",
        )
    )
    db.commit()
    return None
