from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Project, ActivityItem
from app.schemas.schemas import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_projects(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Project)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter(
            Project.name.ilike(s) | Project.client.ilike(s) | Project.code.ilike(s)
        )
    if status and status != "ALL":
        query = query.filter(Project.status == status)
    if category and category != "ALL":
        query = query.filter(Project.category == category)
    
    return query.order_by(Project.created_at.desc()).all()

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    existing = db.query(Project).filter(Project.code == data.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Project code already exists")
    
    project = Project(
        name=data.name,
        code=data.code,
        client=data.client,
        client_id=data.clientId,
        status=data.status,
        category=data.category,
        budget=data.budget,
        spent=data.spent,
        deadline=data.deadline,
        start_date=data.startDate or "",
        progress=data.progress,
        description=data.description,
        team=[t.dict() for t in data.team],
        milestones=[m.dict() for m in data.milestones],
        tasks=[tk.dict() for tk in data.tasks],
    )
    db.add(project)
    
    # Log activity
    db.add(ActivityItem(
        user="Admin User",
        action="created new project",
        target=f"{project.name} ({project.code})",
        type="project"
    ))
    db.commit()
    db.refresh(project)
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, data: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = data.dict(exclude_unset=True)
    if "clientId" in update_data:
        project.client_id = update_data.pop("clientId")
    if "startDate" in update_data:
        project.start_date = update_data.pop("startDate")
    if "team" in update_data and update_data["team"] is not None:
        project.team = [t if isinstance(t, dict) else t.dict() for t in update_data["team"]]
        update_data.pop("team")
    if "milestones" in update_data and update_data["milestones"] is not None:
        project.milestones = [m if isinstance(m, dict) else m.dict() for m in update_data["milestones"]]
        update_data.pop("milestones")
    if "tasks" in update_data and update_data["tasks"] is not None:
        project.tasks = [tk if isinstance(tk, dict) else tk.dict() for tk in update_data["tasks"]]
        update_data.pop("tasks")
        
    for key, value in update_data.items():
        if value is not None and hasattr(project, key):
            setattr(project, key, value)
            
    db.add(ActivityItem(
        user="Admin User",
        action="updated project details",
        target=project.name,
        type="project"
    ))
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    name = project.name
    db.delete(project)
    db.add(ActivityItem(
        user="Admin User",
        action="deleted project",
        target=name,
        type="project"
    ))
    db.commit()
    return None
