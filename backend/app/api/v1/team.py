from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import TeamMember, ActivityItem
from app.schemas.schemas import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse

router = APIRouter(prefix="/team", tags=["Team"])

@router.get("", response_model=List[TeamMemberResponse])
def get_team_members(
    department: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(TeamMember)
    if department and department != "ALL":
        query = query.filter(TeamMember.department == department)
    if status and status != "ALL":
        query = query.filter(TeamMember.status == status)
        
    members = query.order_by(TeamMember.name.asc()).all()
    return [
        TeamMemberResponse(
            id=m.id,
            name=m.name,
            role=m.role,
            department=m.department,
            skills=m.skills or [],
            email=m.email,
            phone=m.phone or "",
            avatar=m.avatar or "",
            status=m.status,
            joinDate=m.join_date or "",
            bio=m.bio or "",
            location=m.location or ""
        ) for m in members
    ]

@router.post("", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
def create_team_member(data: TeamMemberCreate, db: Session = Depends(get_db)):
    member = TeamMember(
        name=data.name,
        role=data.role,
        department=data.department,
        skills=data.skills,
        email=data.email,
        phone=data.phone or "",
        avatar=data.avatar or "",
        status=data.status,
        join_date=data.joinDate or "",
        bio=data.bio or "",
        location=data.location or ""
    )
    db.add(member)
    db.add(ActivityItem(
        user="Admin User",
        action="welcomed new talent to studio",
        target=f"{member.name} ({member.role})",
        type="team"
    ))
    db.commit()
    db.refresh(member)
    return TeamMemberResponse(
        id=member.id,
        name=member.name,
        role=member.role,
        department=member.department,
        skills=member.skills or [],
        email=member.email,
        phone=member.phone or "",
        avatar=member.avatar or "",
        status=member.status,
        joinDate=member.join_date or "",
        bio=member.bio or "",
        location=member.location or ""
    )

@router.put("/{member_id}", response_model=TeamMemberResponse)
def update_team_member(member_id: str, data: TeamMemberUpdate, db: Session = Depends(get_db)):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
        
    update_data = data.dict(exclude_unset=True)
    if "joinDate" in update_data:
        update_data["join_date"] = update_data.pop("joinDate")
        
    for key, value in update_data.items():
        if hasattr(member, key) and value is not None:
            setattr(member, key, value)
            
    db.commit()
    db.refresh(member)
    return TeamMemberResponse(
        id=member.id,
        name=member.name,
        role=member.role,
        department=member.department,
        skills=member.skills or [],
        email=member.email,
        phone=member.phone or "",
        avatar=member.avatar or "",
        status=member.status,
        joinDate=member.join_date or "",
        bio=member.bio or "",
        location=member.location or ""
    )

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(member_id: str, db: Session = Depends(get_db)):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    db.delete(member)
    db.commit()
    return None
