import React, { createContext, useContext, useState, useEffect } from "react";
import type { CompanySettings, SEOSettings, AppearanceSettings } from "../types";
import { api } from "../lib/api";

const DEFAULT_COMPANY: CompanySettings = {
  name: "Pixel Business Solutions LLC",
  email: "contact@pixelbusiness.om",
  phone: "+968 2400 0000",
  address: "Muscat, Sultanate of Oman | Thrissur, Kerala",
  taxId: "CR-1049281",
  currency: "OMR (ر.ع.)",
  website: "https://pixelbusiness.om",
  description:
    "Pixel Business Solutions LLC helps businesses build a clearer online presence through website design, SEO, Google Business Profile management, social media management and AI visibility. For restaurants and hotels, we also offer digital QR menus.",
};

const DEFAULT_SEO: SEOSettings = {
  metaTitle: "Website Design and Digital Marketing Oman | Pixel",
  metaDescription:
    "Explore website design, SEO, Google Business Profile, social media, AI visibility and QR menus for businesses in Oman. Discuss your project with Pixel.",
  keywords: "Website Design Oman, SEO Oman, Google Business Profile, QR Menus",
  ogImage: "https://pixelbusiness.om/og-cover.png",
  googleAnalyticsId: "G-PXEL82710",
};

const DEFAULT_APPEARANCE: AppearanceSettings = {
  primaryColor: "#F5C542",
  theme: "light",
  compactMode: false,
  highContrast: false,
};

interface SettingsContextValue {
  company: CompanySettings;
  seo: SEOSettings;
  appearance: AppearanceSettings;
  theme: "charcoal" | "light";
  setTheme: (theme: "charcoal" | "light") => Promise<void>;
  toggleTheme: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextValue>({
  company: DEFAULT_COMPANY,
  seo: DEFAULT_SEO,
  appearance: DEFAULT_APPEARANCE,
  theme: "light",
  setTheme: async () => { },
  toggleTheme: async () => { },
  refreshSettings: async () => { },
  loading: false,
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [company, setCompany] = useState<CompanySettings>(DEFAULT_COMPANY);
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO);
  const [appearance, setAppearance] =
    useState<AppearanceSettings>(() => {
      let initialTheme: "charcoal" | "light" = DEFAULT_APPEARANCE.theme;
      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("pixel_theme");
          if (saved === "charcoal" || saved === "light") {
            initialTheme = saved;
          }
        } catch { }
      }
      return { ...DEFAULT_APPEARANCE, theme: initialTheme };
    });
  const [loading, setLoading] = useState(true);

  const applyThemeClass = (t: string) => {
    if (typeof document === "undefined") return;
    if (t === "light") {
      document.documentElement.classList.add("theme-light");
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.classList.remove("theme-light");
      document.documentElement.classList.add("theme-dark");
      document.documentElement.setAttribute("data-theme", "charcoal");
    }
  };

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
        if (data.appearance) {
          const app: AppearanceSettings = {
            primaryColor: data.appearance.primaryColor || "#F5C542",
            theme: data.appearance.theme === "charcoal" ? "charcoal" : "light",
            compactMode: data.appearance.compactMode,
            highContrast: data.appearance.highContrast,
          };
          setAppearance(app);
          applyThemeClass(app.theme);
        }
      }
    } catch (err) {
      console.warn("Could not load dynamic settings, using fallback defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  const setTheme = async (nextTheme: "charcoal" | "light") => {
    const updated: AppearanceSettings = { ...appearance, theme: nextTheme };
    setAppearance(updated);
    applyThemeClass(nextTheme);
    try {
      localStorage.setItem("pixel_theme", nextTheme);
    } catch {
      // Ignore localStorage error
    }

    try {
      await api.updateSettings({ appearance: updated });
    } catch {
      // Ignore background error
    }
  };

  const toggleTheme = async () => {
    const nextTheme: "charcoal" | "light" =
      appearance.theme === "light" ? "charcoal" : "light";
    await setTheme(nextTheme);
  };

  useEffect(() => {
    applyThemeClass(appearance.theme);
    fetchSettings();

    // Auto-refresh when tab regains focus or every 5 seconds to capture Admin Panel updates
    const handleFocus = () => fetchSettings();
    window.addEventListener("focus", handleFocus);
    const interval = setInterval(fetchSettings, 5000);

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
        appearance,
        theme: appearance.theme,
        setTheme,
        toggleTheme,
        refreshSettings: fetchSettings,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
