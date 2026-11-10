import React from "react";
import {
  MapPin,
  Search,
  Cpu,
  Monitor,
  Layers,
  MessageSquare,
  Megaphone,
  Film,
  QrCode,
  ArrowUpRight,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";

interface ServicesSectionProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

/** Icon renderer with inline color */
const ServiceIcon: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
  const props = { size: 24, strokeWidth: 1.7, style: { color } };
  switch (iconName) {
    case "MapPin": return <MapPin {...props} />;
    case "Search": return <Search {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Monitor": return <Monitor {...props} />;
    case "Layers": return <Layers {...props} />;
    case "MessageSquare": return <MessageSquare {...props} />;
    case "Megaphone": return <Megaphone {...props} />;
    case "Film": return <Film {...props} />;
    case "QrCode": return <QrCode {...props} />;
    default: return <MapPin {...props} />;
  }
};

/**
 * Clean 2-Tone Alternating Palette:
 * 0: Deep Black
 * 1: Crisp Pure White
 */
const PALETTE = [
  // 0: Black tile
  {
    bg: "#111317",
    hover: "#1A1D24",
    text: "#FFFFFF",
    icon: "#FACC15",
    sub: "#9CA3AF",
    border: "#242831",
    iconBg: "rgba(250, 204, 21, 0.14)",
  },
  // 1: White tile
  {
    bg: "#FFFFFF",
    hover: "#F4F4EE",
    text: "#111317",
    icon: "#111317",
    sub: "#525763",
    border: "#E2E4E9",
    iconBg: "rgba(17, 19, 23, 0.08)",
  },
];

/** Panel with JS hover state */
const Panel: React.FC<{
  bg: string;
  hover: string;
  border: string;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ bg, hover, border, onClick, title, children }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 0%",
        minWidth: 0,
        backgroundColor: hov ? hover : bg,
        borderRight: `1px solid ${border}`,
        transition: "background-color 0.18s ease, transform 0.18s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        position: "relative",
      }}
      className="text-left cursor-pointer select-none group"
    >
      {children}
    </button>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
}) => {
  return (
    <section id="services" style={{ backgroundColor: "#0E1014" }}>
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-7">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Our Services
          </h2>
          <span
            className="w-10 h-1.5 rounded-full"
            style={{ backgroundColor: "#FACC15", display: "inline-block" }}
          />
        </div>
        <p className="text-sm" style={{ color: "#717682" }}>
          Click any service to explore its full scope &amp; details.
        </p>
      </div>

      {/* ── Horizontal Panel Row (Alternating Black / White) ── */}
      <div
        style={{ borderTop: "1px solid #242831", borderBottom: "1px solid #242831" }}
        className="flex overflow-x-auto"
      >
        {services.map((service, index) => {
          const isActive = index === selectedIndex;
          // Strictly alternate Black (even index) and White (odd index)
          const pal = isActive
            ? {
                bg: "#FACC15",
                hover: "#EDB800",
                text: "#111317",
                icon: "#111317",
                sub: "#5A4700",
                border: "#EDB800",
                iconBg: "rgba(0, 0, 0, 0.12)",
              }
            : PALETTE[index % 2];

          return (
            <Panel
              key={service.id}
              bg={pal.bg}
              hover={pal.hover}
              border={pal.border}
              onClick={() => {
                onSelectService(index);
                onOpenServiceDetails(service);
              }}
              title={`Open ${service.title}`}
            >
              <div
                className="flex flex-col h-full px-4 py-6 sm:px-5 sm:py-7"
                style={{ minWidth: 155 }}
              >
                {/* Icon Container */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: pal.iconBg }}
                >
                  <ServiceIcon iconName={service.iconName} color={pal.icon} />
                </div>

                {/* Service Title */}
                <div
                  className="font-bold text-sm leading-snug mb-1 flex-1"
                  style={{ color: pal.text }}
                >
                  {service.title}
                </div>

                {/* Subtext */}
                {service.subtext && (
                  <div
                    className="text-[10px] font-semibold tracking-widest uppercase mb-3 line-clamp-1"
                    style={{ color: pal.sub }}
                  >
                    {service.subtext}
                  </div>
                )}

                {/* Category (desktop only) */}
                <div
                  className="text-[10px] mb-4 hidden sm:block truncate"
                  style={{ color: pal.sub }}
                >
                  {service.category}
                </div>

                {/* Arrow */}
                <div
                  style={{ color: pal.icon }}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <ArrowUpRight size={17} />
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      <div style={{ height: 1, backgroundColor: "#242831" }} />
    </section>
  );
};
