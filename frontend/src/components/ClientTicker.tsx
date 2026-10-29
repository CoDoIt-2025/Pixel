import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { api } from "../lib/api";
import type { Client, Service } from "../types";

interface TickerItem {
  label: string;
  desc: string;
  type: "primary" | "secondary" | "service";
}

const DEFAULT_LOCATIONS: TickerItem[] = [
  { label: "Muscat, Oman", desc: "Capital & Commercial Hub", type: "primary" },
  { label: "Salalah, Dhofar", desc: "Hospitality & Tourism Businesses", type: "primary" },
  { label: "Sohar & Nizwa", desc: "Local Business Presence", type: "primary" },
  { label: "Thrissur, Kerala", desc: "Artisanal & Regional Businesses", type: "secondary" },
];

export const ClientTicker: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>(DEFAULT_LOCATIONS);

  const loadData = async () => {
    try {
      const [clientsData, servicesData] = await Promise.all([
        api.getClients().catch(() => [] as Client[]),
        api.getServices().catch(() => [] as Service[]),
      ]);

      const dynamicList: TickerItem[] = [];

      // Add Clients from Admin database
      if (clientsData && clientsData.length > 0) {
        clientsData.forEach((c) => {
          dynamicList.push({
            label: c.company,
            desc: c.location ? `${c.location} • ${c.industry || "Client"}` : c.industry || "Active Partner",
            type: "primary",
          });
        });
      }

      // Add Services from Admin database
      if (servicesData && servicesData.length > 0) {
        servicesData.filter((s) => s.isVisible).forEach((s) => {
          dynamicList.push({
            label: s.title,
            desc: s.category || "Service",
            type: "service",
          });
        });
      }

      // Blend with regional locations if list is small
      if (dynamicList.length < 5) {
        setItems([...dynamicList, ...DEFAULT_LOCATIONS]);
      } else {
        setItems(dynamicList);
      }
    } catch {
      // Fallback
      setItems(DEFAULT_LOCATIONS);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("focus", loadData);
    const interval = setInterval(loadData, 5000);

    return () => {
      window.removeEventListener("focus", loadData);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-12 border-y border-[#45484E] bg-[#2B2D31] text-[#F7F7F2] overflow-hidden select-none">
      {/* Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#2B2D31] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#2B2D31] to-transparent z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-6 text-center">
        <p className="text-xs font-semibold text-[#F5C542] uppercase tracking-widest flex items-center justify-center gap-2">
          <MapPin size={14} className="text-[#F5C542]" />
          <span>Live Partner Network &bull; Oman Primary Focus &bull; Supporting Thrissur</span>
        </p>
      </div>

      <div className="animate-marquee flex items-center gap-5">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-5 py-3 rounded-lg border backdrop-blur-sm flex items-center gap-3 transition-colors ${item.type === "primary"
              ? "border-[#F5C542]/50 bg-[#202124] text-[#F7F7F2]"
              : item.type === "secondary"
                ? "border-[#45484E] bg-[#202124] text-[#F7F7F2]"
                : "border-[#45484E] bg-[#202124]/70 text-[#C4C7CC]"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${item.type === "primary"
                ? "bg-[#F5C542]"
                : item.type === "secondary"
                  ? "bg-emerald-400"
                  : "bg-[#C4C7CC]"
                }`}
            />
            <div>
              <span className="text-xs font-semibold text-[#F7F7F2] block">
                {item.label}
              </span>
              <span className="text-[11px] text-[#C4C7CC] block">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
