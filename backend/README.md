# Pixel Admin &bull; Python FastAPI Backend

High-throughput, asynchronous REST API built with **FastAPI**, **SQLAlchemy 2.0**, **Pydantic v2**, and **SQLite**.

---

## ⚡ Quick Start

### 1. Activate Virtual Environment
Windows PowerShell:
```powershell
.\backend\.venv\Scripts\Activate.ps1
```

Or run directly using the venv python executable:
```powershell
.\backend\.venv\Scripts\python.exe backend\run.py
```

### 2. Start the FastAPI Server
```bash
python backend/run.py
```
- **API URL**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### 3. Re-seed SQLite Database Anytime
To populate or restore the realistic enterprise demo dataset:
```bash
python backend/seed.py
```

---

## 🗄️ Database Architecture (`pixel.db`)

The SQLite database file is stored at `backend/data/pixel.db`. It contains 10 production-grade tables:
- `users`: Super admins with PBKDF2 hashed passwords and JWT generation.
- `projects`: Client code, status, budget, milestone checklists, and granular task lists.
- `clients`: Enterprise accounts, contacts, lifetime spend, and contracts.
- `team_members`: Engineering directory, department tags, and status.
- `services`: Capabilities catalog, pricing tiers, and public website visibility.
- `blog_posts`: Technical articles, tags, authors, and read estimates.
- `inquiries`: Inbound client RFPs with threaded support replies.
- `testimonials`: Endorsements with star ratings and approval moderation.
- `activity_items`: Real-time audit log of admin and client actions.
- `system_settings`: Profile, company metadata, and SEO settings.

---

## 🔐 Demo Credentials

| Field | Value |
| :--- | :--- |
| **Email** | `admin@pixel.dev` |
| **Password** | `password123` |
| **Auth Type** | Bearer JWT Token (`/api/v1/auth/login`) |
