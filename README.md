# Pixel Admin Panel &bull; Enterprise Software Studio

A production-grade, high-performance Admin Panel built for **Pixel** &mdash; an elite enterprise software and AI engineering studio. Designed with a clean white aesthetic, subtle slate surfaces, indigo/violet accents, full reactivity via persistent client state, and responsive desktop/mobile layouts.

---

## ⚡ Quick Start

### 1. Installation
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically route you to `/login` if unauthenticated.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔐 Demo Login Credentials

Any email and password combination will grant access. For convenience, the login page includes a **1-click "Auto-fill"** button:

| Field | Value |
| :--- | :--- |
| **Email** | `admin@pixel.dev` |
| **Password** | `password123` (or any credentials) |
| **Session** | Stored in `pixel_auth_session` cookie + `localStorage` |
| **Protected Routes** | Enforced by Next.js edge route middleware |

---

## 🎨 Design & Aesthetic System

- **Clean White Palette**: White base (`#FFFFFF`), soft gray surfaces (`#F8FAFC` & `#F1F5F9`), crisp borders (`#E2E8F0`).
- **Signature Accent**: Indigo / Violet (`#6366F1`) with soft-tinted status badges.
- **Micro-Interactions**: Rounded-xl cards, subtle elevation shadows, smooth button press feedbacks, and responsive layouts.
- **Responsive**: Left sidebar collapses to compact icon mode on desktop (`72px`) and turns into a slide-over drawer on mobile devices.
- **Navigation Shortcuts**: Global Command Palette accessible via **Cmd+K** or **Ctrl+K** anywhere in the app.

---

## 🚀 Key Modules & Pages

### 1. **Login & Session Management** (`/login`)
- Clean white card layout with Pixel geometric pixel mark.
- Form validation via React Hook Form + Zod.
- 1-click demo credential prefill.
- Edge route protection via `middleware.ts`.

### 2. **Dashboard Overview** (`/dashboard`)
- **4 Real-time Stat Cards**: Total Revenue ($2.7M+), Active Projects, Total Clients, Open Inquiries &mdash; all dynamically calculated from the store with trend indicators.
- **Revenue & Financial Trajectory Chart**: 12-month trailing actual revenue vs target projections using Recharts Area curves.
- **Project Status Donut Chart**: Dynamic distribution of Planning, In Progress, Review, and Completed client deliverables with center totals.
- **Website Traffic Growth Chart**: Monthly unique visitors vs page view impressions.
- **Recent Activity Feed**: Real-time audit log of team actions and deliverables.
- **Recent Inquiries Table**: Direct access to incoming client RFP submissions with 1-click reply shortcuts.

### 3. **Projects Directory & Detail** (`/projects` and `/projects/[id]`)
- **Data Table**: Search by project name, client, or code (`PX-101`), filter by status and category, multi-column sorting (budget, deadline, progress, name), and pagination.
- **Add / Edit Modal**: Form validation for scope, budget, category, deadlines, and progress percentage.
- **Delete Dialog**: Confirmation modal with permanent record removal.
- **Project Detail Page** (`/projects/[id]`):
  - Budget allocated vs spent tracker.
  - Interactive milestone checklist: toggling a milestone updates completion status, recalculates sprint progress, and reflects across the dashboard.
  - Assigned engineering team cards with roles and avatars.
  - Granular task assignments with status pills.

### 4. **Clients & Enterprise Accounts** (`/clients`)
- **Card / Table View Toggle**: Seamlessly switch between rich company cards and a compact data grid.
- Tracks company, primary contact, industry, lifetime spend, active projects, and location.
- Add and edit client modals with full Zod validation.

### 5. **Team & Engineering Talent** (`/team`)
- Department pill filters: All, Engineering, Design, Product, Cloud & DevOps, AI & Research.
- Member cards displaying photo, role, department, skills tags, email, and live status (Active, Away, Offline).
- Add/Edit member dialog with instant UI update.

### 6. **Services Catalog** (`/services`)
- Full CRUD for core capabilities: Web Application Development, Mobile Apps, UI/UX Design, Cloud Architecture, Enterprise AI Solutions, Security Auditing.
- Category icons, starting price points, delivery timeline estimates, and capability feature checklists.
- **Interactive Visibility Switch**: Toggle public website visibility with instant state update and toast confirmation.

