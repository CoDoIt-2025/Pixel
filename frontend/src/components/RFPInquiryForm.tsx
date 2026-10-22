import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, ShieldAlert, Phone, MapPin } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "Enterprise AI & LLM Systems",
    budget: "$60,000 - $100,000",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        service: prefillData.service || prev.service,
        budget: prefillData.budget || prev.budget,
        message: prefillData.message || prev.message,
      }));
    }
  }, [prefillData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await api.submitInquiry(formData);
      setSuccess(true);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0F172A", "#64748B", "#94A3B8"],
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit proposal. Please verify the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Contact
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
              Let&apos;s build something exceptional.
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              We review every inquiry within 24 business hours. If you prefer direct correspondence, reach our principals at{" "}
              <a href={`mailto:${company.email}`} className="text-slate-950 font-medium underline underline-offset-4">
                {company.email}
              </a>
              {company.phone && (
                <> or call <span className="text-slate-950 font-medium">{company.phone}</span></>
              )}.
            </p>

            {company.address && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span>{company.address}</span>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>NDA &amp; full IP assignment on Day 1</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Fixed-scope milestone guarantees</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Zero outsourced development</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl border border-slate-200/80 bg-slate-50/50 shadow-2xs">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-950 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-950">
                  Message received
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A partner will review your project brief and follow up shortly.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "Enterprise AI & LLM Systems",
                        budget: "$60,000 - $100,000",
                        message: "",
                      });
                    }}
                    className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-xs font-medium"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
                    <ShieldAlert size={15} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Patrick Collison"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="patrick@stripe.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Stripe, Linear, etc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1.5">
                      Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-colors"
                    >
                      <option value="Enterprise AI & LLM Systems">AI &amp; LLM Systems</option>
                      <option value="Enterprise Web Applications">Web Applications</option>
                      <option value="Cloud & Distributed Infrastructure">Cloud Infrastructure</option>
                      <option value="Design Systems & UX Architecture">Design Systems</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Estimated Budget Range
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Project Goals / Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what you're building, target timeline, and any technical constraints..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-tight transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send inquiry</span>
                      <Send size={13} />
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
