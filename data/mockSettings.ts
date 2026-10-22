import { UserSettings } from "@/types";

export const initialSettings: UserSettings = {
  profile: {
    name: "Alex Vance",
    email: "alex@pixel.dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    role: "Managing Director & Founder",
    bio: "Building high-leverage software architectures, design systems, and generative AI platforms at Pixel Studio.",
    timezone: "UTC+05:30 (India Standard Time)",
  },
  company: {
    name: "Pixel Technologies Inc.",
    email: "contact@pixel.dev",
    phone: "+1 (415) 800-7493",
    address: "548 Market St, Suite 3400, San Francisco, CA 94104 / Indiranagar, Bengaluru, India",
    taxId: "EIN 94-3829104 / GSTIN 29AAACP1234F1Z8",
    currency: "USD ($)",
    website: "https://pixel.dev",
  },
  seo: {
    metaTitle: "Pixel - Enterprise Software Architecture & AI Engineering Studio",
    metaDescription: "Pixel partners with ambitious technology enterprises to engineer high-scale web platforms, mobile systems, and proprietary AI agents.",
    keywords: "Next.js, React 19, TypeScript, Enterprise Software, Cloud Architecture, AI Agents, Design Systems",
    ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
    googleAnalyticsId: "G-PX88294102",
  },
  notifications: {
    emailAlerts: true,
    weeklyDigest: true,
    milestoneAlerts: true,
    securityAlerts: true,
    marketingUpdates: false,
  },
  appearance: {
    primaryColor: "#6366F1",
    compactMode: false,
    highContrast: false,
  },
};