### 7. **Blog & Technical Publications** (`/blog`, `/blog/new`, `/blog/[id]`)
- Search by article title, author, or tags.
- Filter by status: Published, Draft, Scheduled.
- **Split-Screen Editor**: Markdown editor with live preview, word count calculation, automated reading-time estimator, and 1-click slug generation.

### 8. **Client Inquiries & RFPs** (`/inquiries`)
- Status tabs: All, New, In Progress, Resolved, Spam.
- Inbound inquiries from high-growth startups and enterprises (e.g. CredAI, Delhivery, Monzo Bank).
- **Detail Drawer & Reply Box**: Review client project specifications, view reply threads, compose replies, and mark status as Resolved with 1-click.

### 9. **Testimonials & Endorsements** (`/testimonials`)
- Star ratings (1-5 stars) and quotes from enterprise technology leaders (Patrick Collison, Harshil Mathur, Karri Saarinen, etc.).
- **1-Click Approvals**: Approve or Reject reviews directly from the card.
- Add Testimonial modal and delete dialog.

### 10. **Traffic & User Analytics** (`/analytics`)
- Date-range filter selector: Last 7 Days, Last 30 Days, Last 90 Days, Year to Date.
- 4 Key Metrics: Unique Visitors, Page Views, Bounce Rate, Avg. Session Duration.
- **Interactive Charts**: Visitors velocity area chart, Acquisition sources donut chart (Organic, Direct, Social, Dev Communities, Referrals).
- Device breakdown progress bars (Desktop 68%, Mobile 27%, Tablet 5%).
- Top pages table with impression counts and bounce rates.
- Top geographic countries table with flags and share percentages.

### 11. **System Settings** (`/settings`)
- Working form validation across 5 configuration tabs:
  1. **Profile**: Full Name, Work Email, Role, Avatar URL, Bio, Timezone.
  2. **Company Info**: Legal Name, Currency, Tax ID/EIN, Inquiries Email, Physical Offices.
  3. **Website SEO**: Meta Title, Description, Keywords, Social OG Image, Google Analytics 4 ID.
  4. **Notifications**: Email alerts, weekly digest, sprint milestone alerts, security alerts.
  5. **Appearance & Demo Dataset**: Brand accent color picker (Indigo, Blue, Emerald, Purple, Amber), compact layout density toggle, and a **"Restore Default Mock Data"** button to reset state anytime.

### 12. **Global Command Palette** (`Cmd+K` / `Ctrl+K`)
- Rapid keyboard-driven navigation across all 10 system modules.
- Quick actions: Create New Project, Write Blog Post, Log Out.

---

## 🛠️ Architecture & Tech Stack

```
pixel/
├── app/                      # Next.js 16 App Router
│   ├── analytics/            # Analytics & telemetry dashboard
│   ├── blog/                 # Blog directory, editor (/new, /[id])
│   ├── clients/              # Enterprise clients directory
│   ├── dashboard/            # Executive overview dashboard
│   ├── inquiries/            # Inbound contact inquiries & replies
│   ├── login/                # Authentication screen
│   ├── projects/             # Projects table and detail (/[id])
│   ├── services/             # Services catalog & website toggle
│   ├── settings/             # System settings tabs
│   ├── team/                 # Team members directory
│   ├── testimonials/         # Client reviews and approval workflow
│   ├── globals.css           # Tailwind CSS v4 styling & color system
│   ├── layout.tsx            # Root layout with font and Sonner Toaster
│   └── page.tsx              # Root redirect to /dashboard
├── components/
│   ├── charts/               # Recharts components (Revenue, Traffic, Status, etc.)
│   ├── shared/               # AdminLayout, Sidebar, Topbar, StatCard, CommandPalette, etc.
│   └── ui/                   # Reusable shadcn/ui components (Button, Card, Dialog, etc.)
├── data/                     # Realistic mock data (20-30 realistic items per entity)
├── hooks/                    # Hydration and custom hooks
├── lib/                      # Zustand store (persisted), auth utils, formatting
├── types/                    # TypeScript domain interfaces
├── middleware.ts             # Auth session protection middleware
└── package.json
```

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **State Management**: Zustand with `persist` middleware (local storage sync ensures all additions/edits/deletions survive reloads without a remote DB)
- **Component Primitives**: Radix UI (Dialog, DropdownMenu, Tabs, Select, Avatar, Tooltip)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms & Validation**: React Hook Form + Zod
- **Notifications**: Sonner (toasts on every user mutation)

---

## 📄 License
MIT &copy; 2026 Pixel Technologies Inc. All rights reserved.
