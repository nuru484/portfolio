// Skill groups rendered as plain text lists on the homepage (no logos).
export interface SkillGroup {
  label: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js (App Router)",
      "Redux Toolkit / RTK Query",
      "TanStack Table",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "REST APIs",
      "Zod",
    ],
  },
  {
    label: "Tooling & Infra",
    items: [
      "Git & GitHub",
      "GitHub Actions (CI/CD)",
      "Docker",
      "AWS",
      "Vercel",
      "Render",
      "Vitest",
      "Playwright",
      "Cloudinary",
      "Paystack",
      "Hubtel",
    ],
  },
];

export default skillGroups;
