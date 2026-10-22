from typing import Optional, List, Any, Literal
from pydantic import BaseModel, Field, EmailStr

# Auth Schemas
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    avatar: str
    role: str
    bio: str
    timezone: str

    class Config:
        from_attributes = True

# Project Sub-schemas
class ProjectTeamMember(BaseModel):
    id: str
    name: str
    avatar: str
    role: str

class ProjectMilestone(BaseModel):
    id: str
    title: str
    completed: bool
    dueDate: str

class ProjectTask(BaseModel):
    id: str
    title: str
    status: Literal["Todo", "In Progress", "Done"]
    assignee: str

class ProjectCreate(BaseModel):
    name: str
    code: str
    client: str
    clientId: Optional[str] = None
    status: Literal["Planning", "In Progress", "Review", "Completed"] = "Planning"
    category: Literal["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Architecture", "AI Solutions"]
    budget: float
    spent: float = 0.0
    deadline: str
    startDate: Optional[str] = ""
    progress: int = 0
    description: str = ""
    team: List[ProjectTeamMember] = []
    milestones: List[ProjectMilestone] = []
    tasks: List[ProjectTask] = []

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    client: Optional[str] = None
    clientId: Optional[str] = None
    status: Optional[Literal["Planning", "In Progress", "Review", "Completed"]] = None
    category: Optional[Literal["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Architecture", "AI Solutions"]] = None
    budget: Optional[float] = None
    spent: Optional[float] = None
    deadline: Optional[str] = None
    startDate: Optional[str] = None
    progress: Optional[int] = None
    description: Optional[str] = None
    team: Optional[List[ProjectTeamMember]] = None
    milestones: Optional[List[ProjectMilestone]] = None
    tasks: Optional[List[ProjectTask]] = None

class ProjectResponse(BaseModel):
    id: str
    name: str
    code: str
    client: str
    clientId: Optional[str] = None
    status: str
    category: str
    budget: float
    spent: float
    deadline: str
    startDate: Optional[str] = None
    progress: int
    description: str
    team: List[ProjectTeamMember]
    milestones: List[ProjectMilestone]
    tasks: List[ProjectTask]

    class Config:
        from_attributes = True

# Client Schemas
class ClientCreate(BaseModel):
    company: str
    contactName: str
    email: str
    phone: Optional[str] = ""
    industry: str = "Technology"
    totalSpend: float = 0.0
    activeProjects: int = 0
    status: Literal["Active", "Inactive", "Lead"] = "Active"
    website: Optional[str] = ""
    location: Optional[str] = ""
    logo: Optional[str] = ""
    notes: Optional[str] = ""

class ClientUpdate(BaseModel):
    company: Optional[str] = None
    contactName: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    industry: Optional[str] = None
    totalSpend: Optional[float] = None
    activeProjects: Optional[int] = None
    status: Optional[Literal["Active", "Inactive", "Lead"]] = None
    website: Optional[str] = None
    location: Optional[str] = None
    logo: Optional[str] = None
    notes: Optional[str] = None

class ClientResponse(BaseModel):
    id: str
    company: str
    contactName: str
    email: str
    phone: str
    industry: str
    totalSpend: float
    activeProjects: int
    status: str
    website: str
    location: str
    logo: str
    notes: Optional[str] = ""
    createdAt: str

    class Config:
        from_attributes = True

# Team Member Schemas
class TeamMemberCreate(BaseModel):
    name: str
    role: str
    department: Literal["Engineering", "Design", "Product", "Cloud & DevOps", "AI & Research"]
    skills: List[str] = []
    email: str
    phone: Optional[str] = ""
    avatar: Optional[str] = ""
    status: Literal["Active", "Away", "Offline"] = "Active"
    joinDate: Optional[str] = ""
    bio: Optional[str] = ""
    location: Optional[str] = ""

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    department: Optional[Literal["Engineering", "Design", "Product", "Cloud & DevOps", "AI & Research"]] = None
    skills: Optional[List[str]] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    status: Optional[Literal["Active", "Away", "Offline"]] = None
    joinDate: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None

