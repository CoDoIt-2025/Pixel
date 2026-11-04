import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  Compass,
  Briefcase,
  Building2,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";
import { SERVICE_COMPANY_DETAILS } from "../data/serviceCompanyDetails";
import { HeroIllustration } from "./HeroIllustration";
import { api } from "../lib/api";

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
    SERVICE_COMPANY_DETAILS["website-design-development"];

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

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

  const toggleFaq = (idx: number) => {
    setExpandedFaqIndex((prev) => (prev === idx ? null : idx));
  };

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
        social_media_links: notes ? `Inquiry for ${service.title} - Notes: ${notes}` : `Direct Inquiry for: ${service.title}`,
      });

      setSubmitSuccess(true);
      setCompanyName("");
      setPhoneNumber("");
      setWebsiteUrl("");
      setEmail("");
      setNotes("");
    } catch (err: any) {
      setSubmitError(
        err.message || "Failed to submit request. Please reach us at +968 9693 5606."
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
    <div className="w-full bg-[#FAF9F5] text-[#121418] min-h-screen">
      {/* 1. Sticky Navigation & Breadcrumbs Bar */}
      <div className="bg-[#121418] border-b border-[#242831] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E2128] hover:bg-[#2A2F3B] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-[#323640]"
            >
              <ArrowLeft size={16} className="text-[#FACC15]" />
              <span>Back to all services</span>
            </button>

            {/* Breadcrumb (Desktop) */}
            <div className="hidden md:flex items-center gap-2 text-xs text-[#9CA3AF]">
              <span>/</span>
              <span className="text-[#9CA3AF]">Services</span>
              <span>/</span>
              <span className="text-white font-medium truncate max-w-xs">
                {service.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/96896935606?text=Hello%20Pixel%20Business%20Solutions,%20I%20am%20inquiring%20about%20your%20service:%20"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 text-xs font-bold border border-[#25D366]/30 transition-colors"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={scrollToAuditForm}
              className="bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-bold text-xs sm:text-sm px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              Request Service Audit
            </button>
          </div>
        </div>
      </div>

      {/* 2. Service Hero Section (Dark High-Impact Theme) */}
      <section className="bg-[#121418] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-[#242831] relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Corporate Pitch & Metrics */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-5">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2128] border border-[#373A43] text-xs font-semibold text-[#FACC15]">
                <Sparkles size={13} className="text-[#FACC15]" />
                <span>{detail.heroBadge}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="mt-3 text-lg sm:text-xl font-semibold text-[#FACC15] leading-snug">
                  {detail.tagline}
                </p>
              </div>

              {/* Executive Summary */}
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                {detail.executiveSummary}
              </p>

              {/* 4 Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2">
                {detail.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#1A1D24] border border-[#2B2F3A] rounded-xl text-left"
                  >
                    <div className="text-lg sm:text-xl font-black text-[#FACC15]">
                      {metric.value}
                    </div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider mt-0.5">
                      {metric.label}
                    </div>
                    {metric.subtext && (
                      <div className="text-[10px] text-[#9CA3AF] mt-0.5 truncate">
                        {metric.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <button
                  onClick={scrollToAuditForm}
                  className="bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Free Service Audit</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="tel:+96896935606"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E2128] hover:bg-[#2B2F3A] text-white text-sm font-semibold border border-[#323640] transition-colors"
                >
                  <Phone size={16} className="text-[#FACC15]" />
                  <span>Call Muscat (+968 9693 5606)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Media Illustration / Video / Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-[#181B22] border border-[#2B2F3A] rounded-2xl p-6 shadow-2xl relative">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#A1A5B0] mb-3 flex items-center justify-between">
                  <span>Live Agency System</span>
                  <span className="flex items-center gap-1.5 text-[#22C55E]">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    Active in Oman
                  </span>
                </div>

                <div className="flex justify-center">
                  <HeroIllustration
                    type={service.illustrationType}
                    bannerImage={service.bannerImage}
                    bannerVideo={service.bannerVideo}
                    mediaType={service.mediaType}
                    title={service.title}
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A2D37] flex items-center justify-between text-[11px] text-[#A1A5B0]">
                  <span>Sultanate of Oman</span>
                  <span className="text-[#FACC15] font-semibold">Pixel Business Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Businesses in Oman Need This */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-2">
              <Building2 size={20} className="text-[#D97706]" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
                Oman Commercial Perspective
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight">
              {detail.whyOmanMatters.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#525763] leading-relaxed">
              {detail.whyOmanMatters.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {detail.whyOmanMatters.points.map((point, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E5DF] flex items-start gap-3.5 hover:border-[#FACC15] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#FACC15]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={18} className="text-[#B45309]" />
                </div>
                <p className="text-xs sm:text-sm text-[#121418] font-medium leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Scope & Deliverables (6 Structured Deliverables) */}
      <section className="py-12 sm:py-16 bg-[#FAF9F5] border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <Layers size={20} className="text-[#121418]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#717682]">
                  Scope of Work
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight">
                Included Deliverables & Strategic Scope
              </h2>
            </div>
            <span className="hidden sm:inline-block w-16 h-1.5 bg-[#FACC15] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {detail.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E4E9] rounded-2xl p-5 hover:border-[#FACC15] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FACC15]/20 text-[#92400E]">
                      {item.tag || "Deliverable"}
                    </span>
                    <span className="text-xs font-bold text-[#A1A5B0]">
                      #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#121418] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#525763] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0F0EB] flex items-center gap-1.5 text-xs font-semibold text-[#121418]">
                  <CheckCircle2 size={14} className="text-[#16A34A]" />
                  <span>Guaranteed Execution</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 4-Stage Agency Execution Process */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
              Methodology & Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight mt-1">
              Our 4-Stage Execution Framework
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#525763]">
              How Pixel Business Solutions delivers measurable results from contract signing to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-[#FAF9F5] border border-[#E5E5DF] rounded-2xl p-5 hover:border-[#FACC15] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#121418] text-[#FACC15] font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  {step.step}
                </div>
                <h3 className="font-extrabold text-base text-[#121418] leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-[#525763] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technologies & Ideal Clients */}
      <section className="py-12 sm:py-16 bg-[#FAF9F5] border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Ideal For in Oman */}
            <div className="lg:col-span-6 bg-white border border-[#E2E4E9] rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={20} className="text-[#121418]" />
                <h3 className="font-black text-lg text-[#121418]">
                  Ideal For Businesses in Oman
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#525763] mb-4">
                This solution is specifically calibrated for companies operating across the Sultanate of Oman:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {detail.idealFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E5E5DF] text-xs font-semibold text-[#121418]"
                  >
                    <CheckCircle2 size={15} className="text-[#16A34A] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technologies & Standards */}
            <div className="lg:col-span-6 bg-white border border-[#E2E4E9] rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Compass size={20} className="text-[#121418]" />
                <h3 className="font-black text-lg text-[#121418]">
                  Technologies, Tools & Standards
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#525763] mb-4">
                We leverage enterprise-grade industry platforms, modern code standards, and certified APIs:
              </p>
              <div className="flex flex-wrap gap-2">
                {detail.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#D5D8E0] text-xs font-bold text-[#121418]"
                  >
                    <ShieldCheck size={14} className="text-[#D97706]" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (Accordion) */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
              Clarity & Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#525763]">
              Clear answers regarding pricing, implementation timelines, and Oman regulatory compliance.
            </p>
          </div>

          <div className="space-y-3">
            {detail.faqs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E2E4E9] rounded-2xl overflow-hidden transition-all bg-[#FAF9F5]"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#121418] hover:text-[#B45309] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-[#FACC15] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#717682] shrink-0 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#525763] leading-relaxed border-t border-[#E5E5DF] bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Dedicated Service Audit & Quote Request Form */}
      <section
        id="service-audit-form"
        className="py-12 sm:py-16 bg-[#FAF9F5] border-b border-[#E5E5DF]"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#D5D8E0] rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="text-center mb-8">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FACC15]/20 text-[#92400E]">
                Direct Service Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#121418] tracking-tight mt-2">
                Request an Audit for {service.title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#525763]">
                Our Muscat technical team will review your digital footprint and provide an executive proposal within 24 business hours.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] text-center space-y-3">
                <CheckCircle2 size={36} className="text-[#16A34A] mx-auto" />
                <h3 className="font-black text-lg text-[#166534]">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#14532D]">
                  Thank you. An agency lead from Pixel Business Solutions LLC in Muscat will review your details and contact you via phone / WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-3 px-5 py-2 bg-[#166534] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#14532D] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#121418] mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al Noor Medical LLC"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D8E0] bg-[#FAF9F5] text-xs sm:text-sm text-[#121418] focus:border-[#FACC15] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#121418] mb-1">
                      Phone Number (Oman / GCC) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+968 9xxx xxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D8E0] bg-[#FAF9F5] text-xs sm:text-sm text-[#121418] focus:border-[#FACC15] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#121418] mb-1">
                      Website URL or Google Maps Link
                    </label>
                    <input
                      type="text"
                      placeholder="https://yourwebsite.com or Maps link"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D8E0] bg-[#FAF9F5] text-xs sm:text-sm text-[#121418] focus:border-[#FACC15] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#121418] mb-1">
                      Official Email (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="contact@company.om"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D8E0] bg-[#FAF9F5] text-xs sm:text-sm text-[#121418] focus:border-[#FACC15] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121418] mb-1">
                    Specific Requirements or Questions (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current challenges, target audience, or specific objectives in Oman..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D8E0] bg-[#FAF9F5] text-xs sm:text-sm text-[#121418] focus:border-[#FACC15] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit Request for {service.title}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. Explore Other Services Switcher */}
      <section className="py-10 bg-white border-b border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-black text-[#121418]">
              Explore Other Specialized Solutions
            </h3>
            <span className="text-xs text-[#717682]">
              Switch to any of our 9 services
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {allServices
              .filter((s) => s.id !== service.id)
              .map((other) => (
                <button
                  key={other.id}
                  onClick={() => onSelectService(other)}
                  className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E5DF] hover:border-[#FACC15] hover:bg-white text-left transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-bold text-[#121418] line-clamp-2 leading-tight group-hover:text-[#B45309]">
                    {other.title}
                  </div>
                  <div className="text-[10px] text-[#A1A5B0] mt-1 flex items-center gap-1">
                    <span>View</span>
                    <ArrowRight size={10} />
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

