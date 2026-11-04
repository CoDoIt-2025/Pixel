"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FileText,
  User,
  Building2,
  Search,
  Bell,
  Palette,
  Save,
  Check,
  RotateCcw,
  ShieldCheck,
  Mail,
  Lock,
  Sun,
  Moon,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdminStore } from "@/lib/store";
import { toast } from "sonner";

// Zod schemas for forms
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().min(5, "Bio required"),
  timezone: z.string().min(2, "Timezone required"),
  avatar: z.string().url("Valid avatar URL required"),
});

const companySchema = z.object({
  name: z.string().min(2, "Company name required"),
  email: z.string().email("Valid business email required"),
  phone: z.string().min(5, "Phone is required"),
  address: z.string().min(5, "Address required"),
  taxId: z.string().min(2, "Tax ID / EIN required"),
  currency: z.string().min(1, "Currency required"),
  website: z.string().url("Valid URL required"),
  description: z.string().optional(),
});

const seoSchema = z.object({
  metaTitle: z.string().min(5, "Meta title must be at least 5 characters"),
  metaDescription: z.string().min(10, "Meta description must be at least 10 characters"),
  keywords: z.string().min(3, "Keywords required"),
  ogImage: z.string().url("Valid OG image URL required"),
  googleAnalyticsId: z.string().min(3, "GA Measurement ID required"),
});

