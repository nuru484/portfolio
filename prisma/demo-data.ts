// prisma/demo-data.ts
// Static fixtures for the local development seed (posts, projects, categories).

export const demoCategories = [
  'Full-Stack',
  'PERN Stack',
  'Frontend',
  'Backend',
  'DevOps',
  'Career',
];

export interface DemoProject {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const demoProjects: DemoProject[] = [
  {
    title: 'Nutrition Tracking App',
    description:
      'A PERN app for logging meals and tracking macros with personalized dashboards.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/nuru484',
    liveUrl: 'https://example.com',
  },
  {
    title: 'E-Voting System',
    description:
      'Secure online voting with real-time result counting and authenticated access.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/nuru484',
  },
  {
    title: 'Inventory Manager',
    description:
      'Stock management with low-stock alerts, suppliers, and CSV export.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    liveUrl: 'https://example.com',
  },
  {
    title: 'Realtime Chat',
    description:
      'A websocket chat app with rooms, presence, and typing indicators.',
    technologies: ['Next.js', 'Socket.IO', 'Node.js', 'Redis'],
    githubUrl: 'https://github.com/nuru484',
  },
  {
    title: 'Booking Platform',
    description:
      'Appointment scheduling with calendar sync, reminders, and payments.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://example.com',
  },
  {
    title: 'Blog CMS',
    description:
      'A headless content system with rich-text editing and on-demand ISR.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Cloudinary'],
    githubUrl: 'https://github.com/nuru484',
    liveUrl: 'https://example.com',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'A metrics dashboard with charts, filters, and CSV/PDF report export.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Recharts'],
    githubUrl: 'https://github.com/nuru484',
  },
];

export interface DemoPost {
  title: string;
  excerpt: string;
}

export const demoPosts: DemoPost[] = [
  { title: 'Getting Started with the PERN Stack', excerpt: 'A practical intro to building full-stack apps with PostgreSQL, Express, React, and Node.' },
  { title: 'Structuring a Scalable Express API', excerpt: 'Folder layout, middleware, validation, and error handling that scale.' },
  { title: 'Prisma in Production: Patterns That Help', excerpt: 'Soft deletes, migrations, and query patterns I reach for repeatedly.' },
  { title: 'Server Components vs Client Components', excerpt: 'When to reach for each in the Next.js App Router, with real examples.' },
  { title: 'Designing a Clean REST API', excerpt: 'Resource naming, status codes, pagination, and consistent responses.' },
  { title: 'Authentication Without the Headaches', excerpt: 'Sessions, JWTs, and how I keep auth simple and secure.' },
  { title: 'Optimizing PostgreSQL Queries', excerpt: 'Indexes, EXPLAIN, and avoiding N+1 in a real app.' },
  { title: 'On-Demand ISR with Next.js', excerpt: 'Revalidating static pages the moment your data changes.' },
  { title: 'Type-Safe Forms with Zod', excerpt: 'Validating on the server and the client from one schema.' },
  { title: 'Handling File Uploads with Cloudinary', excerpt: 'Streaming uploads, rollback on failure, and orphan cleanup.' },
  { title: 'State Management with RTK Query', excerpt: 'Caching, invalidation, and ditching most of your boilerplate.' },
  { title: 'A Pragmatic Guide to Tailwind CSS', excerpt: 'Design tokens, dark mode, and keeping class lists sane.' },
  { title: 'Writing Migrations You Can Trust', excerpt: 'Data-preserving, reversible schema changes in a team setting.' },
  { title: 'Error Handling Across the Stack', excerpt: 'A consistent strategy from the database to the UI.' },
  { title: 'Deploying a Next.js App the Smart Way', excerpt: 'Build-time migrations, environment config, and zero-downtime deploys.' },
  { title: 'Lessons from Going Self-Taught', excerpt: 'How I structured learning to land real full-stack work.' },
];

/** Builds simple, valid HTML body content for a demo post. */
export function demoPostContent(title: string): string {
  return `
    <p>${title} — this is demo content seeded for local development. It walks through the core ideas with enough text to produce a realistic read time.</p>
    <h2>Why it matters</h2>
    <p>Shipping reliable software is about a handful of fundamentals applied consistently: clear boundaries, good data modelling, and feedback loops that catch mistakes early.</p>
    <ul>
      <li>Keep modules focused and predictable.</li>
      <li>Validate inputs at the edges.</li>
      <li>Make the common path fast and the failure path obvious.</li>
    </ul>
    <h3>A small example</h3>
    <p>Below is a tiny snippet to show how the rendered content handles code blocks.</p>
    <pre><code>const sum = (a, b) =&gt; a + b;\nconsole.log(sum(2, 3));</code></pre>
    <p>That's the gist. The same principles scale from a side project to a production system serving real users.</p>
  `.trim();
}
