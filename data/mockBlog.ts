import { BlogPost } from "@/types";

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "How We Scaled Next.js App Router for 10M Concurrent Sessions",
    slug: "scaling-nextjs-app-router-10m-sessions",
    excerpt: "A deep dive into speculative edge rendering, distributed cache tags, and reducing server component latency.",
    content: `# Scaling Next.js App Router for 10M Concurrent Sessions

When scaling consumer web applications with high peak velocity, traditional database roundtrips quickly saturate the connection pool. In this technical retrospective, we share the architectural patterns developed by the Pixel engineering team.

## The Bottleneck: Server Component Re-validation
In Next.js, \`revalidateTag\` triggers on-demand cache purges across distributed edge nodes. When thousands of requests arrive simultaneously for a newly invalidated page, the origin server can suffer a cache stampede.

### Solution: Single-flight Deduping at the Edge
By introducing an atomic edge mutex lock, only the first request performs the heavy recalculation while subsequent requests wait on the shared promise:

\`\`\`typescript
export async function getTieredPricing(productId: string) {
  'use cache';
  cacheLife('hours');
  cacheTag('pricing', productId);
  return await db.query.products.findFirst({ where: eq(products.id, productId) });
}
\`\`\`

## Key Takeaways
1. Always isolate dynamic user state from static shell assets.
2. Leverage optimistic UI updates with React 19 Actions.
3. Keep database queries strictly typed with compile-time query builders.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    author: {
      name: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      role: "VP of Engineering",
    },
    category: "Engineering",
    tags: ["Next.js", "Performance", "React", "Architecture"],
    status: "Published",
    views: 14820,
    publishedAt: "2026-09-15",
    readingTime: "6 min read",
  },
  {
    id: "post-2",
    title: "Building Micro-Interactions That Don't Choke React 19 Renders",
    slug: "building-micro-interactions-react-19",
    excerpt: "Techniques for smooth 60fps animations using CSS Houdini, Framer Motion hardware-accelerated transforms, and React Compiler.",
    content: `# Building Micro-Interactions That Don't Choke React 19 Renders

Modern web applications should feel as fluid as native desktop software. However, running heavy JS animation loops inside stateful React components often causes dropped frames.

## Offloading Work to the GPU
By isolating animated values within CSS transforms and composited properties (\`transform\` and \`opacity\`), the browser layout engine avoids recalculating geometric layouts.

### Declarative Springs with Framer Motion
\`\`\`tsx
<motion.div
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
>
  Card Content
</motion.div>
\`\`\`

Motion should always serve a cognitive purpose: clarifying spatial relationships and providing instant physical tactile reassurance.`,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
    author: {
      name: "Sneha Reddy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      role: "Head of Product Design",
    },
    category: "Design",
    tags: ["UI/UX", "Framer Motion", "Animations", "Tailwind"],
    status: "Published",
    views: 9420,
    publishedAt: "2026-09-28",
    readingTime: "4 min read",
  },
  {
    id: "post-3",
    title: "Demystifying Agentic Tool Calling: Lessons from 500k Production Prompts",
    slug: "demystifying-agentic-tool-calling",
    excerpt: "Why naive prompt chaining fails in enterprise production and how structured JSON schemas with type verifiers guarantee zero hallucinated actions.",
    content: `# Demystifying Agentic Tool Calling: Lessons from 500k Production Prompts

Autonomous agents are only as reliable as their execution boundaries. If an LLM misinterprets a parameter or generates invalid arguments, the downstream system can fail catastrophically.

## The Dual-Layer Guardrail Architecture
1. **Schema Constrained Decoding**: Forcing model sampling logits to only match valid JSON Schema tokens.
2. **Deterministic Runtime Validation**: Running every payload through Zod schemas before triggering internal APIs.`,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    author: {
      name: "Ananya Iyer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
      role: "Principal AI Researcher",
    },
    category: "AI & ML",
    tags: ["AI", "LLM", "Tool Calling", "Python"],
    status: "Published",
    views: 22100,
    publishedAt: "2026-10-04",
    readingTime: "8 min read",
  },
  {
    id: "post-4",
    title: "PostgreSQL WAL Streaming Replication: Zero-Data-Loss Guide",
    slug: "postgresql-wal-streaming-zero-data-loss",
    excerpt: "Practical configuration and heartbeat failover scripts for multi-region Postgres setups with synchronous standby guarantees.",
    content: `# PostgreSQL WAL Streaming Replication: Zero-Data-Loss Guide

When your database hosts mission-critical financial transactions, RPO=0 (Recovery Point Objective) is a non-negotiable requirement.

## Synchronous Commit Modes
PostgreSQL offers \`synchronous_commit = on | remote_write | remote_apply\`. Selecting \`remote_apply\` guarantees that the standby replica has applied the write to its physical buffer cache before the master returns an acknowledgment to the client.`,
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: {
      name: "Rohan Varma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      role: "Senior Backend Engineer",
    },
    category: "Engineering",
    tags: ["PostgreSQL", "Database", "DevOps", "Reliability"],
    status: "Published",
    views: 8120,
    publishedAt: "2026-10-12",
    readingTime: "7 min read",
  },
  {
    id: "post-5",
    title: "Why We Migrated Our Client Dashboards to Tailwind CSS v4",
    slug: "migrating-to-tailwind-css-v4",
    excerpt: "Lightning-fast build times, zero-config CSS variables, and the elimination of complex PostCSS configurations.",
    content: `# Why We Migrated Our Client Dashboards to Tailwind CSS v4

Tailwind CSS v4 is a ground-up rewrite that reimagines how utility-first styling interacts with the modern browser and Turbopack bundler. Here is how our team transitioned 12 enterprise applications in less than two weeks.`,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
    author: {
      name: "Priya Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      role: "Staff Frontend Architect",
    },
    category: "Frontend",
    tags: ["Tailwind", "CSS", "Frontend", "Turbopack"],
    status: "Draft",
    views: 0,
    publishedAt: "2026-10-25",
    readingTime: "5 min read",
  },
  {
    id: "post-6",
    title: "SOC2 Compliance for Modern Startups: A Developer-First Checklist",
    slug: "soc2-compliance-for-startups-checklist",
    excerpt: "From automated AWS IAM rotation to ephemeral development databases, how to sail through Type II audits without losing developer speed.",
    content: `# SOC2 Compliance for Modern Startups: A Developer-First Checklist

Security compliance doesn't have to mean cumbersome ticket approval queues. Learn how to codify compliance checks into your GitHub Actions pipelines.`,
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      role: "Senior Security Engineer",
    },
    category: "Security",
    tags: ["Security", "SOC2", "DevSecOps", "Cloud"],
    status: "Scheduled",
    views: 0,
    publishedAt: "2026-11-01",
    readingTime: "9 min read",
  },
];
