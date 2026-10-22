import { FAQ } from "@/types";

export const initialFAQs: FAQ[] = [
  {
    id: "FAQ-001",
    question: "How do you structure engagements and pricing?",
    answer: "We primarily work on fixed-fee, milestone-based engagements with clear deliverables and acceptance criteria. For ongoing scaling and embedded architecture, we offer dedicated monthly engineering retainers. You always know exact budgets upfront with zero hidden fees.",
    category: "Pricing & Retainers",
    order: 1,
    isActive: true,
  },
  {
    id: "FAQ-002",
    question: "What technical stacks and frameworks do you build with?",
    answer: "Our core stack comprises React 19, Next.js 16 App Router, TypeScript, Python (FastAPI), PyTorch, PostgreSQL, Vector databases, and cloud infrastructure on AWS & GCP managed via Terraform. We prioritize high throughput, sub-50ms latency, and rock-solid reliability.",
    category: "Technical Stack",
    order: 2,
    isActive: true,
  },
  {
    id: "FAQ-003",
    question: "Do we retain 100% ownership of the intellectual property?",
    answer: "Yes, absolutely. All code, design assets, trained models, architectural schemas, and documentation are 100% your intellectual property. Full IP assignment and repository access are transferred upon milestone completion.",
    category: "IP & Legal",
    order: 3,
    isActive: true,
  },
  {
    id: "FAQ-004",
    question: "How quickly can your team kick off a new engagement?",
    answer: "Following our initial technical discovery call and mutual scope sign-off, we can typically mobilize a dedicated team of principal engineers within 1 to 2 weeks.",
    category: "Process & Delivery",
    order: 4,
    isActive: true,
  },
  {
    id: "FAQ-005",
    question: "Can you collaborate with our existing in-house engineering team?",
    answer: "Yes. We frequently embed as a specialized strike team alongside internal CTOs, VP of Engineering, or product teams to accelerate critical zero-to-one initiatives, rebuild architectures, or implement complex AI capabilities.",
    category: "General",
    order: 5,
    isActive: true,
  },
  {
    id: "FAQ-006",
    question: "What post-launch warranty and SLA support is included?",
    answer: "Every production deliverable comes with a comprehensive 60-day post-launch warranty covering bug fixes, edge case resolution, performance profiling, and hands-on team handover sessions.",
    category: "Support & SLA",
    order: 6,
    isActive: true,
  },
];
