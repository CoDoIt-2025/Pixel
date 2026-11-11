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
            "theme": "charcoal",
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

        # 3. Clear and Re-seed Services (The 9 services from website demo UI)
        print("Seeding 9 core services matching UI layout...")
        db.query(Service).delete()
        services = [
            Service(
                id="SRV-001",
                title="Local SEO & GBP",
                category="Local Search",
                description="Maximize your Google Business Profile and local search visibility for customers across Muscat and the Sultanate of Oman. Drive high-intent footfall and calls.",
                icon_name="MapPin",
                starting_price=95.0,
                banner_image="https://i.ibb.co/VYCbZY9c/Google-Business-Profile-Management.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Google Business Profile setup, claim & verification",
                    "Oman local citation building & directory alignment",
                    "Geo-targeted keywords & category optimization",
                    "Customer review acquisition & response playbooks",
                    "Local map pack ranking tracking and monthly audits"
                ],
                is_visible=True,
                delivery_time="Monthly management",
                active_projects_count=7,
            ),
            Service(
                id="SRV-002",
                title="SEO",
                category="Organic Search",
                description="Improve your website structure, keyword relevance, and technical health around customer searches that drive conversions in Oman and the GCC.",
                icon_name="Search",
                starting_price=120.0,
                banner_image="https://i.ibb.co/Q7rFf537/SEO-Services.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Comprehensive technical SEO & crawlability audit",
                    "High-intent Oman commercial keyword research",
                    "On-page content optimization & rich meta architecture",
                    "Internal linking and site speed improvements",
                    "Search Console & Google Analytics 4 performance reporting"
                ],
                is_visible=True,
                delivery_time="Ongoing monthly",
                active_projects_count=5,
            ),
            Service(
                id="SRV-003",
                title="AI Search Visibility",
                category="AI & Search (AISO / AEO / GEO)",
                description="Optimize your brand entity for generative AI search engines including ChatGPT, Google AI Overviews, Perplexity, and Copilot.",
                icon_name="Cpu",
                starting_price=110.0,
                banner_image="https://i.ibb.co/JwKCL0V2/Whats-App-Image-2026-11-10-at-9-56-30-PM.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Entity authority mapping for AI answer engines",
                    "Schema.org JSON-LD structured semantic markup",
                    "Direct answer-first knowledge base creation",
                    "Digital citation alignment across AI reference hubs",
                    "AI engine query tracking & referral monitoring"
                ],
                is_visible=True,
                delivery_time="Monthly retainer",
                active_projects_count=3,
            ),
            Service(
                id="SRV-004",
                title="Website Design & Development",
                category="Web & Digital",
                description="High-performance, modern, mobile-responsive websites built to establish strong brand credibility and turn visitors into paying customers.",
                icon_name="Monitor",
                starting_price=160.0,
                banner_image="https://i.ibb.co/1HYpvQT/Whats-App-Image-2026-11-10-at-9-56-33-PM.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Bespoke mobile-first responsive web design",
                    "Fast loading speeds & modern accessibility standards",
                    "Strategic conversion funnels & click-to-call actions",
                    "Bilingual Arabic and English ready structures",
                    "100% full ownership of source code, domains & accounts"
                ],
                is_visible=True,
                delivery_time="3-5 weeks",
                active_projects_count=6,
            ),
            Service(
                id="SRV-005",
                title="Custom Software & Web Apps",
                category="Software Engineering",
                description="Scalable custom web applications, client dashboards, automated internal workflows, and portals built for business operational excellence.",
                icon_name="Layers",
                starting_price=350.0,
                banner_image="https://i.ibb.co/Z1wNF9pn/Custom-Software-Web-Apps.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Fullstack web application architecture",
                    "Secure authentication & role-based user management",
                    "Custom databases & high-speed REST APIs",
                    "Workflow automation & third-party integrations",
                    "Robust cloud hosting with 99.9% uptime and data privacy"
                ],
                is_visible=True,
                delivery_time="4-8 weeks",
                active_projects_count=4,
            ),
            Service(
                id="SRV-006",
                title="Social Media & Content",
                category="Social Media & Marketing",
                description="Show customers what makes your business unique with consistent social media creative, brand storytelling, and strategic engagement.",
                icon_name="MessageSquare",
                starting_price=130.0,
                banner_image="https://i.ibb.co/PsCVpKW6/Social-Media-Management.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Strategic monthly content calendar & creative direction",
                    "Bilingual English & Arabic social post copywriting",
                    "High-impact static and carousel visual assets",
                    "Audience engagement & message response frameworks",
                    "Transparent monthly analytics & engagement reports"
                ],
                is_visible=True,
                delivery_time="Monthly management",
                active_projects_count=5,
            ),
            Service(
                id="SRV-007",
                title="Google & Meta Ads",
                category="Paid Advertising",
                description="Precision-targeted advertising campaigns on Google Search, YouTube, Instagram, and Facebook with measurable return on ad spend.",
                icon_name="Megaphone",
                starting_price=140.0,
                banner_image="https://i.ibb.co/G3Vy5PCw/Whats-App-Image-2026-11-10-at-9-56-29-PM.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Oman & GCC hyper-local demographic targeting",
                    "Google Search & Display campaign management",
                    "Meta (Instagram & Facebook) lead generation ads",
                    "Conversion tracking, Meta Pixel & event setup",
                    "Weekly A/B ad creative testing and cost optimization"
                ],
                is_visible=True,
                delivery_time="Monthly management",
                active_projects_count=4,
            ),
            Service(
                id="SRV-008",
                title="Graphic Design & AI Video",
                category="Creative Media",
                description="Stand out with compelling visual brand identity, modern promotional graphics, company profiles, and AI-accelerated video marketing.",
                icon_name="Film",
                starting_price=90.0,
                banner_image="https://i.ibb.co/QFmZx0bc/Whats-App-Image-2026-11-10-at-9-56-30-PM-1.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Brand guidelines, logo adaptations & color palettes",
                    "Social media templates & corporate brochure designs",
                    "AI-assisted short-form video reels & promo animations",
                    "Digital event banners and marketing collateral",
                    "High-resolution print and screen deliverables"
                ],
                is_visible=True,
                delivery_time="1-3 weeks",
                active_projects_count=4,
            ),
            Service(
                id="SRV-009",
                title="Digital Catalogues, Menus & QR",
                category="Hospitality & Retail",
                description="Touchless, lightning-fast digital menus and interactive product catalogues accessed instantly via smartphone QR code scan.",
                icon_name="QrCode",
                starting_price=80.0,
                banner_image="https://i.ibb.co/sp4TX1T0/Whats-App-Image-2026-11-10-at-9-56-32-PM-1.jpg",
                media_type="image",
                show_in_banner=True,
                features=[
                    "Instant mobile access with no app download required",
                    "High-resolution item photography & OMR pricing",
                    "Dietary filters, allergens & multi-language support",
                    "Custom branded print-ready table QR stands",
                    "Simple dashboard for live price and menu item updates"
                ],
                is_visible=True,
                delivery_time="1-2 weeks",
                active_projects_count=8,
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

        # 9. Testimonials (Seed initial admin testimonials if empty)
        print("Seeding testimonials...")
        if db.query(Testimonial).count() == 0:
            testimonials_seed = [
                Testimonial(
                    id="test-1",
                    client_name="Patrick Collison",
                    client_role="CEO & Co-Founder",
                    company="Stripe",
                    avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                    rating=5,
                    quote="The Pixel engineering team operates with an obsessive dedication to code quality and systems reliability that matches Stripe's own standards. Their sovereign cloud architecture exceeded our highest benchmarks.",
                    project="Stripe Unified Billing Portal",
                    status="Approved",
                    date="2026-09-22",
                ),
                Testimonial(
                    id="test-2",
                    client_name="Harshil Mathur",
                    client_role="CEO & Co-Founder",
                    company="Razorpay",
                    avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
                    rating=5,
                    quote="Pixel helped us build our offline-capable omnichannel POS dashboard from zero to live merchant production in under four months. Outstanding speed, zero production regressions.",
                    project="Razorpay OmniChannel POS",
                    status="Approved",
                    date="2026-08-14",
                ),
                Testimonial(
                    id="test-3",
                    client_name="Karri Saarinen",
                    client_role="Co-Founder & Head of Product",
                    company="Linear",
                    avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
                    rating=5,
                    quote="Pixel's craft in frontend performance and AI inference pipelines is rare. They built our issue triage agent with meticulous attention to keyboard shortcuts, latency, and aesthetic subtlety.",
                    project="Linear Workflow Automation SDK",
                    status="Approved",
                    date="2026-10-02",
                ),
                Testimonial(
                    id="test-4",
                    client_name="Deepinder Goyal",
                    client_role="Founder & CEO",
                    company="Zomato",
                    avatar="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
                    rating=5,
                    quote="When 100,000 orders stream across kitchen screens in peak dinner hours, seconds matter. Pixel's tablet UI has been virtually uncrashable under grueling real-world kitchen environments.",
                    project="Zomato Kitchen Pulse 2.0",
                    status="Approved",
                    date="2026-09-05",
                ),
                Testimonial(
                    id="test-5",
                    client_name="Kunal Shah",
                    client_role="Founder",
                    company="CRED",
                    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                    rating=5,
                    quote="Taste is not something you can teach easily. Pixel's design team understood the ultra-luxury minimalist nuance we require for high-net-worth members from day one.",
                    project="Cred Wealth Management Suite",
                    status="Approved",
                    date="2026-07-19",
                ),
                Testimonial(
                    id="test-6",
                    client_name="Guillermo Rauch",
                    client_role="CEO",
                    company="Vercel",
                    avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
                    rating=5,
                    quote="Their deep knowledge of edge runtimes and speculative pre-rendering pushed what's possible on modern web infrastructure. We're proud to have Pixel as an ecosystem partner.",
                    project="Vercel Enterprise Edge Cache Optimizer",
                    status="Approved",
                    date="2026-06-11",
                ),
                Testimonial(
                    id="test-7",
                    client_name="Abhinav Asthana",
                    client_role="CEO & Co-Founder",
                    company="Postman",
                    avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
                    rating=4,
                    quote="The ClickHouse aggregation cluster and OpenTelemetry ingestion bridge designed by Pixel solved our multi-tenant telemetry bottleneck effortlessly. Highly recommended.",
                    project="Postman API Observability Hub",
                    status="Pending",
                    date="2026-10-15",
                ),
                Testimonial(
                    id="test-8",
                    client_name="David Hansson",
                    client_role="CTO",
                    company="Basecamp Software",
                    avatar="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
                    rating=2,
                    quote="Decent work but we prefer vanillajs and simpler server rendered HTML without heavy client hydration trees.",
                    project="Internal Migration Probe",
                    status="Rejected",
                    date="2026-08-01",
                ),
            ]
            db.add_all(testimonials_seed)

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
