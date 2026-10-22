from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Service, ActivityItem
from app.schemas.schemas import ServiceCreate, ServiceUpdate, ServiceResponse

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    services = db.query(Service).order_by(Service.starting_price.asc()).all()
    return [
        ServiceResponse(
            id=s.id,
            title=s.title,
            category=s.category,
            description=s.description or "",
            iconName=s.icon_name or "Code",
            startingPrice=s.starting_price,
            features=s.features or [],
            isVisible=s.is_visible,
            deliveryTime=s.delivery_time or "4-6 weeks",
            activeProjectsCount=s.active_projects_count or 0
        ) for s in services
    ]

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(data: ServiceCreate, db: Session = Depends(get_db)):
    service = Service(
        title=data.title,
        category=data.category,
        description=data.description,
        icon_name=data.iconName,
        starting_price=data.startingPrice,
        features=data.features,
        is_visible=data.isVisible,
        delivery_time=data.deliveryTime,
        active_projects_count=data.activeProjectsCount
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return ServiceResponse(
        id=service.id,
        title=service.title,
        category=service.category,
        description=service.description or "",
        iconName=service.icon_name or "Code",
        startingPrice=service.starting_price,
        features=service.features or [],
        isVisible=service.is_visible,
        deliveryTime=service.delivery_time or "4-6 weeks",
        activeProjectsCount=service.active_projects_count or 0
    )

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: str, data: ServiceUpdate, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
        
    update_data = data.dict(exclude_unset=True)
    mapping = {
        "iconName": "icon_name",
        "startingPrice": "starting_price",
        "isVisible": "is_visible",
        "deliveryTime": "delivery_time",
        "activeProjectsCount": "active_projects_count",
    }
    for json_k, db_k in mapping.items():
        if json_k in update_data:
            update_data[db_k] = update_data.pop(json_k)
            
    for k, v in update_data.items():
        if hasattr(service, k) and v is not None:
            setattr(service, k, v)
            
    db.commit()
    db.refresh(service)
    return ServiceResponse(
        id=service.id,
        title=service.title,
        category=service.category,
        description=service.description or "",
        iconName=service.icon_name or "Code",
        startingPrice=service.starting_price,
        features=service.features or [],
        isVisible=service.is_visible,
        deliveryTime=service.delivery_time or "4-6 weeks",
        activeProjectsCount=service.active_projects_count or 0
    )

@router.patch("/{service_id}/visibility", response_model=ServiceResponse)
def toggle_service_visibility(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
        
    service.is_visible = not service.is_visible
    db.add(ActivityItem(
        user="Admin User",
        action=f"toggled visibility to {'public' if service.is_visible else 'hidden'}",
        target=service.title,
        type="service"
    ))
    db.commit()
    db.refresh(service)
    return ServiceResponse(
        id=service.id,
        title=service.title,
        category=service.category,
        description=service.description or "",
        iconName=service.icon_name or "Code",
        startingPrice=service.starting_price,
        features=service.features or [],
        isVisible=service.is_visible,
        deliveryTime=service.delivery_time or "4-6 weeks",
        activeProjectsCount=service.active_projects_count or 0
    )

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()
    return None
