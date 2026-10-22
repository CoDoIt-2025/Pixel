import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, ShieldAlert } from "lucide-react";
import { api } from "../lib/api";
import { sound } from "../lib/sound";

interface InquiryFormProps {
  prefillData?: {
    service: string;
    budget: string;
    message: string;
  } | null;
}

export const RFPInquiryForm: React.FC<InquiryFormProps> = ({ prefillData }) => {
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

  // Sync prefill from Scope Calculator
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
    sound.tactile();

    try {
      await api.submitInquiry(formData);
      setSuccess(true);
      sound.click();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFFFFF", "#CCCCCC", "#666666", "#222222"],
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit proposal. Please verify the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquire" className="py-28 border-b border-white/10 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              <span>INDEX // 05</span>
            </div>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              INITIATE <br />COMMISSION
            </h2>

            <p className="font-body text-zinc-400 text-sm leading-relaxed">
              We review submissions within 24 hours. For urgent enterprise RFPs, direct technical briefs can be transmitted directly to our partners at{" "}
              <a href="mailto:partnerships@pixel.dev" className="text-white underline underline-offset-4">
                partnerships@pixel.dev
              </a>.
            </p>

            <div className="pt-6 border-t border-white/10 space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>NDA &amp; IP Assignment on Day 1</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Fixed-Fee Milestone Guarantees</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero Outsourced Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive RFP Form */}
          <div className="lg:col-span-7 border border-white/15 bg-black p-8 sm:p-10">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 border border-white bg-white/5 rounded-full flex items-center justify-center mx-auto text-white">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been committed to our SQLite ledger and routed to the lead architecture committee. We will contact you shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
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
                    className="px-6 py-2.5 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/5"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 border border-rose-500/30 bg-rose-500/10 text-rose-300 font-mono text-xs flex items-center gap-2">
                    <ShieldAlert size={15} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
                      LEAD CONTACT NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patrick Collison"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
                      CORPORATE EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="patrick@stripe.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
                      ENTERPRISE / ENTITY
                    </label>
                    <input
                      type="text"
                      placeholder="Stripe, Razorpay, Linear, etc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
                      PRIMARY ARCHITECTURE
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Enterprise AI & LLM Systems">Enterprise AI &amp; LLM Systems</option>
                      <option value="Enterprise Web Applications">Enterprise Web Applications</option>
                      <option value="Cloud & Distributed Infrastructure">Cloud &amp; Distributed Infrastructure</option>
                      <option value="Design Systems & UX Architecture">Design Systems &amp; UX Architecture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
                    ALLOCATED INVESTMENT RANGE
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
                    PROJECT SPECIFICATIONS / GOALS *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your technical objectives, target deadlines, and infrastructure constraints..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-white text-black font-tech font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT COMMISSION BRIEF</span>
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
