import React, { createContext, useContext, useState, useEffect } from "react";
import type { CompanySettings, SEOSettings } from "../types";
import { api } from "../lib/api";

const DEFAULT_COMPANY: CompanySettings = {
  name: "Pixel Oman",
  email: "contact@pixel.dev",
  phone: "+968 2400 0000",
  address: "Muscat, Sultanate of Oman",
  taxId: "CR-1049281",
  currency: "OMR (ر.ع.)",
  website: "https://pixel.dev",
  description: "Software & AI engineering studio crafting modern web platforms, autonomous inference pipelines, and design systems for enterprise leaders.",
};

const DEFAULT_SEO: SEOSettings = {
  metaTitle: "Pixel Oman | Elite Enterprise Software Studio",
  metaDescription: "Bespoke web applications, AI engineering, and cloud platforms for ambitious global enterprises.",
  keywords: "Enterprise Software, Next.js, React, Cloud, AI Solutions",
  ogImage: "https://pixel.dev/og-cover.png",
  googleAnalyticsId: "G-PXEL82710",
};

interface SettingsContextValue {
  company: CompanySettings;
  seo: SEOSettings;
  refreshSettings: () => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextValue>({
  company: DEFAULT_COMPANY,
  seo: DEFAULT_SEO,
  refreshSettings: async () => {},
  loading: false,
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompany] = useState<CompanySettings>(DEFAULT_COMPANY);
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await api.getSettings();
      if (data) {
        if (data.company) {
          setCompany({ ...DEFAULT_COMPANY, ...data.company });
        }
        if (data.seo) {
          setSeo({ ...DEFAULT_SEO, ...data.seo });
          if (data.seo.metaTitle) {
            document.title = data.seo.metaTitle;
          }
        }
      }
    } catch (err) {
      console.warn("Could not load dynamic settings, using fallback defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Auto-refresh when tab regains focus or every 6 seconds to capture Admin Panel updates
    const handleFocus = () => fetchSettings();
    window.addEventListener("focus", handleFocus);
    const interval = setInterval(fetchSettings, 6000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        company,
        seo,
        refreshSettings: fetchSettings,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
