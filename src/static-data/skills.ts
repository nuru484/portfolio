// Skill groups rendered as plain text lists on the homepage (no logos).
export interface SkillGroup {
  label: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: [
      'JavaScript',
      'TypeScript',
      'HTML & CSS',
      'React',
      'Next.js',
      'Redux Toolkit',
      'TanStack Table',
      'Tailwind CSS',
      'shadcn/ui',
    ],
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Socket.IO',
      'REST APIs',
    ],
  },
  {
    label: 'Tooling & Testing',
    items: [
      'Git & GitHub',
      'Docker',
      'Zod',
      'Vitest',
      'Playwright',
      'GitHub Actions (CI/CD)',
      'Cloudinary',
    ],
  },
];

export default skillGroups;