export default function SettingsPage() {
  const settings = useAdminStore((state) => state.settings);
  const updateSettings = useAdminStore((state) => state.updateSettings);
  const resetToDefaults = useAdminStore((state) => state.resetToDefaults);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: settings.profile,
  });

  // Company Form
  const {
    register: registerCompany,
    handleSubmit: handleCompanySubmit,
    formState: { errors: companyErrors },
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: settings.company,
  });

  // SEO Form
  const {
    register: registerSeo,
    handleSubmit: handleSeoSubmit,
    formState: { errors: seoErrors },
  } = useForm({
    resolver: zodResolver(seoSchema),
    defaultValues: settings.seo,
  });

  // Notification States
  const [emailAlerts, setEmailAlerts] = useState(settings.notifications.emailAlerts);
  const [weeklyDigest, setWeeklyDigest] = useState(settings.notifications.weeklyDigest);
  const [milestoneAlerts, setMilestoneAlerts] = useState(settings.notifications.milestoneAlerts);
  const [securityAlerts, setSecurityAlerts] = useState(settings.notifications.securityAlerts);
  const [marketingUpdates, setMarketingUpdates] = useState(settings.notifications.marketingUpdates);

  // Appearance States
  const [selectedColor, setSelectedColor] = useState(settings.appearance.primaryColor);
  const [compactMode, setCompactMode] = useState(settings.appearance.compactMode);
  const [selectedTheme, setSelectedTheme] = useState(settings.appearance.theme || "charcoal");

  React.useEffect(() => {
    if (settings.appearance?.theme) {
      setSelectedTheme(settings.appearance.theme);
    }
    if (settings.appearance?.primaryColor) {
      setSelectedColor(settings.appearance.primaryColor);
    }
    if (typeof settings.appearance?.compactMode === "boolean") {
      setCompactMode(settings.appearance.compactMode);
    }
  }, [settings.appearance]);

  const handleThemeSelect = (newTheme: string) => {
    setSelectedTheme(newTheme);
    updateSettings({
      appearance: {
        primaryColor: selectedColor,
        theme: newTheme,
        compactMode,
        highContrast: false,
      },
    });
    toast.success(
      `Theme changed to ${
        newTheme === "light" ? "Ivory Light" : "Charcoal Dark"
      }. Applied to public website.`
    );
  };

  // Homepage CMS (About & Why Pixel)
  const [aboutTitle, setAboutTitle] = useState(
    settings.company?.aboutTitle || "About Pixel"
  );
  const [aboutText, setAboutText] = useState(
    settings.company?.aboutText ||
      "Pixel Business Solutions LLC is a Muscat-based digital agency committed to helping businesses in Oman establish a dominant online presence. We bridge technical precision with practical execution — from local search and AI visibility to high-converting websites and digital solutions."
  );
  const [whyTitle, setWhyTitle] = useState(
    settings.company?.whyTitle || "Why Pixel"
  );
  const [whyReasons, setWhyReasons] = useState<
    Array<{ title: string; description: string }>
  >(
    settings.company?.whyReasons || [
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
    ]
  );

  const onSaveCms = () => {
    updateSettings({
      company: {
        ...settings.company,
        aboutTitle,
        aboutText,
        whyTitle,
        whyReasons,
      },
    });
    toast.success("Homepage About & Why Pixel updated! Reflected live on the public website.");
  };

  const onSaveProfile = (data: any) => {
    updateSettings({ profile: data });
    toast.success("Profile changes saved successfully");
  };

  const onSaveCompany = (data: any) => {
    updateSettings({ company: data });
    toast.success("Company information updated");
  };

  const onSaveSeo = (data: any) => {
    updateSettings({ seo: data });
    toast.success("Website SEO settings saved");
  };

  const onSaveNotifications = () => {
    updateSettings({
      notifications: {
        emailAlerts,
        weeklyDigest,
        milestoneAlerts,
        securityAlerts,
        marketingUpdates,
      },
    });
    toast.success("Notification preferences updated");
  };

  const onSaveAppearance = () => {
    updateSettings({
      appearance: {
        primaryColor: selectedColor,
        theme: selectedTheme,
        compactMode,
        highContrast: false,
      },
    });
    toast.success(
      `Appearance updated: ${
        selectedTheme === "light" ? "Ivory Light Theme" : "Charcoal Dark Theme"
      } is now active on the public website`
    );
  };

  const handleResetData = () => {
    resetToDefaults();
    toast.success("Demo dataset reset to initial state!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="System Settings & Configuration"
          description="Manage administrative profile, company legal entities, website SEO tags, and security alerts."
        />

        <Tabs defaultValue="cms" className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-6 w-full max-w-3xl h-auto p-1 bg-slate-100/80">
            <TabsTrigger value="cms" className="text-xs py-2">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Homepage CMS
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs py-2">
              <User className="h-3.5 w-3.5 mr-1.5" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="text-xs py-2">
              <Building2 className="h-3.5 w-3.5 mr-1.5" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-xs py-2">
              <Search className="h-3.5 w-3.5 mr-1.5" />
              Website SEO
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs py-2">
              <Bell className="h-3.5 w-3.5 mr-1.5" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs py-2">
              <Palette className="h-3.5 w-3.5 mr-1.5" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Tab 0: Homepage CMS (About & Why Pixel) */}
          <TabsContent value="cms">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Homepage Content Management System</CardTitle>
                  <CardDescription>
                    Edit the About Pixel narrative and Why Pixel value propositions. Any updates saved here immediately sync to SQLite and reflect on the public website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Brand Logo & Hero Banner Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Brand Logo Card */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          Official Brand Emblem
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Active on Site
                        </span>
                      </div>
                      <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="h-14 w-14 rounded-lg bg-[#121418] flex items-center justify-center p-2 shrink-0">
                          <img
                            src="/brand/pixel-logo-3d-tight.png"
                            alt="Pixel 3D Emblem"
                            className="h-10 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(250,204,21,0.3)]"
                          />
                        </div>
                        <div className="text-xs space-y-1">
                          <p className="font-bold text-slate-900">3D Metallic Gold &amp; Silver PX</p>
                          <p className="text-slate-500 text-[11px]">Deployed across public navbar, footer, and favicon.</p>
                        </div>
                      </div>
                    </div>

                    {/* Hero Service Banners Quick Action */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            Hero Service Banners &amp; Videos
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            9 Services
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Upload custom banner images, video loops, or 3D mockups for each service on the homepage hero.
                        </p>
                      </div>
                      <Link
                        href="/services"
                        className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                      >
                        <Upload className="h-3.5 w-3.5 text-amber-400" />
                        <span>Open Services Banner &amp; Media Uploader</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* About Section Form */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      About Pixel Section
                    </h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Section Heading
                      </label>
                      <Input
                        value={aboutTitle}
                        onChange={(e) => setAboutTitle(e.target.value)}
                        className="bg-white"
                        placeholder="About Pixel"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        About Story & Narrative (Displayed as paragraphs on homepage)
                      </label>
                      <Textarea
                        rows={4}
                        value={aboutText}
                        onChange={(e) => setAboutText(e.target.value)}
                        className="bg-white"
                        placeholder="Pixel Business Solutions LLC is a Muscat-based digital agency..."
                      />
                    </div>
                  </div>

                  {/* Why Pixel Form */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Why Pixel Section (Golden Bullets)
                    </h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Section Heading
                      </label>
                      <Input
                        value={whyTitle}
                        onChange={(e) => setWhyTitle(e.target.value)}
                        className="bg-white"
                        placeholder="Why Pixel"
                      />
                    </div>

                    <div className="space-y-3">
                      {whyReasons.map((reason, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                            <Input
                              value={reason.title}
                              onChange={(e) => {
                                const updated = [...whyReasons];
                                updated[idx].title = e.target.value;
                                setWhyReasons(updated);
                              }}
                              className="font-bold text-xs h-8"
                              placeholder={`Reason ${idx + 1} Title`}
                            />
                          </div>
                          <Input
                            value={reason.description}
                            onChange={(e) => {
                              const updated = [...whyReasons];
                              updated[idx].description = e.target.value;
                              setWhyReasons(updated);
                            }}
                            className="text-xs h-8 text-slate-600"
                            placeholder={`Reason ${idx + 1} Description`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button size="sm" onClick={onSaveCms} className="bg-amber-400 text-slate-900 hover:bg-amber-500 font-bold">
                      <Save className="h-4 w-4 mr-1.5" />
                      Save & Publish to Public Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 1: Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Administrator Profile</CardTitle>
                <CardDescription>
                  Your executive identity, contact credentials, and session preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleProfileSubmit(onSaveProfile)}
                  className="space-y-4 text-xs max-w-xl"
                >
                  <div className="flex items-center gap-4 pb-2">
                    <Avatar className="h-16 w-16 border-2 border-slate-200">
                      <AvatarImage src={settings.profile.avatar} alt={settings.profile.name} />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {settings.profile.name}
                      </h4>
                      <p className="text-slate-500">{settings.profile.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name</label>
                      <Input {...registerProfile("name")} />
                      {profileErrors.name && (
                        <p className="text-rose-600">{profileErrors.name.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Account Role</label>
                      <Input {...registerProfile("role")} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Email Address</label>
                    <Input {...registerProfile("email")} />
                    {profileErrors.email && (
                      <p className="text-rose-600">{profileErrors.email.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Avatar Image URL</label>
                    <Input {...registerProfile("avatar")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Timezone</label>
                    <Input {...registerProfile("timezone")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Professional Bio</label>
                    <Textarea rows={3} {...registerProfile("bio")} />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="sm">
                      <Save className="h-4 w-4 mr-1.5" />
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Company Info */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company &amp; Legal Organization</CardTitle>
                <CardDescription>
                  Corporate identity, physical addresses, tax identification, and billing settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleCompanySubmit(onSaveCompany)}
                  className="space-y-4 text-xs max-w-xl"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Legal Company Name</label>
                      <Input {...registerCompany("name")} />
                      {companyErrors.name && (
                        <p className="text-rose-600">{companyErrors.name.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Primary Currency</label>
                      <Input {...registerCompany("currency")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Business Inquiries Email</label>
                      <Input {...registerCompany("email")} />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Headquarters Phone</label>
                      <Input {...registerCompany("phone")} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Tax ID / EIN / GSTIN</label>
                    <Input {...registerCompany("taxId")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Corporate Website</label>
                    <Input {...registerCompany("website")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Official Office Locations</label>
                    <Textarea rows={2} {...registerCompany("address")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Company Mission / Tagline</label>
                    <Textarea rows={2} {...registerCompany("description")} placeholder="Bespoke web applications, AI engineering, and cloud platforms..." />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="sm">
                      <Save className="h-4 w-4 mr-1.5" />
                      Save Company Information
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Website SEO */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>Website SEO &amp; Social Meta Tags</CardTitle>
                <CardDescription>
                  Search engine index rules, OpenGraph social sharing previews, and tracking IDs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSeoSubmit(onSaveSeo)}
                  className="space-y-4 text-xs max-w-xl"
                >
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Default Meta Title</label>
                    <Input {...registerSeo("metaTitle")} />
                    {seoErrors.metaTitle && (
                      <p className="text-rose-600">{seoErrors.metaTitle.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Meta Description</label>
                    <Textarea rows={3} {...registerSeo("metaDescription")} />
                    {seoErrors.metaDescription && (
                      <p className="text-rose-600">{seoErrors.metaDescription.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Keywords (comma-separated)</label>
                    <Input {...registerSeo("keywords")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Social Share Image (OG:Image)</label>
                    <Input {...registerSeo("ogImage")} />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Google Analytics 4 ID</label>
                    <Input {...registerSeo("googleAnalyticsId")} />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="sm">
                      <Save className="h-4 w-4 mr-1.5" />
                      Save SEO Settings
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure automated email dispatches and real-time alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 max-w-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">
                        New Inbound Inquiries
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Receive instant email alert whenever prospective clients submit RFP forms
                      </p>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">
                        Weekly Operational Digest
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Summarize weekly revenue, page impressions, and sprint milestone health
                      </p>
                    </div>
                    <Switch
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">
                        Sprint Milestone Alerts
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Notify team leads when project deliverables pass or fall behind schedule
                      </p>
                    </div>
                    <Switch
                      checked={milestoneAlerts}
                      onCheckedChange={setMilestoneAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">
                        Security &amp; Auth Alerts
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Alert on new logins from unverified IPs or suspicious session tokens
                      </p>
                    </div>
                    <Switch
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button size="sm" onClick={onSaveNotifications}>
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Notification Rules
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Appearance & Data Reset */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance &amp; Demo Dataset</CardTitle>
                <CardDescription>
                  Fine-tune theme accents, UI spacing, or reset all demo data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 max-w-xl text-xs">
                {/* Website Theme Selector */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <div>
                    <label className="font-semibold text-slate-900 text-xs block">
                      Website Public Theme Mode
                    </label>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Switch between the primary Charcoal Dark palette and the clean Ivory Light palette for the live website
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleThemeSelect("charcoal")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedTheme === "charcoal" || selectedTheme === "dark"
                          ? "border-[#F5C542] ring-2 ring-[#F5C542]/40 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-900/90 text-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4 text-[#F5C542]" />
                          <span className="font-bold text-xs">Charcoal Dark</span>
                        </div>
                        {(selectedTheme === "charcoal" || selectedTheme === "dark") && (
                          <span className="w-2 h-2 rounded-full bg-[#F5C542]" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-4 h-4 rounded-full bg-[#202124] border border-[#45484E]" title="Charcoal #202124" />
                        <span className="w-4 h-4 rounded-full bg-[#2B2D31] border border-[#45484E]" title="Card #2B2D31" />
                        <span className="w-4 h-4 rounded-full bg-[#F5C542]" title="Yellow #F5C542" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">
                        Main #202124 background, #2B2D31 cards, #F5C542 buttons
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleThemeSelect("light")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedTheme === "light"
                          ? "border-[#F5C542] ring-2 ring-[#F5C542]/40 bg-white text-slate-900 shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-[#F5C542]" />
                          <span className="font-bold text-xs">Ivory Light</span>
                        </div>
                        {selectedTheme === "light" && (
                          <span className="w-2 h-2 rounded-full bg-[#F5C542]" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-4 h-4 rounded-full bg-[#F5F4EF] border border-[#E5E4DE]" title="Light #F5F4EF" />
                        <span className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#E5E4DE]" title="Card #FFFFFF" />
                        <span className="w-4 h-4 rounded-full bg-[#F5C542]" title="Yellow #F5C542" />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2">
                        Light #F5F4EF background, #FFFFFF cards, #202124 text
                      </p>
                    </button>
                  </div>
                </div>

                {/* Accent Color Picker */}
                <div className="space-y-2">
                  <label className="font-semibold text-slate-900">
                    Primary Accent Color
                  </label>
                  <p className="text-slate-500 text-[11px]">
                    Select the signature brand color used for badges, buttons, and active indicators
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    {[
                      { name: "Indigo / Violet", hex: "#6366F1" },
                      { name: "Blue", hex: "#3B82F6" },
                      { name: "Emerald", hex: "#10B981" },
                      { name: "Purple", hex: "#8B5CF6" },
                      { name: "Amber", hex: "#F59E0B" },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setSelectedColor(col.hex)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-transform cursor-pointer border-2 ${
                          selectedColor === col.hex
                            ? "scale-110 border-slate-900 shadow-xs"
                            : "border-white"
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      >
                        {selectedColor === col.hex && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compact Mode Toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-900">Compact Density</p>
                    <p className="text-[11px] text-slate-500">
                      Tighter row padding across tables and grid lists
                    </p>
                  </div>
                  <Switch
                    checked={compactMode}
                    onCheckedChange={setCompactMode}
                  />
                </div>

                <div className="pt-2">
                  <Button size="sm" onClick={onSaveAppearance}>
                    <Save className="h-4 w-4 mr-1.5" />
                    Save Appearance Settings
                  </Button>
                </div>

                {/* Reset Demo Data Danger Zone */}
                <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 space-y-3 mt-6">
                  <div>
                    <h4 className="font-semibold text-rose-900 text-xs">
                      Reset Demo Dataset
                    </h4>
                    <p className="text-[11px] text-rose-700 mt-0.5">
                      Restore all mock projects, clients, team members, blog posts, and inquiries to initial defaults.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetData}
                    className="border-rose-300 text-rose-700 hover:bg-rose-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                    Restore Default Mock Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
