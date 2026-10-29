import React, { useState, useEffect } from "react";
import {
  QrCode,
  Smartphone,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { api } from "../lib/api";
import type { Project } from "../types";

interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  category: "starters" | "mains" | "beverages";
  description: string;
  priceOmr: number;
  priceOmrStr: string;
  tag?: string;
}

const SAMPLE_DISHES: MenuItem[] = [
  {
    id: "d1",
    name: "Traditional Omani Shuwa",
    nameAr: "شواء عماني تقليدي",
    category: "mains",
    description:
      "Slow-roasted marinated tender beef with aromatic Omani spices, served with fragrant basmati saffron rice.",
    priceOmr: 4.8,
    priceOmrStr: "4.800 OMR",
    tag: "House Special",
  },
  {
    id: "d2",
    name: "Grilled Coastal Hamour",
    nameAr: "هامور مشوي على الفحم",
    category: "mains",
    description:
      "Fresh Arabian Gulf Hamour fillet seasoned with fresh coriander, lime, and served with roasted garlic potatoes.",
    priceOmr: 5.2,
    priceOmrStr: "5.200 OMR",
    tag: "Fresh Catch",
  },
  {
    id: "d3",
    name: "Muscat Cold Mezze Platter",
    nameAr: "مزة باردة مسقط",
    category: "starters",
    description:
      "Artisanal hummus, mutabbal, tabbouleh, stuffed vine leaves served with warm house-baked khobz bread.",
    priceOmr: 2.4,
    priceOmrStr: "2.400 OMR",
    tag: "Vegetarian",
  },
  {
    id: "d4",
    name: "Sambosa & Omani Lentil Soup",
    nameAr: "سمبوسة وشوربة عدس",
    category: "starters",
    description:
      "Crispy beef & vegetable pastry parcels paired with warm cumin-scented red lentil soup.",
    priceOmr: 1.8,
    priceOmrStr: "1.800 OMR",
  },
  {
    id: "d5",
    name: "Omani Halwa with Cardamom Qahwa",
    nameAr: "حلوى عمانية مع قهوة بالهيل",
    category: "beverages",
    description:
      "Warm saffron and almond halwa paired with freshly poured Arabic coffee in a traditional finjan cup.",
    priceOmr: 1.6,
    priceOmrStr: "1.600 OMR",
    tag: "Traditional",
  },
  {
    id: "d6",
    name: "Saffron Karak Tea",
    nameAr: "شاي كرك بالزعفران",
    category: "beverages",
    description:
      "Slow-brewed spiced black tea with rich evaporated milk, cracked cardamom pods, and pure saffron.",
    priceOmr: 0.6,
    priceOmrStr: "0.600 OMR",
  },
];

