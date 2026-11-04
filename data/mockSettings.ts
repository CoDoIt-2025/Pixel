import { UserSettings } from "@/types";

export const initialSettings: UserSettings = {
  profile: {
    name: "Pixel Administrator",
    email: "admin@pixelbusiness.om",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    role: "Managing Director",
    bio: "Guiding website planning, SEO, local search presence, and digital hospitality tools for Oman businesses.",
    timezone: "UTC+04:00 (Oman / GST)",
  },
  company: {
    name: "Pixel Business Solutions LLC",
    email: "contact@pixelbusiness.om",
    phone: "+968 9693 5606",
    address: "Muscat, Sultanate of Oman",
    taxId: "CR-1049281",
    currency: "OMR (ر.ع.)",
    website: "https://pixelbusiness.om",
    description:
      "Pixel Business Solutions LLC helps businesses build a dominant online presence through website design, local SEO, Google Business Profile management, social media management, Google & Meta ads, and AI visibility.",
    aboutTitle: "About Pixel",
    aboutText:
      "Pixel Business Solutions LLC is a Muscat-based digital agency committed to helping businesses in Oman establish a dominant online presence. We bridge technical precision with practical execution — from local search and AI visibility to high-converting websites and digital solutions.",
    whyTitle: "Why Pixel",
    whyReasons: [
      {
        title: "Reason one",
        description:
          "Oman-first market expertise tailored for local search, customer behavior, and verified map presence.",
      },
      {
        title: "Reason two",
        description:
          "End-to-end digital capabilities under one roof — website engineering, SEO, AI search visibility, and paid media.",
      },
      {
        title: "Reason three",
        description:
          "Measurable business growth, direct communication, and 100% full client ownership of all digital assets.",
      },
    ],
  },
  seo: {
    metaTitle: "Website Design and Digital Marketing Oman | Pixel",
    metaDescription:
      "Explore website design, SEO, Google Business Profile, social media, AI visibility and QR menus for businesses in Oman. Discuss your project with Pixel.",
    keywords:
      "Website Design Oman, SEO Oman, Google Business Profile Oman, Social Media Oman, AI Visibility, Digital QR Menu Oman, Muscat",
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
    primaryColor: "#FACC15",
    theme: "charcoal",
    compactMode: false,
    highContrast: false,
  },
};
