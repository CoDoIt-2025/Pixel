from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Client, ActivityItem
from app.schemas.schemas import ClientCreate, ClientUpdate, ClientResponse

router = APIRouter(prefix="/clients", tags=["Clients"])

@router.get("", response_model=List[ClientResponse])
def get_clients(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Client)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter(Client.company.ilike(s) | Client.contact_name.ilike(s) | Client.email.ilike(s))
    if status and status != "ALL":
        query = query.filter(Client.status == status)
    
    clients = query.order_by(Client.company.asc()).all()
    # Map snake_case to response fields
    return [
        ClientResponse(
            id=c.id,
            company=c.company,
            contactName=c.contact_name,
            email=c.email,
            phone=c.phone or "",
            industry=c.industry or "Technology",
            totalSpend=c.total_spend or 0.0,
            activeProjects=c.active_projects or 0,
            status=c.status,
            website=c.website or "",
            location=c.location or "",
            logo=c.logo or "",
            notes=c.notes or "",
            createdAt=c.created_at or ""
        ) for c in clients
    ]

@router.post("", response_model=ClientResponse, status_code=status.HTTP_201_CREATED)
def create_client(data: ClientCreate, db: Session = Depends(get_db)):
    client = Client(
        company=data.company,
        contact_name=data.contactName,
        email=data.email,
        phone=data.phone or "",
        industry=data.industry,
        total_spend=data.totalSpend,
        active_projects=data.activeProjects,
        status=data.status,
        website=data.website or "",
        location=data.location or "",
        logo=data.logo or "",
        notes=data.notes or ""
    )
    db.add(client)
    db.add(ActivityItem(
        user="Admin User",
        action="onboarded new enterprise client",
        target=client.company,
        type="client"
    ))
    db.commit()
    db.refresh(client)
    return ClientResponse(
        id=client.id,
        company=client.company,
        contactName=client.contact_name,
        email=client.email,
        phone=client.phone or "",
        industry=client.industry,
        totalSpend=client.total_spend,
        activeProjects=client.active_projects,
        status=client.status,
        website=client.website or "",
        location=client.location or "",
        logo=client.logo or "",
        notes=client.notes or "",
        createdAt=client.created_at
    )

@router.put("/{client_id}", response_model=ClientResponse)
def update_client(client_id: str, data: ClientUpdate, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    update_data = data.dict(exclude_unset=True)
    field_mappings = {
        "contactName": "contact_name",
        "totalSpend": "total_spend",
        "activeProjects": "active_projects",
    }
    for json_key, db_key in field_mappings.items():
        if json_key in update_data:
            update_data[db_key] = update_data.pop(json_key)
            
    for key, value in update_data.items():
        if hasattr(client, key) and value is not None:
            setattr(client, key, value)
            
    db.commit()
    db.refresh(client)
    return ClientResponse(
        id=client.id,
        company=client.company,
        contactName=client.contact_name,
        email=client.email,
        phone=client.phone or "",
        industry=client.industry,
        totalSpend=client.total_spend,
        activeProjects=client.active_projects,
        status=client.status,
        website=client.website or "",
        location=client.location or "",
        logo=client.logo or "",
        notes=client.notes or "",
        createdAt=client.created_at
    )

@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(client_id: str, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    db.delete(client)
    db.commit()
    return None
