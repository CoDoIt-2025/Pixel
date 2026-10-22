export type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed";
export type ProjectCategory = "Web Development" | "Mobile Apps" | "UI/UX Design" | "Cloud Architecture" | "AI Solutions";

export interface ProjectTeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  assignee: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  client: string;
  clientId: string;
  status: ProjectStatus;
  category: ProjectCategory;
  budget: number;
  spent: number;
  deadline: string;
  startDate: string;
  progress: number;
  description: string;
  team: ProjectTeamMember[];
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
}

export type ClientStatus = "Active" | "Inactive" | "Lead";

export interface Client {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  totalSpend: number;
  activeProjects: number;
  status: ClientStatus;
  website: string;
  location: string;
  logo: string;
  notes?: string;
  createdAt: string;
}

export type TeamStatus = "Active" | "Away" | "Offline";
export type Department = "Engineering" | "Design" | "Product" | "Cloud & DevOps" | "AI & Research";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: Department;
  skills: string[];
  email: string;
  phone: string;
  avatar: string;
  status: TeamStatus;
  joinDate: string;
  bio: string;
  location: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  startingPrice: number;
  features: string[];
  isVisible: boolean;
  deliveryTime: string;
  activeProjectsCount: number;
}

export type PostStatus = "Draft" | "Published" | "Scheduled";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  status: PostStatus;
  views: number;
  publishedAt: string;
  readingTime: string;
}

export type InquiryStatus = "New" | "In Progress" | "Resolved" | "Spam";

export interface InquiryReply {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  date: string;
  status: InquiryStatus;
  replies: InquiryReply[];
}

export type TestimonialStatus = "Pending" | "Approved" | "Rejected";

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  project: string;
  status: TestimonialStatus;
  date: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: "project" | "client" | "blog" | "inquiry" | "testimonial" | "team" | "faq";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
}

export interface UserSettings {
  profile: {
    name: string;
    email: string;
    avatar: string;
    role: string;
    bio: string;
    timezone: string;
  };
  company: {
    name: string;
    email: string;
    phone: string;
    address: string;
    taxId: string;
    currency: string;
    website: string;
    description?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    googleAnalyticsId: string;
  };
  notifications: {
    emailAlerts: boolean;
    weeklyDigest: boolean;
    milestoneAlerts: boolean;
    securityAlerts: boolean;
    marketingUpdates: boolean;
  };
  appearance: {
    primaryColor: string;
    compactMode: boolean;
    highContrast: boolean;
  };
}
