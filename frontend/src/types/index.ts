export interface Project {
  id: string;
  name: string;
  code: string;
  client: string;
  clientId?: string;
  status: "Planning" | "In Progress" | "Review" | "Completed";
  category: "Web Development" | "Mobile Apps" | "UI/UX Design" | "Cloud Architecture" | "AI Solutions";
  budget: number;
  spent: number;
  deadline: string;
  startDate?: string;
  progress: number;
  description: string;
  team: Array<{ id: string; name: string; avatar: string; role: string }>;
  milestones: Array<{ id: string; title: string; completed: boolean; dueDate: string }>;
  tasks: Array<{ id: string; title: string; status: "Todo" | "In Progress" | "Done"; assignee: string }>;
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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: string[];
  email: string;
  phone: string;
  avatar: string;
  status: string;
  joinDate: string;
  bio: string;
  location: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  project: string;
  status: string;
  date: string;
}
