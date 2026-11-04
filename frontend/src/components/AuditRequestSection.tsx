import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { api } from "../lib/api";

export const AuditRequestSection: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [googleMapsNA, setGoogleMapsNA] = useState(false);
  const [websiteLink, setWebsiteLink] = useState("");
  const [websiteNA, setWebsiteNA] = useState(false);
  const [socialMediaLinks, setSocialMediaLinks] = useState("");
  const [socialMediaNA, setSocialMediaNA] = useState(false);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!companyName.trim()) {
      setErrorMsg("Please enter your company name.");
      return;
    }

    if (!phoneNumber.trim()) {
      setErrorMsg("Please enter your phone number so our team can reach you.");
      return;
    }

    setLoading(true);

    try {
      await api.submitAuditRequest({
        company_name: companyName.trim(),
        phone_number: phoneNumber.trim(),
        google_maps_link: googleMapsNA ? "" : googleMapsLink.trim(),
        google_maps_na: googleMapsNA,
        website_link: websiteNA ? "" : websiteLink.trim(),
        website_na: websiteNA,
        social_media_links: socialMediaNA ? "" : socialMediaLinks.trim(),
        social_media_na: socialMediaNA,
        email: email.trim(),
      });

      setSuccess(true);
      // Reset form
      setCompanyName("");
      setPhoneNumber("");
      setGoogleMapsLink("");
      setGoogleMapsNA(false);
      setWebsiteLink("");
      setWebsiteNA(false);
      setSocialMediaLinks("");
      setSocialMediaNA(false);
      setEmail("");
    } catch (err: any) {
      console.error("Audit request error:", err);
      setErrorMsg(
        err.message || "Failed to submit your audit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="audit-request"
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 text-[#121418] border-b border-[#E5E5DF]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121418]">
              {/* Desktop heading */}
              <span className="hidden sm:inline">Request a digital presence audit</span>
              {/* Mobile heading */}
              <span className="inline sm:hidden">Request an audit</span>
            </h2>
            <span className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-[#525763] italic">
            Add the links you have.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {success && (
          <div className="mb-8 bg-[#ECFDF5] border border-[#10B981]/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0 text-[#047857]">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#065F46]">
                Audit Request Submitted Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-[#047857] mt-1 leading-relaxed">
                Thank you. Our digital presence specialists in Muscat will review your business profiles, website, and search visibility, and share actionable findings with you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-3 text-xs font-bold text-[#065F46] underline hover:text-[#047857] cursor-pointer"
              >
                Submit another audit request
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 text-xs sm:text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Desktop 2-Column Grid (Image 1) */}
          <div className="hidden sm:grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1, Col 1: Company Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="company-name"
                className="block text-xs sm:text-sm font-bold text-[#121418]"
              >
                Company name
              </label>
              <input
                id="company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Muscat Trading LLC"
                className="w-full bg-white border border-[#D5D8E0] rounded-xl px-4 py-3 text-sm text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 transition-all shadow-xs"
              />
            </div>

            {/* Row 1, Col 2: Phone Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone-number"
                className="block text-xs sm:text-sm font-bold text-[#121418]"
              >
                Phone number
              </label>
              <input
                id="phone-number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+968 9693 5606"
                className="w-full bg-white border border-[#D5D8E0] rounded-xl px-4 py-3 text-sm text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 transition-all shadow-xs"
              />
            </div>

            {/* Row 2, Col 1: Google Business Profile / Maps Link + [ ] Not available */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="maps-link"
                  className="block text-xs sm:text-sm font-bold text-[#121418]"
                >
                  Google Business Profile / Maps link
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#525763] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={googleMapsNA}
                    onChange={(e) => setGoogleMapsNA(e.target.checked)}
                    className="w-4 h-4 accent-[#FACC15] rounded cursor-pointer"
                  />
                  <span>Not available</span>
                </label>
              </div>
              <input
                id="maps-link"
                type="text"
                disabled={googleMapsNA}
                value={googleMapsNA ? "Not available" : googleMapsLink}
                onChange={(e) => setGoogleMapsLink(e.target.value)}
                placeholder="https://maps.google.com/..."
                className={`w-full border rounded-xl px-4 py-3 text-sm transition-all shadow-xs ${
                  googleMapsNA
                    ? "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed italic"
                    : "bg-white border-[#D5D8E0] text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20"
                }`}
              />
            </div>

            {/* Row 2, Col 2: Website + [ ] Not available */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="website-link"
                  className="block text-xs sm:text-sm font-bold text-[#121418]"
                >
                  Website
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#525763] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={websiteNA}
                    onChange={(e) => setWebsiteNA(e.target.checked)}
                    className="w-4 h-4 accent-[#FACC15] rounded cursor-pointer"
                  />
                  <span>Not available</span>
                </label>
              </div>
              <input
                id="website-link"
                type="text"
                disabled={websiteNA}
                value={websiteNA ? "Not available" : websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
                placeholder="https://yourwebsite.com"
                className={`w-full border rounded-xl px-4 py-3 text-sm transition-all shadow-xs ${
                  websiteNA
                    ? "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed italic"
                    : "bg-white border-[#D5D8E0] text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20"
                }`}
              />
            </div>

            {/* Row 3, Col 1: Social Media Links + [ ] Not available */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="social-links"
                  className="block text-xs sm:text-sm font-bold text-[#121418]"
                >
                  Social media links
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#525763] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={socialMediaNA}
                    onChange={(e) => setSocialMediaNA(e.target.checked)}
                    className="w-4 h-4 accent-[#FACC15] rounded cursor-pointer"
                  />
                  <span>Not available</span>
                </label>
              </div>
              <input
                id="social-links"
                type="text"
                disabled={socialMediaNA}
                value={socialMediaNA ? "Not available" : socialMediaLinks}
                onChange={(e) => setSocialMediaLinks(e.target.value)}
                placeholder="Instagram, LinkedIn, Facebook..."
                className={`w-full border rounded-xl px-4 py-3 text-sm transition-all shadow-xs ${
                  socialMediaNA
                    ? "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed italic"
                    : "bg-white border-[#D5D8E0] text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20"
                }`}
              />
            </div>

            {/* Row 3, Col 2: Email (optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="email-optional"
                className="block text-xs sm:text-sm font-bold text-[#121418]"
              >
                Email (optional)
              </label>
              <input
                id="email-optional"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@company.om"
                className="w-full bg-white border border-[#D5D8E0] rounded-xl px-4 py-3 text-sm text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Mobile Stacked Form (Image 2) */}
          <div className="sm:hidden space-y-4">
            {/* 1. Company Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#121418]">
                Company name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name"
                className="w-full bg-white border border-[#D5D8E0] rounded-xl px-3.5 py-2.5 text-sm text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15]"
              />
            </div>

            {/* 2. Google Business Profile / Maps link */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#121418]">
                  Google Business Profile / Maps link
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#525763] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={googleMapsNA}
                    onChange={(e) => setGoogleMapsNA(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#FACC15] rounded cursor-pointer"
                  />
                  <span>Not available</span>
                </label>
              </div>
              <input
                type="text"
                disabled={googleMapsNA}
                value={googleMapsNA ? "Not available" : googleMapsLink}
                onChange={(e) => setGoogleMapsLink(e.target.value)}
                placeholder="https://maps.google.com/..."
                className={`w-full border rounded-xl px-3.5 py-2.5 text-sm ${
                  googleMapsNA
                    ? "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] italic"
                    : "bg-white border-[#D5D8E0] text-[#121418]"
                }`}
              />
            </div>

            {/* 3. Website */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#121418]">
                  Website
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#525763] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={websiteNA}
                    onChange={(e) => setWebsiteNA(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#FACC15] rounded cursor-pointer"
                  />
                  <span>Not available</span>
                </label>
              </div>
              <input
                type="text"
                disabled={websiteNA}
                value={websiteNA ? "Not available" : websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
                placeholder="https://..."
                className={`w-full border rounded-xl px-3.5 py-2.5 text-sm ${
                  websiteNA
                    ? "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] italic"
                    : "bg-white border-[#D5D8E0] text-[#121418]"
                }`}
              />
            </div>

            {/* 4. Social media links */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#121418]">
                  Social media links
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#525763] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={socialMediaNA}
                    onChange={(e) => setSocialMediaNA(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#FACC15] rounded cursor-pointer"
                  />
                  <span>Not available</span>
                </label>
              </div>
              <input
                type="text"
                disabled={socialMediaNA}
                value={socialMediaNA ? "Not available" : socialMediaLinks}
                onChange={(e) => setSocialMediaLinks(e.target.value)}
                placeholder="Instagram, Facebook..."
                className={`w-full border rounded-xl px-3.5 py-2.5 text-sm ${
                  socialMediaNA
                    ? "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] italic"
                    : "bg-white border-[#D5D8E0] text-[#121418]"
                }`}
              />
            </div>

            {/* 5. Phone number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#121418]">
                Phone number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+968 ..."
                className="w-full bg-white border border-[#D5D8E0] rounded-xl px-3.5 py-2.5 text-sm text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15]"
              />
            </div>

            {/* 6. Email (optional) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#121418]">
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-white border border-[#D5D8E0] rounded-xl px-3.5 py-2.5 text-sm text-[#121418] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FACC15]"
              />
            </div>
          </div>

          {/* Submit Button (Full width or centered block in solid yellow) */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto sm:min-w-[340px] bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-extrabold text-sm sm:text-base py-3.5 px-8 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-[0_4px_16px_rgba(250,204,21,0.3)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-[#121418]" />
                  <span>Submitting request...</span>
                </>
              ) : (
                <span>Submit audit request</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

