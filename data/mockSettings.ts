import { UserSettings } from "@/types";

export const initialSettings: UserSettings = {
  profile: {
    name: "Pixel Administrator",
    email: "admin@pixel.dev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    role: "Managing Director",
    bio: "Guiding website planning, SEO, local search presence, and digital hospitality tools for Oman and Thrissur businesses.",
    timezone: "UTC+04:00 (Oman / GST)",
  },
  company: {
    name: "Pixel Business Solutions LLC",
    email: "contact@pixelbusiness.om",
    phone: "+968 2400 0000",
    address: "Muscat, Sultanate of Oman | Thrissur, Kerala",
    taxId: "CR-1049281",
    currency: "OMR (ر.ع.)",
    website: "https://pixelbusiness.om",
    description: "Pixel Business Solutions LLC helps businesses build a clearer online presence through website design, SEO, Google Business Profile management, social media management and AI visibility. For restaurants and hotels, we also offer digital QR menus.",
  },
  seo: {
    metaTitle: "Website Design and Digital Marketing Oman | Pixel",
    metaDescription: "Explore website design, SEO, Google Business Profile, social media, AI visibility and QR menus for businesses in Oman. Discuss your project with Pixel.",
    keywords: "Website Design Oman, SEO Oman, Google Business Profile Oman, Social Media Oman, AI Visibility, Digital QR Menu Oman, Thrissur Kerala",
    ogImage: "https://pixelbusiness.om/og-cover.png",
    googleAnalyticsId: "G-PXEL82710",
  },
  notifications: {
    emailAlerts: true,
    weeklyDigest: true,
    milestoneAlerts: true,
    securityAlerts: true,
    marketingUpdates: false,
  },
  appearance: {
    primaryColor: "#F5C542",
    theme: "charcoal",
    compactMode: false,
    highContrast: false,
  },
};
