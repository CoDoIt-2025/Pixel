import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";
import { SERVICE_COMPANY_DETAILS } from "../data/serviceCompanyDetails";
import { api, normalizeMediaUrl } from "../lib/api";
import { useSettings } from "../context/SettingsContext";

interface ServicePageProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  onBack: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  service,
  allServices,
  onBack,
  onSelectService,
}) => {
  // Retrieve company-grade enriched details for this service
  const detail =
    SERVICE_COMPANY_DETAILS[service.id] ||
    SERVICE_COMPANY_DETAILS["website-design-development"] ||
    SERVICE_COMPANY_DETAILS["local-seo-gbp"];

  const { company } = useSettings();
  const phone = company.phone || "+968 9696 7420";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const waDigits = phone.replace(/[^0-9]/g, "") || "96896967420";

  // Audit form state for this service
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSubmitSuccess(false);
    setSubmitError("");
  }, [service.id]);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !phoneNumber.trim()) {
      setSubmitError("Please provide your company name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await api.submitAuditRequest({
        company_name: companyName.trim(),
        phone_number: phoneNumber.trim(),
        website_link: websiteUrl.trim() || undefined,
        email: email.trim() || undefined,
        social_media_links: notes
          ? `Inquiry for ${service.title} - Notes: ${notes}`
          : `Direct Inquiry for: ${service.title}`,
      });

      setSubmitSuccess(true);
      setCompanyName("");
      setPhoneNumber("");
      setWebsiteUrl("");
      setEmail("");
      setNotes("");
    } catch (err: any) {
      setSubmitError(
        err.message || `Failed to submit request. Please reach us at ${phone}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToAuditForm = () => {
    const el = document.getElementById("service-audit-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#121418] min-h-screen selection:bg-[#FACC15] selection:text-[#121418]">
      {/* ── 1. Minimal Sub-Nav Bar ── */}
      <div className="bg-[#121418] border-b border-[#242831] sticky top-[105px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#A1A5B0] hover:text-[#FACC15] transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>All Services</span>
            <span className="text-[#3A3F4D]">/</span>
            <span className="text-white truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${waDigits}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E] hover:text-[#4ADE80] transition-colors"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={scrollToAuditForm}
              className="bg-[#FACC15] hover:bg-[#F59E0B] text-[#121418] font-bold text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer"
            >
              Request Proposal
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Minimalist Hero Section ── */}
      <section className="relative bg-[#121418] text-white pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-[#242831] overflow-hidden">
        {service.bannerImage && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={normalizeMediaUrl(service.bannerImage)}
              alt={service.title}
              className="w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/80 to-[#121418]/60" />
          </div>
        )}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D24] border border-[#2B303C] text-[11px] font-bold text-[#FACC15] tracking-wider uppercase">
            <Sparkles size={12} />
            <span>{detail.heroBadge || service.category}</span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {service.title}
            </h1>
            <p className="text-base sm:text-xl text-[#FACC15] font-semibold leading-relaxed">
              {detail.tagline}
            </p>
          </div>

          {/* Clean Summary */}
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-3xl font-normal">
            {detail.executiveSummary}
          </p>

          {/* Minimalist Stats Strip */}
          <div className="pt-6 border-t border-[#242831] grid grid-cols-2 sm:grid-cols-4 gap-6">
            {detail.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-[#FACC15]">
                  {metric.label}
                </div>
                {metric.subtext && (
                  <div className="text-[11px] text-[#717682]">
                    {metric.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={scrollToAuditForm}
              className="px-7 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#F59E0B] text-[#121418] font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Request Free Service Audit</span>
              <ArrowRight size={15} />
            </button>

            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#A1A5B0] hover:text-white transition-colors"
            >
              <Phone size={14} className="text-[#FACC15]" />
              <span>Call Muscat ({phone})</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. Why This Matters in Oman (Clean Editorial) ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Market Relevance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight">
                {detail.whyOmanMatters.title}
              </h2>
              <p className="text-sm text-[#525763] leading-relaxed">
                {detail.whyOmanMatters.description}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {detail.whyOmanMatters.points.map((point, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E5DF] flex items-start gap-3.5"
                >
                  <CheckCircle2
                    size={18}
                    className="text-[#D97706] shrink-0 mt-0.5"
                  />
                  <p className="text-xs sm:text-sm text-[#121418] font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Strategic Scope & Deliverables (Clean Minimal Grid) ── */}
      <section className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5E5DF]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#717682]">
                Scope of Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight mt-1">
                Included Deliverables
              </h2>
            </div>
            <p className="text-xs text-[#525763] max-w-sm">
              Every engagement includes verified execution, direct communication, and 100% full asset ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {detail.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E4E9] rounded-2xl p-6 flex flex-col justify-between hover:border-[#FACC15] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#717682] mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] px-2 py-0.5 rounded-full bg-[#FACC15]/15">
                      {item.tag || "Deliverable"}
                    </span>
                    <span className="font-mono font-bold text-[#A1A5B0]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#121418] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525763] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Simple 4-Stage Execution Roadmap ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Execution Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight mt-1">
              How We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E5E5DF]"
              >
                <div className="text-sm font-black text-[#D97706] mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#121418] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#525763] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Minimalist Service Audit Form ── */}
      <section
        id="service-audit-form"
        className="py-16 sm:py-24 bg-[#121418] text-white border-b border-[#242831] scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FACC15]">
              Direct Inquiries
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Request a Proposal for {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A5B0]">
              Tell us about your business in Oman. We'll review your scope and follow up promptly.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-[#10B981]/15 border border-[#10B981]/30 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 size={32} className="text-[#34D399] mx-auto" />
              <h3 className="text-lg font-bold text-[#34D399]">
                Inquiry Received Successfully
              </h3>
              <p className="text-xs text-[#A7F3D0] max-w-md mx-auto">
                Thank you. Our specialists in Muscat will review your requirements for {service.title} and reach out to you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-bold text-[#FACC15] underline cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuditSubmit} className="space-y-4">
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white">
                    Company Name <span className="text-[#FACC15]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Muscat Trading LLC"
                    className="w-full bg-[#1A1D24] border border-[#2B303C] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#717682] focus:outline-none focus:border-[#FACC15]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-white">
                    Phone Number <span className="text-[#FACC15]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+968 9xxx xxxx"
                    className="w-full bg-[#1A1D24] border border-[#2B303C] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#717682] focus:outline-none focus:border-[#FACC15]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white">
                    Website or Maps Link (optional)
                  </label>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#1A1D24] border border-[#2B303C] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#717682] focus:outline-none focus:border-[#FACC15]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-white">
                    Official Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@company.si"
                    className="w-full bg-[#1A1D24] border border-[#2B303C] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#717682] focus:outline-none focus:border-[#FACC15]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white">
                  Project Notes (optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share any specific goals or questions..."
                  className="w-full bg-[#1A1D24] border border-[#2B303C] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#717682] focus:outline-none focus:border-[#FACC15] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#121418] font-black text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Submitting..." : `Submit Request for ${service.title}`}</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── 7. Clean Service Switcher Pills ── */}
      <section className="py-12 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#717682] mb-4">
            Explore Other Services
          </div>

          <div className="flex flex-wrap gap-2.5">
            {allServices
              .filter((s) => s.id !== service.id)
              .map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectService(s)}
                  className="px-4 py-2.5 rounded-full bg-[#FAF9F5] border border-[#E5E5DF] hover:border-[#FACC15] hover:bg-white text-xs font-bold text-[#121418] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{s.title}</span>
                  <ArrowRight size={13} className="text-[#D97706]" />
                </button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
