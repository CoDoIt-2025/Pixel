export interface MonthlyRevenue {
  month: string;
  revenue: number;
  target: number;
  expenses: number;
}

export const mockRevenueData: MonthlyRevenue[] = [
  { month: "Nov", revenue: 58000, target: 55000, expenses: 32000 },
  { month: "Dec", revenue: 64000, target: 60000, expenses: 35000 },
  { month: "Jan", revenue: 61000, target: 62000, expenses: 33000 },
  { month: "Feb", revenue: 67000, target: 65000, expenses: 36000 },
  { month: "Mar", revenue: 73000, target: 70000, expenses: 39000 },
  { month: "Apr", revenue: 79000, target: 75000, expenses: 41000 },
  { month: "May", revenue: 84000, target: 80000, expenses: 43000 },
  { month: "Jun", revenue: 89000, target: 85000, expenses: 45000 },
  { month: "Jul", revenue: 94000, target: 90000, expenses: 48000 },
  { month: "Aug", revenue: 98000, target: 95000, expenses: 49000 },
  { month: "Sep", revenue: 104000, target: 100000, expenses: 52000 },
  { month: "Oct", revenue: 112000, target: 105000, expenses: 54000 },
];

export interface MonthlyTraffic {
  month: string;
  visitors: number;
  pageViews: number;
}

export const mockTrafficData: MonthlyTraffic[] = [
  { month: "May", visitors: 14200, pageViews: 41200 },
  { month: "Jun", visitors: 16800, pageViews: 49800 },
  { month: "Jul", visitors: 19400, pageViews: 58200 },
  { month: "Aug", visitors: 22100, pageViews: 66400 },
  { month: "Sep", visitors: 26500, pageViews: 79500 },
  { month: "Oct", visitors: 31200, pageViews: 94600 },
];

export const mockProjectStatusData = [
  { name: "In Progress", value: 7, color: "#6366F1" }, // Indigo
  { name: "Review", value: 3, color: "#8B5CF6" }, // Violet
  { name: "Planning", value: 3, color: "#F59E0B" }, // Amber
  { name: "Completed", value: 3, color: "#10B981" }, // Emerald
];

export const mockAnalyticsOverview = {
  totalVisitors: 128450,
  visitorsTrend: "+18.4%",
  pageViews: 389200,
  pageViewsTrend: "+24.1%",
  bounceRate: 32.8,
  bounceRateTrend: "-2.6%",
  avgSessionDuration: "3m 48s",
  durationTrend: "+14.3%",
};

export const mockTopPages = [
  { path: "/", title: "Pixel Studio - Enterprise Software & AI", views: 142800, uniqueVisitors: 84200, bounceRate: "28.4%", avgDuration: "2m 14s" },
  { path: "/services", title: "Enterprise Services & Capabilities", views: 82400, uniqueVisitors: 51200, bounceRate: "34.1%", avgDuration: "3m 45s" },
  { path: "/blog/scaling-nextjs-app-router-10m-sessions", title: "Scaling Next.js App Router for 10M Sessions", views: 48900, uniqueVisitors: 38100, bounceRate: "22.6%", avgDuration: "5m 12s" },
  { path: "/case-studies/razorpay", title: "Case Study: Razorpay OmniChannel POS", views: 36200, uniqueVisitors: 24600, bounceRate: "31.0%", avgDuration: "4m 02s" },
  { path: "/blog/demystifying-agentic-tool-calling", title: "Demystifying Agentic Tool Calling", views: 29500, uniqueVisitors: 21900, bounceRate: "25.3%", avgDuration: "4m 50s" },
  { path: "/contact", title: "Schedule an Architectural Consultation", views: 24100, uniqueVisitors: 19800, bounceRate: "42.1%", avgDuration: "1m 58s" },
];

export const mockTrafficSources = [
  { source: "Organic Search", percentage: 46, visitors: 59087, color: "#6366F1" },
  { source: "Direct Traffic", percentage: 28, visitors: 35966, color: "#3B82F6" },
  { source: "Social Media (X / LinkedIn)", percentage: 14, visitors: 17983, color: "#10B981" },
  { source: "Developer Communities (HN / GitHub)", percentage: 8, visitors: 10276, color: "#F59E0B" },
  { source: "Referrals & Backlinks", percentage: 4, visitors: 5138, color: "#EC4899" },
];

export const mockDeviceBreakdown = [
  { device: "Desktop (macOS / Windows)", percentage: 68, count: 87346, color: "#6366F1" },
  { device: "Mobile (iOS / Android)", percentage: 27, count: 34681, color: "#3B82F6" },
  { device: "Tablet (iPad / Surface)", percentage: 5, count: 6423, color: "#10B981" },
];

export const mockTopCountries = [
  { country: "United States", code: "US", visitors: 46250, percentage: 36 },
  { country: "India", code: "IN", visitors: 38530, percentage: 30 },
  { country: "United Kingdom", code: "GB", visitors: 12840, percentage: 10 },
  { country: "Germany", code: "DE", visitors: 8990, percentage: 7 },
  { country: "Canada", code: "CA", visitors: 6420, percentage: 5 },
  { country: "Singapore", code: "SG", visitors: 5140, percentage: 4 },
  { country: "Australia", code: "AU", visitors: 4880, percentage: 4 },
  { country: "Others", code: "WW", visitors: 5400, percentage: 4 },
];