class TeamMemberResponse(BaseModel):
    id: str
    name: str
    role: str
    department: str
    skills: List[str]
    email: str
    phone: str
    avatar: str
    status: str
    joinDate: str
    bio: str
    location: str

    class Config:
        from_attributes = True

# Service Schemas
class ServiceCreate(BaseModel):
    title: str
    category: str
    description: str
    iconName: str = "Code"
    startingPrice: float
    features: List[str] = []
    isVisible: bool = True
    deliveryTime: str = "4-6 weeks"
    activeProjectsCount: int = 0

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    iconName: Optional[str] = None
    startingPrice: Optional[float] = None
    features: Optional[List[str]] = None
    isVisible: Optional[bool] = None
    deliveryTime: Optional[str] = None
    activeProjectsCount: Optional[int] = None

class ServiceResponse(BaseModel):
    id: str
    title: str
    category: str
    description: str
    iconName: str
    startingPrice: float
    features: List[str]
    isVisible: bool
    deliveryTime: str
    activeProjectsCount: int

    class Config:
        from_attributes = True

# Blog Post Schemas
class BlogAuthor(BaseModel):
    name: str
    avatar: str
    role: str

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str = ""
    content: str = ""
    coverImage: Optional[str] = ""
    author: BlogAuthor
    category: str = "Engineering"
    tags: List[str] = []
    status: Literal["Draft", "Published", "Scheduled"] = "Draft"
    views: int = 0
    readingTime: str = "5 min read"
    publishedAt: Optional[str] = ""

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    coverImage: Optional[str] = None
    author: Optional[BlogAuthor] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    status: Optional[Literal["Draft", "Published", "Scheduled"]] = None
    views: Optional[int] = None
    readingTime: Optional[str] = None
    publishedAt: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str
    content: str
    coverImage: str
    author: BlogAuthor
    category: str
    tags: List[str]
    status: str
    views: int
    publishedAt: str
    readingTime: str

    class Config:
        from_attributes = True

# Inquiry Schemas
class InquiryReply(BaseModel):
    id: str
    sender: str
    message: str
    timestamp: str

class InquiryReplyCreate(BaseModel):
    message: str
    sender: Optional[str] = "Pixel Support Team"

class InquiryCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = ""
    service: Optional[str] = ""
    budget: Optional[str] = ""
    message: str
    status: Literal["New", "In Progress", "Resolved", "Spam"] = "New"

class InquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    company: str
    service: str
    budget: str
    message: str
    date: str
    status: str
    replies: List[InquiryReply]

    class Config:
        from_attributes = True

# Testimonial Schemas
class TestimonialCreate(BaseModel):
    clientName: str
    clientRole: str
    company: str
    avatar: Optional[str] = ""
    rating: int = 5
    quote: str
    project: Optional[str] = ""
    status: Literal["Pending", "Approved", "Rejected"] = "Pending"

class TestimonialResponse(BaseModel):
    id: str
    clientName: str
    clientRole: str
    company: str
    avatar: str
    rating: int
    quote: str
    project: str
    status: str
    date: str

    class Config:
        from_attributes = True

# Activity Schemas
class ActivityResponse(BaseModel):
    id: str
    user: str
    avatar: str
    action: str
    target: str
    time: str
    type: str

    class Config:
        from_attributes = True

# Settings Schemas
class UserSettingsResponse(BaseModel):
    profile: dict
    company: dict
    seo: dict
    notifications: dict
    appearance: dict

# FAQ Schemas
class FAQCreate(BaseModel):
    question: str
    answer: str
    category: str = "General"
    order: int = 0
    isActive: bool = True

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    order: Optional[int] = None
    isActive: Optional[bool] = None

class FAQResponse(BaseModel):
    id: str
    question: str
    answer: str
    category: str
    order: int
    isActive: bool
    createdAt: Optional[str] = None

    class Config:
        from_attributes = True

