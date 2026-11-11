import React from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import type { ServiceItem } from "../data/servicesData";

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestAudit: () => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  onClose,
  onRequestAudit,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#1E2128] border border-[#373A43] text-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#323640]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FACC15]">
              {service.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#2B2F3A] hover:bg-[#383D4B] text-[#C4C7CC] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 overflow-y-auto space-y-5 pr-1">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A1A5B0] mb-2">
              Overview
            </h4>
            <p className="text-sm text-[#D1D5DB] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A1A5B0] mb-3">
              Included Deliverables & Strategy
            </h4>
            <div className="space-y-2.5">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-[#FACC15] shrink-0 mt-0.5"
                  />
                  <span className="text-xs sm:text-sm text-[#D1D5DB]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="pt-4 border-t border-[#323640] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#A1A5B0] hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestAudit();
            }}
            className="w-full sm:w-auto bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Audit for this Service</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
