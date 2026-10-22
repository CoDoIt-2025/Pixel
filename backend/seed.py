import sys
from pathlib import Path

# Fix Windows console unicode print
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to path
sys.path.append(str(Path(__file__).resolve().parent))

from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.models import (
    User,
    Client,
    TeamMember,
    Project,
    Service,
    BlogPost,
    Inquiry,
    Testimonial,
    ActivityItem,
    SystemSettings,
)

def run_seed():
    print("🌱 Re-creating database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Create Default Admin User
        admin_email = "admin@pixel.dev"
        user = db.query(User).filter(User.email == admin_email).first()
        if not user:
            print("Creating super admin user...")
            user = User(
                id="USR-001",
                email=admin_email,
                hashed_password=get_password_hash("password123"),
                name="Sarah Connor",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                role="Super Admin",
                bio="Engineering Lead & Studio Architect at Pixel.",
                timezone="UTC+5:30 (IST)",
            )
            db.add(user)

        # 2. Seed Clients if empty
        if db.query(Client).count() == 0:
            print("Seeding clients...")
            clients = [
                Client(
                    id="CLI-001",
                    company="Stripe Global",
                    contact_name="Patrick Collison",
                    email="partnerships@stripe.com",
                    phone="+1 415 555 0101",
                    industry="Fintech & Payments",
                    total_spend=485000.0,
                    active_projects=2,
                    status="Active",
                    website="https://stripe.com",
                    location="San Francisco, CA",
                    logo="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120",
                    notes="Core enterprise partner for billing infrastructure & treasury AI.",
                    created_at="2025-01-15",
                ),
                Client(
                    id="CLI-002",
                    company="Razorpay Inc.",
                    contact_name="Harshil Mathur",
                    email="harshil@razorpay.com",
                    phone="+91 80 4684 0000",
                    industry="Payments & Banking",
                    total_spend=320000.0,
                    active_projects=1,
                    status="Active",
                    website="https://razorpay.com",
                    location="Bengaluru, India",
                    logo="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120",
                    notes="Developing high-throughput merchant analytics dashboard.",
                    created_at="2025-02-10",
                ),
                Client(
                    id="CLI-003",
                    company="Linear Orbit",
                    contact_name="Karri Saarinen",
                    email="karri@linear.app",
                    phone="+1 415 900 1234",
                    industry="Productivity Software",
                    total_spend=210000.0,
                    active_projects=1,
                    status="Active",
                    website="https://linear.app",
                    location="San Francisco, CA",
                    logo="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120",
                    notes="Design systems consultation and custom WebGL micro-interactions.",
                    created_at="2025-03-01",
                ),
                Client(
                    id="CLI-004",
                    company="CredAI Health",
                    contact_name="Dr. Elena Rostova",
                    email="elena@credai.io",
                    phone="+44 20 7946 0912",
                    industry="Healthcare & AI",
                    total_spend=175000.0,
                    active_projects=1,
                    status="Active",
                    website="https://credai.io",
                    location="London, UK",
                    logo="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120",
                    notes="Clinical trial telemetry and HIPAA compliant data pipeline.",
                    created_at="2025-03-20",
                ),
                Client(
                    id="CLI-005",
                    company="Vercel Labs",
                    contact_name="Guillermo Rauch",
                    email="guillermo@vercel.com",
                    phone="+1 415 888 7766",
                    industry="Developer Tools",
                    total_spend=390000.0,
                    active_projects=2,
                    status="Active",
                    website="https://vercel.com",
                    location="San Francisco, CA",
                    logo="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120",
                    notes="Turbopack enterprise workflows and edge caching benchmarking.",
                    created_at="2025-01-05",
                ),
            ]
            db.add_all(clients)

        # 3. Seed Team Members if empty
        if db.query(TeamMember).count() == 0:
            print("Seeding team members...")
            team = [
                TeamMember(
                    id="TM-001",
                    name="Sarah Connor",
                    role="VP of Engineering",
                    department="Engineering",
                    skills=["FastAPI", "Next.js", "System Architecture", "PostgreSQL", "Rust"],
                    email="sarah.connor@pixel.dev",
                    phone="+1 (555) 019-2834",
                    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                    status="Active",
                    join_date="2023-04-12",
                    bio="12+ years building distributed backend platforms and reactive frontends.",
                    location="San Francisco, CA",
                ),
                TeamMember(
                    id="TM-002",
                    name="Alex Mercer",
                    role="Staff AI Engineer",
                    department="AI & Research",
                    skills=["PyTorch", "Transformers", "LLMs", "LangChain", "Vector DBs"],
                    email="alex.mercer@pixel.dev",
                    phone="+1 (555) 019-5821",
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                    status="Active",
                    join_date="2023-08-01",
                    bio="Former research fellow focusing on inference optimization and agentic workflows.",
                    location="Austin, TX",
                ),
                TeamMember(
                    id="TM-003",
                    name="Maya Patel",
                    role="Principal UI/UX Designer",
                    department="Design",
                    skills=["Figma", "Design Systems", "Prototyping", "WebGL", "Motion"],
                    email="maya.patel@pixel.dev",
                    phone="+91 98 7654 3210",
                    avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
                    status="Active",
                    join_date="2024-01-15",
                    bio="Obsessed with tactile micro-interactions and minimalist white interfaces.",
                    location="Bengaluru, India",
                ),
                TeamMember(
                    id="TM-004",
                    name="Marcus Vance",
                    role="Lead Cloud Architect",
                    department="Cloud & DevOps",
                    skills=["Kubernetes", "AWS", "Terraform", "CI/CD", "Prometheus"],
                    email="marcus.vance@pixel.dev",
                    phone="+44 20 7946 0888",
                    avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
                    status="Away",
                    join_date="2023-11-20",
                    bio="Designing 99.999% uptime multi-region cloud infrastructures.",
                    location="London, UK",
                ),
            ]
            db.add_all(team)

        # 4. Seed Projects if empty
        if db.query(Project).count() == 0:
            print("Seeding projects...")
            projects = [
                Project(
                    id="PRJ-101",
                    code="PX-101",
                    name="Nexus Financial Cloud & Treasury AI",
                    client="Stripe Global",
                    client_id="CLI-001",
                    status="In Progress",
                    category="AI Solutions",
                    budget=240000.0,
                    spent=168000.0,
                    start_date="2025-01-10",
                    deadline="2025-08-30",
                    progress=70,
                    description="Enterprise multi-currency automated reconciliation platform with predictive cash flow models.",
                    team=[
                        {"id": "TM-001", "name": "Sarah Connor", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "Lead Architect"},
                        {"id": "TM-002", "name": "Alex Mercer", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "role": "AI Specialist"}
                    ],
                    milestones=[
                        {"id": "M1", "title": "Core Ledger Engine & Multi-tenant Schema", "completed": True, "dueDate": "2025-02-28"},
                        {"id": "M2", "title": "Machine Learning Anomaly Detection Model", "completed": True, "dueDate": "2025-05-15"},
                        {"id": "M3", "title": "SOC2 Compliance & Pen-testing Audit", "completed": False, "dueDate": "2025-07-20"},
                        {"id": "M4", "title": "Global Production Rollout & Edge CDN", "completed": False, "dueDate": "2025-08-30"}
                    ],
                    tasks=[
                        {"id": "T1", "title": "Optimize SQLite to PostgreSQL write queues", "status": "Done", "assignee": "Sarah Connor"},
                        {"id": "T2", "title": "Implement JWT bearer token rotation", "status": "Done", "assignee": "Sarah Connor"},
                        {"id": "T3", "title": "Tune LLM inference temperature for fiscal audit", "status": "In Progress", "assignee": "Alex Mercer"},
                        {"id": "T4", "title": "Finalize real-time WebSocket dashboard telemetry", "status": "Todo", "assignee": "Maya Patel"}
                    ]
                ),
                Project(
                    id="PRJ-102",
                    code="PX-102",
                    name="Aether Design System & WebGL Engine",
                    client="Linear Orbit",
                    client_id="CLI-003",
                    status="In Progress",
                    category="UI/UX Design",
                    budget=135000.0,
                    spent=82000.0,
                    start_date="2025-02-15",
                    deadline="2025-07-15",
                    progress=62,
                    description="High performance React component library with Three.js hardware acceleration and zero-runtime CSS tokens.",
                    team=[
                        {"id": "TM-003", "name": "Maya Patel", "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", "role": "Design Lead"}
                    ],
                    milestones=[
                        {"id": "M1", "title": "Figma Token Sync & Primitive Architecture", "completed": True, "dueDate": "2025-03-30"},
                        {"id": "M2", "title": "WebGL Canvas Transition Components", "completed": True, "dueDate": "2025-05-01"},
                        {"id": "M3", "title": "Accessibility WCAG AAA Certification", "completed": False, "dueDate": "2025-06-30"}
                    ],
                    tasks=[
                        {"id": "T1", "title": "Document Radix accessibility triggers", "status": "Done", "assignee": "Maya Patel"},
                        {"id": "T2", "title": "Benchmark GPU render cycle on mobile Safari", "status": "In Progress", "assignee": "Maya Patel"}
                    ]
                ),
                Project(
                    id="PRJ-103",
                    code="PX-103",
                    name="HyperScale Cloud Gateway & Edge Proxy",
                    client="Vercel Labs",
                    client_id="CLI-005",
                    status="Review",
                    category="Cloud Architecture",
                    budget=310000.0,
                    spent=295000.0,
                    start_date="2024-11-01",
                    deadline="2025-06-15",
                    progress=92,
                    description="Sub-millisecond global routing mesh with automated failover and dynamic cache invalidation.",
                    team=[
                        {"id": "TM-004", "name": "Marcus Vance", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", "role": "Cloud Architect"},
                        {"id": "TM-001", "name": "Sarah Connor", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "Security Lead"}
                    ],
                    milestones=[
                        {"id": "M1", "title": "Rust-based Edge Proxy Daemon", "completed": True, "dueDate": "2025-01-15"},
                        {"id": "M2", "title": "Global Anycast DNS Mesh Setup", "completed": True, "dueDate": "2025-03-10"},
                        {"id": "M3", "title": "Load Testing to 10M RPM", "completed": True, "dueDate": "2025-05-20"}
                    ],
                    tasks=[
                        {"id": "T1", "title": "Final latency benchmarking report", "status": "In Progress", "assignee": "Marcus Vance"}
                    ]
                ),
                Project(
                    id="PRJ-104",
                    code="PX-104",
                    name="Clinical Bio-Telemetry & Diagnostics Portal",
                    client="CredAI Health",
                    client_id="CLI-004",
                    status="Planning",
                    category="Web Development",
                    budget=185000.0,
                    spent=15000.0,
                    start_date="2025-05-01",
                    deadline="2025-11-30",
                    progress=12,
                    description="Secure clinician workstation for real-time patient ECG monitoring and autonomous diagnostic triage.",
                    team=[
                        {"id": "TM-001", "name": "Sarah Connor", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "Lead Architect"},
                        {"id": "TM-002", "name": "Alex Mercer", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "role": "Bio-AI Researcher"}
                    ],
                    milestones=[
                        {"id": "M1", "title": "HIPAA Architecture Compliance Blueprint", "completed": True, "dueDate": "2025-05-25"},
                        {"id": "M2", "title": "Encrypted Timeseries Ingestion Pipeline", "completed": False, "dueDate": "2025-07-30"}
                    ],
                    tasks=[
                        {"id": "T1", "title": "Setup end-to-end audit logging", "status": "In Progress", "assignee": "Sarah Connor"}
                    ]
                ),
            ]
            db.add_all(projects)

        # 5. Seed Services if empty
        if db.query(Service).count() == 0:
            print("Seeding services...")
            services = [
                Service(
                    id="SRV-001",
                    title="Enterprise Web Applications",
                    category="Web Development",
                    description="Custom high-throughput Next.js & React platforms engineered for fault-tolerant scalability.",
                    icon_name="Globe",
                    starting_price=45000.0,
                    features=["Next.js 16 App Router", "Sub-100ms Core Web Vitals", "Edge SSR & ISR", "Full TypeScript Coverage", "Automated E2E Testing"],
                    is_visible=True,
                    delivery_time="6-10 weeks",
                    active_projects_count=5,
                ),
                Service(
                    id="SRV-002",
                    title="Enterprise AI & LLM Systems",
                    category="AI Solutions",
                    description="Bespoke generative AI copilots, retrieval-augmented generation (RAG) pipelines, and autonomous agent loops.",
                    icon_name="Cpu",
                    starting_price=60000.0,
                    features=["Custom Fine-tuned LLMs", "Hybrid Vector Search", "Private Data Isolation", "Streaming Inference API", "Evaluation & Guardrails"],
                    is_visible=True,
                    delivery_time="8-12 weeks",
                    active_projects_count=4,
                ),
                Service(
                    id="SRV-003",
                    title="Design Systems & UX Architecture",
                    category="UI/UX Design",
                    description="World-class user interface engineering, tokenized component libraries, and interactive design prototypes.",
                    icon_name="Palette",
                    starting_price=30000.0,
                    features=["Figma Design Tokens", "Radix / Tailwind v4 Primitives", "Micro-interaction Physics", "WCAG 2.2 AAA Accessible", "Storybook Living Documentation"],
                    is_visible=True,
                    delivery_time="4-6 weeks",
                    active_projects_count=3,
                ),
                Service(
                    id="SRV-004",
                    title="Cloud & Distributed Infrastructure",
                    category="Cloud Architecture",
                    description="Terraform-managed multi-region clouds on AWS & GCP with Kubernetes orchestration and 99.999% SLA.",
                    icon_name="Cloud",
                    starting_price=50000.0,
                    features=["Zero-downtime Blue/Green Deployments", "Global Multi-region Anycast", "SOC2 Type II Preparation", "DDoS Mitigation Layer", "24/7 Telemetry Dashboards"],
                    is_visible=True,
                    delivery_time="6-8 weeks",
                    active_projects_count=3,
                ),
            ]
            db.add_all(services)

        # 6. Seed Blog Posts if empty
        if db.query(BlogPost).count() == 0:
            print("Seeding blog posts...")
            posts = [
                BlogPost(
                    id="BLG-001",
                    title="Migrating Enterprise Next.js Applications to Python & FastAPI Backends",
                    slug="migrating-enterprise-nextjs-to-python-fastapi",
                    excerpt="How decoupling your monolithic frontend into high-throughput asynchronous Python microservices reduces latency by 40%.",
                    content="# Migrating Enterprise Next.js Applications to Python & FastAPI Backends\n\nModern web applications demand both rich, reactive user experiences and scalable, type-safe data layers...",
                    cover_image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
                    author={"name": "Sarah Connor", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "VP of Engineering"},
                    category="Engineering",
                    tags=["FastAPI", "Python", "Next.js", "Architecture", "SQLite"],
                    status="Published",
                    views=3420,
                    published_at="2025-03-15",
                    reading_time="7 min read",
                ),
                BlogPost(
                    id="BLG-002",
                    title="Architecting Sub-50ms RAG Pipelines with SQLite Vec and Local Embeddings",
                    slug="sub-50ms-rag-pipelines-sqlite-vec",
                    excerpt="A practical deep-dive into embedded vector storage techniques for zero-latency generative inference.",
                    content="# Architecting Sub-50ms RAG Pipelines\n\nWhen latency matters more than distributed scale, running local SQLite vector indexes directly inside your ASGI worker process delivers extraordinary responsiveness...",
                    cover_image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
                    author={"name": "Alex Mercer", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "role": "Staff AI Engineer"},
                    category="AI & Research",
                    tags=["AI", "Vector DB", "Embeddings", "Performance"],
                    status="Published",
                    views=2190,
                    published_at="2025-04-02",
                    reading_time="6 min read",
                ),
            ]
            db.add_all(posts)

        # 7. Seed Inquiries if empty
        if db.query(Inquiry).count() == 0:
            print("Seeding inquiries...")
            inquiries = [
                Inquiry(
                    id="INQ-001",
                    name="Arjun Mehta",
                    email="arjun@credai.io",
                    company="CredAI Healthcare",
                    service="Enterprise AI & LLM Systems",
                    budget="$150,000 - $250,000",
                    message="We need a custom HIPAA-compliant multi-agent medical triage pipeline with human-in-the-loop audit logs. Looking for an 8-week turnaround.",
                    date="2025-04-20",
                    status="New",
                    replies=[],
                ),
                Inquiry(
                    id="INQ-002",
                    name="Claire Dupond",
                    email="c.dupond@monzo.co.uk",
                    company="Monzo Digital Bank",
                    service="Enterprise Web Applications",
                    budget="$200,000+",
                    message="Requesting RFP proposal for our new institutional liquidity management dashboard. Needs high-frequency WebSocket updates.",
                    date="2025-04-18",
                    status="In Progress",
                    replies=[
                        {
                            "id": "REP-101",
                            "sender": "Sarah Connor",
                            "message": "Hello Claire, thank you for reaching out! We specialize in low-latency financial dashboards. Sending over our technical deck.",
                            "timestamp": "Apr 19, 2025 11:30 AM",
                        }
                    ],
                ),
            ]
            db.add_all(inquiries)

        # 8. Seed Testimonials if empty
        if db.query(Testimonial).count() == 0:
            print("Seeding testimonials...")
            testimonials = [
                Testimonial(
                    id="TST-001",
                    client_name="Patrick Collison",
                    client_role="CEO & Co-founder",
                    company="Stripe Global",
                    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
                    rating=5,
                    quote="Pixel delivers the caliber of software engineering and aesthetic finesse rarely found in external partners. Their work on our treasury AI set a new benchmark.",
                    project="Nexus Financial Cloud",
                    status="Approved",
                    date="March 2025",
                ),
                Testimonial(
                    id="TST-002",
                    client_name="Harshil Mathur",
                    client_role="CEO & Founder",
                    company="Razorpay Inc.",
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
                    rating=5,
                    quote="The engineering velocity and attention to detail from the Pixel team was phenomenal. Zero-downtime migration with immaculate design polish.",
                    project="Merchant Analytics Cloud",
                    status="Approved",
                    date="February 2025",
                ),
            ]
            db.add_all(testimonials)

        # 9. Seed Activities if empty
        if db.query(ActivityItem).count() == 0:
            print("Seeding activities...")
            activities = [
                ActivityItem(
                    id="ACT-001",
                    user="Sarah Connor",
                    action="completed milestone",
                    target="Machine Learning Anomaly Detection Model (PX-101)",
                    time="10 mins ago",
                    type="project",
                ),
                ActivityItem(
                    id="ACT-002",
                    user="Arjun Mehta",
                    action="submitted new client RFP",
                    target="CredAI Healthcare ($150k - $250k)",
                    time="1 hour ago",
                    type="inquiry",
                ),
                ActivityItem(
                    id="ACT-003",
                    user="Alex Mercer",
                    action="published technical article",
                    target="Sub-50ms RAG Pipelines with SQLite Vec",
                    time="3 hours ago",
                    type="blog",
                ),
            ]
            db.add_all(activities)

        db.commit()
        print("✅ Database seeding completed successfully!")
    except Exception as e:
        db.rollback()
        print(f"❌ Error during seeding: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