export const WorkShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "starters" | "mains" | "beverages"
  >("all");
  const [arabicMode, setArabicMode] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: number }>({
    d1: 1,
    d6: 2,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFilter, setProjectFilter] = useState<string>("All");

  const loadProjects = async () => {
    try {
      const data = await api.getProjects();
      if (data && data.length > 0) {
        setProjects(data);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener("focus", loadProjects);
    const interval = setInterval(loadProjects, 5000);

    return () => {
      window.removeEventListener("focus", loadProjects);
      clearInterval(interval);
    };
  }, []);

  const filteredItems =
    activeTab === "all"
      ? SAMPLE_DISHES
      : SAMPLE_DISHES.filter((d) => d.category === activeTab);

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: 1 };
    });
  };

  const totalSelectedCount = Object.values(selectedItems).reduce(
    (sum, count) => sum + count,
    0
  );

  const totalOmr = Object.entries(selectedItems).reduce((sum, [id, count]) => {
    const dish = SAMPLE_DISHES.find((d) => d.id === id);
    return sum + (dish ? dish.priceOmr * count : 0);
  }, 0);

  const projectCategories = ["All", "Web Design", "Local SEO", "QR Menu"];
  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category?.toLowerCase().includes(projectFilter.toLowerCase()) ||
            p.name.toLowerCase().includes(projectFilter.toLowerCase())
        );

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 bg-[#202124] text-[#F7F7F2] border-t border-[#45484E] relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* 1. Working Approach Process */}
        <div className="mb-24 pb-20 border-b border-[#45484E]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-[#F5C542] uppercase tracking-wider block mb-2">
              Our Working Approach
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2]">
              A clear plan before the work begins
            </h2>
            <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
              Tell us about your business, your customers and what you want to improve. We will discuss the relevant services, agree the scope and outline the next steps before work begins. The plan makes clear what is included, what we need from you and how progress will be reviewed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#2B2D31] border border-[#45484E] card-hover-gold">
              <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] text-[#F5C542] flex items-center justify-center font-black text-base mb-5 shadow-inner">
                01
              </div>
              <h3 className="text-lg font-bold text-[#F7F7F2] mb-2">
                1. Discovery &amp; Scope Agreement
              </h3>
              <p className="text-xs text-[#C4C7CC] leading-relaxed">
                We review your market (Oman or Thrissur), existing assets, target audience, and agree exactly what will be built or managed.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#2B2D31] border border-[#45484E] card-hover-gold">
              <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] text-[#F5C542] flex items-center justify-center font-black text-base mb-5 shadow-inner">
                02
              </div>
              <h3 className="text-lg font-bold text-[#F7F7F2] mb-2">
                2. Content &amp; Development
              </h3>
              <p className="text-xs text-[#C4C7CC] leading-relaxed">
                Clean mobile-first designs, verified business information, structured metadata, or digital QR menu setup without dummy filler.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#2B2D31] border border-[#45484E] card-hover-gold">
              <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] text-[#F5C542] flex items-center justify-center font-black text-base mb-5 shadow-inner">
                03
              </div>
              <h3 className="text-lg font-bold text-[#F7F7F2] mb-2">
                3. Verification &amp; Handover
              </h3>
              <p className="text-xs text-[#C4C7CC] leading-relaxed">
                Contact delivery testing, owner account ownership confirmation, staff update training, and clear evidence-based review baselines.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Priority Feature: Interactive Sample QR Menu Demo */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2D31] border border-[#45484E] text-[#F5C542] text-xs font-semibold mb-3">
                <QrCode size={14} className="text-[#F5C542]" />
                <span>Priority Hospitality Demonstration</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2]">
                See how a digital menu could work for your business
              </h2>
              <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
                Explore a sample menu on your screen or phone. Browse categories and see how clear item descriptions and OMR pricing help guests choose.
              </p>
              <div className="mt-3 inline-block px-3 py-1 rounded-lg bg-[#2B2D31] border border-[#45484E] text-[11px] text-[#C4C7CC]">
                <em>Notice:</em> Illustrative demonstration with sample dishes and prices. No checkout or payment processing is executed.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setArabicMode(!arabicMode)}
                className="px-4 py-2.5 rounded-xl border border-[#45484E] bg-[#2B2D31] hover:border-[#F5C542] text-xs font-semibold text-[#F7F7F2] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{arabicMode ? "Switch to English" : "عرض باللغة العربية (AR)"}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="btn-primary"
              >
                <QrCode size={16} />
                <span>Scan Demo QR</span>
              </button>
            </div>
          </div>

          {/* Interactive Menu Browser Simulation with Phone Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left simulated smartphone container */}
            <div className="lg:col-span-8 bg-[#2B2D31] border border-[#45484E] rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden">
              {/* Top Bar simulating restaurant banner */}
              <div className="flex items-center justify-between pb-6 border-b border-[#45484E] mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5C542]">
                      Sample Hospitality Menu &bull; OMR
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#202124] text-[#F5C542] border border-[#45484E]">
                      Live Interactive
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F7F7F2] mt-1">
                    Al Bustan Palms Cafe &amp; Grill
                  </h3>
                  <p className="text-xs text-[#C4C7CC]">Muscat, Sultanate of Oman &bull; Beachfront Dining</p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Kitchen Open
                  </span>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 select-none">
                {[
                  { id: "all", label: "All Dishes", labelAr: "جميع الأطباق" },
                  { id: "starters", label: "Starters & Mezze", labelAr: "المقبلات والشوربات" },
                  { id: "mains", label: "Main Courses", labelAr: "الأطباق الرئيسية" },
                  { id: "beverages", label: "Desserts & Tea", labelAr: "الحلويات والمشروبات" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === cat.id
                        ? "bg-[#F5C542] text-[#202124] shadow-md font-bold"
                        : "bg-[#202124] text-[#C4C7CC] hover:text-[#F7F7F2] border border-[#45484E]"
                    }`}
                  >
                    {arabicMode ? cat.labelAr : cat.label}
                  </button>
                ))}
              </div>

              {/* Dishes List with Click-to-Select Interaction */}
              <div
                className={`space-y-3.5 mb-6 ${
                  arabicMode ? "text-right" : "text-left"
                }`}
                dir={arabicMode ? "rtl" : "ltr"}
              >
                {filteredItems.map((dish) => {
                  const isSelected = !!selectedItems[dish.id];
                  return (
                    <div
                      key={dish.id}
                      onClick={() => toggleItemSelection(dish.id)}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#202124] border-[#F5C542] shadow-md shadow-[#F5C542]/10 ring-1 ring-[#F5C542]/40"
                          : "bg-[#202124]/70 border-[#45484E] hover:border-[#F5C542]/50 hover:bg-[#202124]"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-bold text-[#F7F7F2]">
                            {arabicMode ? dish.nameAr : dish.name}
                          </h4>
                          {dish.tag && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#2B2D31] text-[#F5C542] border border-[#45484E]">
                              {dish.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#C4C7CC] leading-relaxed max-w-xl">
                          {dish.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 flex-shrink-0">
                        <span className="text-sm font-black text-[#F5C542] tracking-wide">
                          {dish.priceOmrStr}
                        </span>

                        <div
                          className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                            isSelected
                              ? "bg-[#F5C542] text-[#202124] border-[#F5C542]"
                              : "bg-[#2B2D31] text-[#C4C7CC] border-[#45484E]"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check size={12} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={12} />
                              <span>Test Select</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Interactive Order Tray Simulator */}
              <div className="p-4 rounded-2xl bg-[#202124] border border-[#45484E] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5C542] flex items-center justify-center text-[#202124] font-black text-sm">
                    {totalSelectedCount}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F7F7F2] block">
                      Simulated Table Order
                    </span>
                    <span className="text-[11px] text-[#C4C7CC]">
                      {totalSelectedCount > 0
                        ? `${totalSelectedCount} items selected &bull; Total: ${totalOmr.toFixed(3)} OMR`
                        : "Click any dish above to test selection"}
                    </span>
                  </div>
                </div>

                {totalSelectedCount > 0 && (
                  <button
                    onClick={() => setSelectedItems({})}
                    className="text-xs text-[#C4C7CC] hover:text-[#F5C542] flex items-center gap-1"
                  >
                    <Trash2 size={13} />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Guide / QR Code Card */}
            <div className="lg:col-span-4 bg-[#2B2D31] border border-[#45484E] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-6 shadow-sm">
                  <Smartphone size={24} />
                </div>

                <h3 className="text-xl font-bold text-[#F7F7F2] mb-3">
                  Why a Digital QR Menu?
                </h3>

                <ul className="space-y-3.5 text-xs text-[#C4C7CC] mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={15}
                      className="text-[#F5C542] flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>No App Download Required:</strong> Opens immediately in Safari, Chrome or any mobile browser when scanned.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={15}
                      className="text-[#F5C542] flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>OMR Pricing &amp; Arabic:</strong> Tailored for local and tourist diners with clear currencies and RTL typography.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={15}
                      className="text-[#F5C542] flex-shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>Instant Price Updates:</strong> Update seasonal prices and daily specials from the admin panel without reprinting.
                    </span>
                  </li>
                </ul>

                {/* Live QR Box */}
                <div className="p-4 rounded-2xl bg-[#202124] border border-[#45484E] flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-[#FFFFFF] p-1.5 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <QrCode size={52} className="text-[#202124]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F7F7F2] block">
                      Sample QR Code
                    </span>
                    <span className="text-[11px] text-[#C4C7CC] block mt-0.5">
                      Point phone camera to experience this menu on mobile
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="btn-primary w-full text-xs font-bold text-center py-3.5 shadow-md"
              >
                Discuss your restaurant QR menu
              </a>
            </div>
          </div>
        </div>

        {/* 3. Live Projects & Delivery Blueprints from Database */}
        {projects && projects.length > 0 && (
          <div className="pt-16 border-t border-[#45484E]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-semibold text-[#F5C542] uppercase tracking-wider block mb-2">
                  Live Admin Synced Blueprints
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F7F2]">
                  Active Projects &amp; Delivery Blueprints
                </h3>
                <p className="mt-2 text-xs text-[#C4C7CC] leading-relaxed">
                  Managed directly from the Admin Panel. Each project demonstrates scope definition, verified milestones, and execution status.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {projectCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      projectFilter === cat
                        ? "bg-[#F5C542] text-[#202124] font-bold"
                        : "bg-[#2B2D31] text-[#C4C7CC] border border-[#45484E]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((prj) => (
                <div
                  key={prj.id}
                  className="p-6 rounded-2xl bg-[#2B2D31] border border-[#45484E] flex flex-col justify-between card-hover-gold"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="px-2.5 py-1 rounded bg-[#202124] border border-[#45484E] text-[#F5C542] font-semibold text-[11px]">
                        {prj.code || prj.category}
                      </span>
                      <span className="text-[#C4C7CC] font-medium text-[11px] px-2 py-0.5 rounded bg-[#202124]/50">
                        {prj.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#F7F7F2] mb-2">
                      {prj.name}
                    </h4>

                    <p className="text-xs text-[#C4C7CC] leading-relaxed line-clamp-3 mb-4">
                      {prj.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#45484E]/60 flex items-center justify-between text-xs">
                    <span className="text-[#C4C7CC]">
                      Client: <strong className="text-[#F7F7F2]">{prj.client}</strong>
                    </span>
                    <a
                      href="#contact"
                      className="text-[#F5C542] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#2B2D31] border border-[#45484E] rounded-3xl p-7 max-w-sm w-full text-center shadow-2xl relative">
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 text-[#C4C7CC] hover:text-[#F7F7F2] rounded-lg"
              >
                <X size={18} />
              </button>

              <h4 className="text-lg font-bold text-[#F7F7F2] mb-2">
                Sample QR Menu Code
              </h4>
              <p className="text-xs text-[#C4C7CC] mb-6">
                Scan with your phone's camera to experience this interactive demo menu on your mobile screen.
              </p>

              <div className="bg-white p-6 rounded-2xl inline-block mb-6 shadow-inner">
                <QrCode size={180} className="text-[#202124]" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowQrModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#202124] border border-[#45484E] text-xs font-semibold text-[#F7F7F2] hover:bg-[#34373C]"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setShowQrModal(false)}
                  className="btn-primary flex-1 py-2.5 text-xs font-bold"
                >
                  Discuss Menu
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
