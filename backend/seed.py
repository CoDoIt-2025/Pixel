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
    FAQ,
)

def run_seed():
    print("🌱 Re-creating database tables with Pixel Business Solutions data...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Default Super Admin
        admin_email = "admin@pixel.dev"
        user = db.query(User).filter(User.email == admin_email).first()
        if not user:
            print("Creating super admin user...")
            user = User(
                id="USR-001",
                email=admin_email,
                hashed_password=get_password_hash("password123"),
                name="Pixel Administrator",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                role="Super Admin",
                bio="Studio Lead at Pixel Business Solutions LLC.",
                timezone="UTC+4:00 (Oman / GST)",
            )
            db.add(user)
        else:
            user.name = "Pixel Administrator"
            user.bio = "Studio Lead at Pixel Business Solutions LLC."
            user.timezone = "UTC+4:00 (Oman / GST)"

        # 2. System Settings
        settings_row = db.query(SystemSettings).filter(SystemSettings.id == "default").first()
        pixel_company_settings = {
            "name": "Pixel Business Solutions LLC",
            "email": "contact@pixelbusiness.om",
            "phone": "+968 2400 0000",
            "address": "Muscat, Sultanate of Oman | Thrissur, Kerala",
            "taxId": "CR-1049281",
            "currency": "OMR (ر.ع.)",
            "website": "https://pixelbusiness.om",
            "description": "Pixel Business Solutions LLC helps businesses build a clearer online presence through website design, SEO, Google Business Profile management, social media management and AI visibility. For restaurants and hotels, we also offer digital QR menus.",
        }
        pixel_seo_settings = {
            "metaTitle": "Website Design and Digital Marketing Oman | Pixel",
            "metaDescription": "Explore website design, SEO, Google Business Profile, social media, AI visibility and QR menus for businesses in Oman. Discuss your project with Pixel.",
            "keywords": "Website Design Oman, SEO Oman, Google Business Profile Oman, Social Media Oman, AI Visibility, Digital QR Menu Oman, Thrissur Kerala",
            "ogImage": "https://pixelbusiness.om/og-cover.png",
            "googleAnalyticsId": "G-PXEL82710",
        }
        pixel_appearance_settings = {
            "primaryColor": "#F5C542",
            "theme": "light",
            "compactMode": False,
            "highContrast": False,
        }
        if not settings_row:
            settings_row = SystemSettings(
                id="default",
                profile={
                    "name": "Pixel Administrator",
                    "email": admin_email,
                    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                    "role": "Super Admin",
                    "bio": "Studio Lead at Pixel Business Solutions LLC.",
                    "timezone": "UTC+4:00 (Oman / GST)",
                },
                company=pixel_company_settings,
                seo=pixel_seo_settings,
                notifications={
                    "emailAlerts": True,
                    "weeklyDigest": True,
                    "milestoneAlerts": True,
                    "securityAlerts": True,
                    "marketingUpdates": False,
                },
                appearance=pixel_appearance_settings,
            )
            db.add(settings_row)
        else:
            settings_row.company = pixel_company_settings
            settings_row.seo = pixel_seo_settings
            settings_row.appearance = pixel_appearance_settings

        # 3. Clear and Re-seed Services (The 6 verified services from docx)
        print("Seeding 6 core services for Oman & Thrissur...")
        db.query(Service).delete()
        services = [
            Service(
                id="SRV-001",
                title="Website Design",
                category="Website Design",
                description="Make your business easy to understand on every screen. Pixel designs websites that explain your services clearly and give visitors a straightforward way to enquire.",
                icon_name="Globe",
                starting_price=150.0,
                features=[
                    "Page structure built around your services",
                    "Mobile-friendly layouts and touch optimization",
                    "Clear enquiry paths & click-to-call links",
                    "Search-friendly structure and essential metadata",
                    "Pre-launch content gap identification & review"
                ],
                is_visible=True,
                delivery_time="3-5 weeks",
                active_projects_count=4,
            ),
            Service(
                id="SRV-002",
                title="SEO Services",
                category="Search Optimization",
                description="Help customers find useful information about your business through search. Focus on website structure, service content and audience search needs in Oman.",
                icon_name="Search",
                starting_price=100.0,
                features=[
                    "Keyword research tailored to Oman and Thrissur",
                    "Service page content improvements & internal links",
                    "Technical search priorities & Search Console baseline",
                    "Targeted answers to real customer search queries",
                    "Transparent monthly reporting without false ranking guarantees"
                ],
                is_visible=True,
                delivery_time="Ongoing monthly",
                active_projects_count=3,
            ),
            Service(
                id="SRV-003",
                title="Google Business Profile Management",
                category="Local Visibility",
                description="Give customers accurate information when they find your business on Google. Pixel helps eligible businesses organize and maintain their verified profile details.",
                icon_name="MapPin",
                starting_price=75.0,
                features=[
                    "Business information review & category selection",
                    "Opening hours and special holiday updates",
                    "Publishing approved business photos & updates",
                    "Professional customer review response support",
                    "Strict alignment with Google Business Profile guidelines"
                ],
                is_visible=True,
                delivery_time="Monthly management",
                active_projects_count=5,
            ),
            Service(
                id="SRV-004",
                title="Social Media Management",
                category="Social Media",
                description="Show customers what your business offers with clear, consistent content. Pixel helps plan and manage a social presence that reflects your brand and answers customer questions.",
                icon_name="Share2",
                starting_price=120.0,
                features=[
                    "Tailored content calendar & informative post copy",
                    "Clean visual creatives & branded design templates",
                    "Platform selection focused on your target audience",
                    "Pre-publication review & client approval workflow",
                    "Authentic business updates without artificial metrics"
                ],
                is_visible=True,
                delivery_time="Monthly management",
                active_projects_count=4,
            ),
            Service(
                id="SRV-005",
                title="AI Visibility Services",
                category="AI Discovery",
                description="Make your business information clearer and easier to understand across search and AI-assisted discovery, grounded in truthful content and structured data.",
                icon_name="Sparkles",
                starting_price=90.0,
                features=[
                    "Clear service explanations & authoritative entity content",
                    "Helpful answers to real customer decision questions",
                    "Structured data (Schema.org) for visible page content",
                    "Manual query monitoring & referral traffic observation",
                    "Honest analysis showing method, context, and limitations"
                ],
                is_visible=True,
                delivery_time="Monthly retainer",
                active_projects_count=2,
            ),
            Service(
                id="SRV-006",
                title="Digital QR Menus",
                category="Hospitality",
                description="Give guests a simple way to browse your menu on their mobile phones. Pixel helps restaurants and hotels present menu categories, dishes and prices via a scannable QR code.",
                icon_name="QrCode",
                starting_price=80.0,
                features=[
                    "Mobile-optimized category and item browsing",
                    "Readable descriptions, approved photos & OMR prices",
                    "Optional dietary tags and multilingual layout preparation",
                    "Print-ready QR code assets with direct link fallback",
                    "Simple staff update process for changing seasonal items"
                ],
                is_visible=True,
                delivery_time="1-2 weeks",
                active_projects_count=6,
            ),
        ]
        db.add_all(services)

        # 4. Clear and Re-seed FAQs (10 verified FAQs from docx)
        print("Seeding 10 verified FAQs from website plan...")
        db.query(FAQ).delete()
        faqs = [
            FAQ(
                id="FAQ-001",
                question="What services does Pixel offer?",
                answer="We offer website design, SEO, Google Business Profile management, social media management, AI visibility and digital QR menus for restaurants and hotels.",
                category="Services & Scope",
                order=1,
                is_active=True,
            ),
            FAQ(
                id="FAQ-002",
                question="Which markets do you focus on?",
                answer="Oman is our primary focus. We also welcome enquiries from businesses in Thrissur, Kerala. Tell us where you operate and where your customers are so the plan can reflect your market.",
                category="Markets",
                order=2,
                is_active=True,
            ),
            FAQ(
                id="FAQ-003",
                question="Can I choose just one service?",
                answer="Yes. Start with the service you need, or tell us your goal if you are unsure. Any recommendation will explain its purpose and what is included.",
                category="Services & Scope",
                order=3,
                is_active=True,
            ),
            FAQ(
                id="FAQ-004",
                question="How much will my project cost?",
                answer="The cost depends on the number of pages, content, features and ongoing support involved. Share your requirements with us so we can discuss a proposal based on your needs.",
                category="Pricing",
                order=4,
                is_active=True,
            ),
            FAQ(
                id="FAQ-005",
                question="How long does a project take?",
                answer="The schedule depends on scope, content readiness, approvals and any integrations. We agree a realistic project timeline after reviewing requirements rather than promising the same delivery time for every business.",
                category="Process & Timelines",
                order=5,
                is_active=True,
            ),
            FAQ(
                id="FAQ-006",
                question="Do you guarantee search rankings or AI mentions?",
                answer="No. Search engines and AI providers decide what appears in their results. We focus on clear content, accurate information and agreed improvements, then review the evidence available.",
                category="SEO & AI",
                order=6,
                is_active=True,
            ),
            FAQ(
                id="FAQ-007",
                question="Can you work with my existing website?",
                answer="We can discuss improvements to an existing website after reviewing its setup, access requirements and your goals. Some requests may need targeted enhancements while others benefit from a redesign.",
                category="Website Design",
                order=7,
                is_active=True,
            ),
            FAQ(
                id="FAQ-008",
                question="Are hosting and ongoing updates included?",
                answer="These are stated explicitly in your proposal. We ensure you know who owns the domain and accounts, what support is included and how updates are handled after launch.",
                category="Website Design",
                order=8,
                is_active=True,
            ),
            FAQ(
                id="FAQ-009",
                question="Does a QR menu include ordering and payments?",
                answer="Not automatically. A digital QR menu helps guests browse dishes and prices easily on their phones. Ordering, payments and point-of-sale integrations require separate planning and agreement.",
                category="Hospitality",
                order=9,
                is_active=True,
            ),
            FAQ(
                id="FAQ-010",
                question="How do I get started?",
                answer="Use the contact form on our website to share your business details, the service you are interested in and your main priority. We will follow up to discuss a practical starting point.",
                category="Getting Started",
                order=10,
                is_active=True,
            ),
        ]
        db.add_all(faqs)

        # 5. Clear and Re-seed Blog Posts (3 verified articles from docx)
        print("Seeding 3 authentic articles from website plan...")
        db.query(BlogPost).delete()
        posts = [
            BlogPost(
                id="BLG-001",
                title="What to prepare before building your business website",
                slug="what-to-prepare-before-building-your-business-website",
                excerpt="A practical checklist of service information, images, contact details and decisions to prepare before your website project begins.",
                content="""# What to Prepare Before Building Your Business Website

Before choosing a design, gather the information your customers need. A website project is easier to plan when your services, contact details and priorities are clear. Start with the checklist below, then discuss what is missing with your website team.

### 1. Define the Main Customer Action
What do you want a visitor to do after arriving at your website? Whether it's calling your office, sending a WhatsApp message, or requesting a quote, every page should support that goal.

### 2. List Your Services and Audience
Write down each service you provide, who it serves in Oman or Thrissur, and the typical questions customers ask before deciding.

### 3. Gather Approved Brand Assets
Collect high-resolution versions of your logo, brand colors, and authentic photographs of your premises, products, or team.

### 4. Confirm Public Contact Details
Ensure you have verified phone numbers, business email addresses, accurate opening hours, and clear physical location details.

### 5. Agree Ownership and Maintenance
Decide who in your business will review drafts, approve content changes, and manage website updates after launch.

You do not need every detail ready to start the conversation. Tell us what you have and where you need support.""",
                cover_image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
                author={"name": "Pixel Editorial Team", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "Digital Advisory"},
                category="Website Planning",
                tags=["Website Design", "Oman Business", "Planning", "Digital Strategy"],
                status="Published",
                views=420,
                published_at="2026-10-23",
                reading_time="5 min read",
            ),
            BlogPost(
                id="BLG-002",
                title="What to look for in a digital QR menu",
                slug="what-to-look-for-in-a-digital-qr-menu",
                excerpt="From readable categories to an agreed update process, explore the details that matter when choosing a menu for your restaurant or hotel.",
                content="""# What to Look for in a Digital QR Menu

For restaurants and cafes in Oman, a digital QR menu is more than a digital copy of a paper brochure. It is an opportunity to make browsing dishes smooth, clear, and convenient for guests.

### 1. Fast Mobile Loading on Every Device
Guests shouldn't wait for heavy PDF downloads. A lightweight web menu loads instantly in any mobile browser without requiring app installations.

### 2. Clear Categories and Readable Descriptions
Organize dishes into logical sections: Appetizers, Main Courses, Desserts, and Beverages. Include clear descriptions and pricing in OMR.

### 3. Simple Update Workflow
Menus change with seasonality and market prices. Ensure your setup allows swift updates to prices or items without reprinting physical QR codes.

### 4. High-Contrast, Clean Layout
Low-light dining environments demand high contrast, legible typography, and intuitive scrolling.

### 5. Clear Demarcation of Features
Start with a pure browsing menu. Add ordering or payment workflows only when your point-of-sale systems and staff are ready to support them.""",
                cover_image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
                author={"name": "Pixel Editorial Team", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "role": "Hospitality Solutions"},
                category="Digital Menus",
                tags=["QR Menu", "Hospitality", "Restaurants Oman", "OMR Pricing"],
                status="Published",
                views=380,
                published_at="2026-10-24",
                reading_time="4 min read",
            ),
            BlogPost(
                id="BLG-003",
                title="SEO and AI visibility explained without the promises",
                slug="seo-and-ai-visibility-explained-without-promises",
                excerpt="Understand where useful content and clear business information help, and why no provider can guarantee search positions or AI recommendations.",
                content="""# SEO and AI Visibility Explained Without the Promises

Search and discovery are evolving with generative search features and conversational AI assistants. However, the core principles of building an enduring digital presence remain grounded in truth and clarity.

### The Reality of Rankings
Search engines and AI platforms adjust their algorithms dynamically. No agency or consultant can guarantee first-place rankings or exclusive mentions in AI answers.

### What Actually Works:
1. **Accurate Business Entities**: Consistent business name, phone, address, and operating hours across your website and Google Business Profile.
2. **Helpful Answers to Real Questions**: Publishing direct answers that genuine customers seek before purchasing.
3. **Structured Data**: Standard Schema.org markup that helps search crawlers parse services, locations, and FAQs accurately.
4. **Regular Performance Reviews**: Tracking impressions, clicks, and verified leads using Google Search Console over meaningful periods.""",
                cover_image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600",
                author={"name": "Pixel Editorial Team", "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", "role": "Search & AI Advisory"},
                category="SEO & AI Visibility",
                tags=["SEO", "AI Visibility", "Oman Business", "Truth in Search"],
                status="Published",
                views=510,
                published_at="2026-10-25",
                reading_time="6 min read",
            ),
        ]
        db.add_all(posts)

        # 6. Re-seed Projects (Clearly labelled sample demonstrations / blueprints)
        print("Seeding sample demonstration projects...")
        db.query(Project).delete()
        projects = [
            Project(
                id="PRJ-101",
                code="DEMO-QR",
                name="Hospitality Sample QR Menu (Demo)",
                client="Pixel Concept Showcase",
                status="Completed",
                category="Hospitality",
                budget=80.0,
                spent=80.0,
                start_date="2026-10-01",
                deadline="2026-10-15",
                progress=100,
                description="Interactive sample mobile menu demonstration featuring OMR prices, Arabic layout support, and categorized food & beverage browsing.",
                team=[
                    {"id": "TM-001", "name": "Pixel Lead", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "Frontend Specialist"}
                ],
                milestones=[
                    {"id": "M1", "title": "Category & Dish Layout (3 Sections)", "completed": True, "dueDate": "2026-10-05"},
                    {"id": "M2", "title": "OMR Currency & Dietary Tags", "completed": True, "dueDate": "2026-10-10"},
                    {"id": "M3", "title": "Mobile QR Code Generator Link", "completed": True, "dueDate": "2026-10-15"}
                ],
                tasks=[
                    {"id": "T1", "title": "High-contrast mobile readability review", "status": "Done", "assignee": "Pixel Lead"}
                ]
            ),
            Project(
                id="PRJ-102",
                code="DEMO-ASSESS",
                name="Guided Needs Assessment Tool",
                client="Pixel Business Solutions LLC",
                status="Completed",
                category="Web Development",
                budget=150.0,
                spent=150.0,
                start_date="2026-10-10",
                deadline="2026-10-23",
                progress=100,
                description="Guided questionnaire helping Oman & Thrissur business owners identify whether they need Website Design, SEO, GBP, Social Media, or QR Menus.",
                team=[
                    {"id": "TM-001", "name": "Pixel Lead", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "role": "UX Architect"}
                ],
                milestones=[
                    {"id": "M1", "title": "Questionnaire logic and recommendation rules", "completed": True, "dueDate": "2026-10-15"},
                    {"id": "M2", "title": "Enquiry pre-fill integration", "completed": True, "dueDate": "2026-10-23"}
                ],
                tasks=[
                    {"id": "T1", "title": "Transparent recommendation explanations", "status": "Done", "assignee": "Pixel Lead"}
                ]
            ),
        ]
        db.add_all(projects)

        # 7. Re-seed Clients with realistic local partners
        print("Seeding business clients...")
        db.query(Client).delete()
        clients = [
            Client(
                id="CLI-001",
                company="Bustan Hospitality Partners",
                contact_name="Tariq Al Balushi",
                email="tariq@bustangroup.om",
                phone="+968 2455 1200",
                industry="Hospitality & Dining",
                total_spend=450.0,
                active_projects=1,
                status="Active",
                website="https://bustangroup.om",
                location="Muscat, Oman",
                logo="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120",
                notes="Implementing digital QR menus across restaurant venues in Muscat.",
                created_at="2026-10-10",
            ),
            Client(
                id="CLI-002",
                company="Kerala Heritage Crafts",
                contact_name="Sujith Menon",
                email="sujith@keralacrafts.in",
                phone="+91 487 230 4500",
                industry="Retail & Artisanal Goods",
                total_spend=320.0,
                active_projects=1,
                status="Active",
                website="https://keralacrafts.in",
                location="Thrissur, Kerala",
                logo="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120",
                notes="Website design and local search visibility for GCC and regional buyers.",
                created_at="2026-10-15",
            ),
        ]
        db.add_all(clients)

        # 8. Re-seed Inquiries with authentic requests
        print("Seeding client inquiries...")
        db.query(Inquiry).delete()
        inquiries = [
            Inquiry(
                id="INQ-001",
                name="Tariq Al Balushi",
                email="tariq@bustangroup.om",
                company="Al Bustan Hospitality LLC",
                service="Digital QR Menus",
                budget="100 - 250 OMR",
                message="We want to implement digital QR menus across our 3 restaurant branches in Muscat. Need readable categories in English and Arabic, and simple staff updates.",
                date="2026-10-24",
                status="New",
                replies=[],
            ),
            Inquiry(
                id="INQ-002",
                name="Sujith Menon",
                email="sujith@keralacrafts.in",
                company="Kerala Heritage Crafts",
                service="Website Design",
                budget="200 - 400 OMR",
                message="Planning a clean, mobile-friendly business website for our store in Thrissur. We serve both local visitors and tourists from the GCC looking for artisanal products.",
                date="2026-10-22",
                status="In Progress",
                replies=[
                    {
                        "id": "REP-101",
                        "sender": "Pixel Team",
                        "message": "Hello Sujith, thank you for contacting Pixel Business Solutions. We would be pleased to discuss your website structure and customer journey for both Kerala and Oman markets.",
                        "timestamp": "2026-10-23 10:15 AM",
                    }
                ],
            ),
        ]
        db.add_all(inquiries)

        # 9. Clear Testimonials (as directed by document: remove dummy testimonials)
        print("Clearing dummy testimonials...")
        db.query(Testimonial).delete()

        # 10. Audit Activity Items
        print("Seeding recent activities...")
        db.query(ActivityItem).delete()
        activities = [
            ActivityItem(
                id="ACT-001",
                user="Pixel Administrator",
                action="updated website plan",
                target="Oman & Thrissur Service Scope",
                time="5 mins ago",
                type="project",
            ),
            ActivityItem(
                id="ACT-002",
                user="Tariq Al Balushi",
                action="submitted digital menu enquiry",
                target="Al Bustan Hospitality (Muscat)",
                time="2 hours ago",
                type="inquiry",
            ),
            ActivityItem(
                id="ACT-003",
                user="Pixel Administrator",
                action="published article",
                target="What to prepare before building your business website",
                time="1 day ago",
                type="blog",
            ),
        ]
        db.add_all(activities)

        db.commit()
        print("✅ Database successfully seeded with official Pixel Business Solutions data!")
    except Exception as e:
        db.rollback()
        print(f"❌ Error during seeding: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
