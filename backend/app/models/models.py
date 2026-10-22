import uuid
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
    JSON,
)
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False, default="Admin User")
    avatar = Column(String(500), default="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150")
    role = Column(String(100), default="Super Admin")
    bio = Column(Text, default="Engineering Lead & Fullstack Architect at Pixel")
    timezone = Column(String(100), default="UTC+5:30")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Client(Base):
    __tablename__ = "clients"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    company = Column(String(255), nullable=False)
    contact_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), default="")
    industry = Column(String(100), default="Technology")
    total_spend = Column(Float, default=0.0)
    active_projects = Column(Integer, default=0)
    status = Column(String(50), default="Active")  # Active, Inactive, Lead
    website = Column(String(255), default="")
    location = Column(String(255), default="")
    logo = Column(String(500), default="")
    notes = Column(Text, default="")
    created_at = Column(String(50), default=lambda: datetime.utcnow().strftime("%Y-%m-%d"))

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False)  # Engineering, Design, Product, Cloud & DevOps, AI & Research
    skills = Column(JSON, default=list)  # list of strings
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50), default="")
    avatar = Column(String(500), default="")
    status = Column(String(50), default="Active")  # Active, Away, Offline
    join_date = Column(String(50), default="")
    bio = Column(Text, default="")
    location = Column(String(255), default="")

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    code = Column(String(50), unique=True, index=True, nullable=False)  # e.g. PX-101
    name = Column(String(255), nullable=False)
    client = Column(String(255), nullable=False)
    client_id = Column(String(36), nullable=True)
    status = Column(String(50), default="Planning")  # Planning, In Progress, Review, Completed
    category = Column(String(100), nullable=False)  # Web Development, Mobile Apps, UI/UX Design, Cloud Architecture, AI Solutions
    budget = Column(Float, nullable=False, default=0.0)
    spent = Column(Float, default=0.0)
    start_date = Column(String(50), default="")
    deadline = Column(String(50), nullable=False)
    progress = Column(Integer, default=0)
    description = Column(Text, default="")
    team = Column(JSON, default=list)  # list of {id, name, avatar, role}
    milestones = Column(JSON, default=list)  # list of {id, title, completed, dueDate}
    tasks = Column(JSON, default=list)  # list of {id, title, status, assignee}
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Service(Base):
    __tablename__ = "services"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, default="")
    icon_name = Column(String(100), default="Code")
    starting_price = Column(Float, default=0.0)
    features = Column(JSON, default=list)  # list of strings
    is_visible = Column(Boolean, default=True)
    delivery_time = Column(String(100), default="4-6 weeks")
    active_projects_count = Column(Integer, default=0)

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    excerpt = Column(Text, default="")
    content = Column(Text, default="")
    cover_image = Column(String(500), default="")
    author = Column(JSON, default=dict)  # {name, avatar, role}
    category = Column(String(100), default="Engineering")
    tags = Column(JSON, default=list)  # list of strings
    status = Column(String(50), default="Draft")  # Draft, Published, Scheduled
    views = Column(Integer, default=0)
    published_at = Column(String(50), default="")
    reading_time = Column(String(50), default="5 min read")
    created_at = Column(DateTime, default=datetime.utcnow)

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), default="")
    service = Column(String(255), default="")
    budget = Column(String(100), default="")
    message = Column(Text, nullable=False)
    date = Column(String(50), default=lambda: datetime.utcnow().strftime("%Y-%m-%d"))
    status = Column(String(50), default="New")  # New, In Progress, Resolved, Spam
    replies = Column(JSON, default=list)  # list of {id, sender, message, timestamp}

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    client_name = Column(String(255), nullable=False)
    client_role = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    avatar = Column(String(500), default="")
    rating = Column(Integer, default=5)
    quote = Column(Text, nullable=False)
    project = Column(String(255), default="")
    status = Column(String(50), default="Pending")  # Pending, Approved, Rejected
    date = Column(String(50), default="")

class ActivityItem(Base):
    __tablename__ = "activity_items"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user = Column(String(255), nullable=False)
    avatar = Column(String(500), default="")
    action = Column(String(255), nullable=False)
    target = Column(String(255), nullable=False)
    time = Column(String(50), default="Just now")
    type = Column(String(50), default="project")  # project, client, blog, inquiry, testimonial, team
    created_at = Column(DateTime, default=datetime.utcnow)

class SystemSettings(Base):
    __tablename__ = "system_settings"

    id = Column(String(50), primary_key=True, default="default")
    profile = Column(JSON, default=dict)
    company = Column(JSON, default=dict)
    seo = Column(JSON, default=dict)
    notifications = Column(JSON, default=dict)
    appearance = Column(JSON, default=dict)
