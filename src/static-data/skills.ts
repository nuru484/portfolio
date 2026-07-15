// Skill groups rendered as plain text lists on the homepage (no logos).
export interface SkillGroup {
  label: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
  },
  {
    label: 'Tooling & Testing',
    items: ['Docker', 'Zod', 'Vitest', 'Playwright', 'Git & CI/CD'],
  },
];

export default skillGroups;
