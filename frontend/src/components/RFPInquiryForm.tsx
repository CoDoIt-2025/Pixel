import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Send,
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { api } from "../lib/api";
import { useSettings } from "../context/SettingsContext";

interface InquiryFormProps {
  prefillData?: {
    service: string;
    budget: string;
    message: string;
  } | null;
}

export const RFPInquiryForm: React.FC<InquiryFormProps> = ({ prefillData }) => {
  const { company } = useSettings();
  const [servicesList, setServicesList] = useState<string[]>([
    "Website Design",
    "SEO Services",
    "Google Business Profile Management",
    "Social Media Management",
    "AI Visibility Services",
    "Digital QR Menus",
  ]);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    emailOrPhone: "",
    market: "Oman",
    service: "Website Design",
    budget: "300 - 600 OMR",
    projectDetails: "",
    websiteUrl: "",
    marketingConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const budgetOptions = [
    "Under 300 OMR",
    "300 - 600 OMR",
    "600 - 1,200 OMR",
    "1,200+ OMR / Retainer",
  ];

  // Dynamically load services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        if (data && data.length > 0) {
          const visible = data.filter((s) => s.isVisible).map((s) => s.title);
          if (visible.length > 0) {
            setServicesList(visible);
            if (!formData.service || !visible.includes(formData.service)) {
              setFormData((prev) => ({ ...prev, service: visible[0] }));
            }
          }
        }
      } catch {
        // Fallback
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        service: prefillData.service || prev.service,
        budget: prefillData.budget || prev.budget,
        projectDetails: prefillData.message || prev.projectDetails,
      }));
    }
  }, [prefillData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!formData.emailOrPhone.trim()) {
      setErrorMsg(
        "Please provide either an email address or a phone number so we can reach you."
      );
      return;
    }

    if (!formData.projectDetails.trim()) {
      setErrorMsg("Please share a few details about your project requirements.");
      return;
    }

    setLoading(true);

    try {
      await api.submitInquiry({
        name: formData.name,
        email: formData.emailOrPhone.includes("@")
          ? formData.emailOrPhone
          : "phone-contact@pixel.dev",
        company: formData.businessName || "Not specified",
        service: `${formData.service} (${formData.market} Market)`,
        budget: formData.budget,
        message: `${formData.projectDetails}\n\n[Contact info: ${formData.emailOrPhone}]${
          formData.websiteUrl ? `\n[Website: ${formData.websiteUrl}]` : ""
        }`,
      });
      setSuccess(true);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F5C542", "#2B2D31", "#E5B532"],
      });
    } catch {
      setErrorMsg(
        "Your enquiry could not be sent. Please try again or use our verified contact details on the left."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#202124] text-[#F7F7F2] border-t border-[#45484E] relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Details & Verified Contacts from Settings */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2D31] border border-[#45484E] text-[#F5C542] text-xs font-semibold mb-4">
              <Sparkles size={13} className="text-[#F5C542] fill-[#F5C542]" />
              <span>Start the Conversation</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2] leading-tight">
              Tell us what your business needs
            </h2>

            <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
              Share a few details about your business and what you would like to improve. Whether you are planning a website, reviewing your visibility or exploring a digital menu, we can discuss a suitable starting point.
            </p>

            {/* Verified Contacts Box from Live Admin Settings */}
            <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-[#2B2D31] border border-[#45484E] space-y-4 shadow-xl card-hover-gold">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5C542] flex items-center gap-2">
                <span>Verified Business Details</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </h3>

              <div className="space-y-3 pt-2 text-xs text-[#C4C7CC]">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#F5C542] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F7F7F2] block">Operating Office:</strong>
                    <span>{company.address || "Muscat, Sultanate of Oman &bull; Supporting Thrissur, Kerala"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#F5C542] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F7F7F2] block">Direct Email:</strong>
                    <a
                      href={`mailto:${company.email || "contact@pixelbusiness.om"}`}
                      className="hover:text-[#F5C542] transition-colors"
                    >
                      {company.email || "contact@pixelbusiness.om"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-[#F5C542] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F7F7F2] block">Telephone:</strong>
                    <span>{company.phone || "+968 2400 0000"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#F5C542] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F7F7F2] block">Typical Response Time:</strong>
                    <span>Within 24 business hours (Sun &ndash; Thu)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat */}
              <div className="pt-4 border-t border-[#45484E]">
                <a
                  href="https://wa.me/96824000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#202124] border border-[#45484E] hover:border-[#F5C542] text-xs font-semibold text-[#F7F7F2] flex items-center justify-center gap-2 transition-all group"
                >
                  <MessageCircle size={15} className="text-[#F5C542] group-hover:scale-110 transition-transform" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#2B2D31]/50 border border-[#45484E] text-[11px] text-[#C4C7CC]">
              <em>Data Protection:</em> We use your contact details solely to reply to your inquiry. No aggressive unsolicited newsletters or third-party sharing.
            </div>
          </div>

          {/* Right Column: Interactive RFP Inquiry Form */}
          <div className="lg:col-span-7 bg-[#2B2D31] border border-[#45484E] rounded-3xl p-6 sm:p-9 shadow-2xl relative">
            {success ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#F5C542]/20 border border-[#F5C542] flex items-center justify-center text-[#F5C542] mx-auto mb-2">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#F7F7F2]">
                  Enquiry Received
                </h3>
                <p className="text-sm text-[#C4C7CC] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. We have logged your request and our team will review your requirements for the <strong>{formData.market}</strong> market within 24 business hours.
                </p>
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: "",
                        businessName: "",
                        emailOrPhone: "",
                        market: "Oman",
                        service: servicesList[0] || "Website Design",
                        budget: "300 - 600 OMR",
                        projectDetails: "",
                        websiteUrl: "",
                        marketingConsent: false,
                      });
                    }}
                    className="btn-secondary text-xs py-2 px-5"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                    <ShieldAlert size={16} className="text-red-400 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                      Your Name <span className="text-[#F5C542]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Al Balushi"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] focus:border-[#F5C542] text-sm text-[#F7F7F2] outline-none transition-colors"
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                      Business or Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Al Hajar Trading LLC"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] focus:border-[#F5C542] text-sm text-[#F7F7F2] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email or Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                      Email or Phone / WhatsApp <span className="text-[#F5C542]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+968 9000 0000 or email"
                      value={formData.emailOrPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, emailOrPhone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] focus:border-[#F5C542] text-sm text-[#F7F7F2] outline-none transition-colors"
                    />
                  </div>

                  {/* Existing Website */}
                  <div>
                    <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                      Existing Website (if any)
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteUrl: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] focus:border-[#F5C542] text-sm text-[#F7F7F2] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Primary Market Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                    Primary Market
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, market: "Oman" })}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        formData.market === "Oman"
                          ? "border-[#F5C542] bg-[#F5C542]/15 text-[#F7F7F2] ring-1 ring-[#F5C542]"
                          : "border-[#45484E] bg-[#202124] text-[#C4C7CC]"
                      }`}
                    >
                      <strong className="block text-[#F7F7F2]">Sultanate of Oman</strong>
                      <span className="text-[10px] text-[#C4C7CC]">Primary Focus</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, market: "Thrissur, Kerala" })
                      }
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        formData.market === "Thrissur, Kerala"
                          ? "border-[#F5C542] bg-[#F5C542]/15 text-[#F7F7F2] ring-1 ring-[#F5C542]"
                          : "border-[#45484E] bg-[#202124] text-[#C4C7CC]"
                      }`}
                    >
                      <strong className="block text-[#F7F7F2]">Thrissur, Kerala</strong>
                      <span className="text-[10px] text-[#C4C7CC]">Secondary Market</span>
                    </button>
                  </div>
                </div>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] focus:border-[#F5C542] text-sm text-[#F7F7F2] outline-none"
                  >
                    {servicesList.map((srv, idx) => (
                      <option key={idx} value={srv} className="bg-[#202124] text-[#F7F7F2]">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimated Budget Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                    Estimated Budget Tier
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: opt })}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center whitespace-nowrap ${
                          formData.budget === opt
                            ? "bg-[#F5C542] text-[#202124] border-[#F5C542] font-bold shadow-sm"
                            : "bg-[#202124] text-[#C4C7CC] border-[#45484E] hover:border-[#F5C542]/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-bold text-[#F7F7F2] uppercase tracking-wider mb-2">
                    Project Details &bull; What do you want to achieve?{" "}
                    <span className="text-[#F5C542]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your services, current challenge, or what you want to improve..."
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData({ ...formData, projectDetails: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] focus:border-[#F5C542] text-sm text-[#F7F7F2] outline-none transition-colors"
                  />
                </div>

                {/* Yellow button with charcoal text */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-sm font-bold shadow-lg shadow-[#F5C542]/20 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting enquiry...</span>
                  ) : (
                    <>
                      <span>Send inquiry &bull; Discuss project</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
