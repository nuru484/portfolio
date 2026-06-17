export interface Skill {
  id: number;
  name: string;
  src: string;
}

const skills: Skill[] = [
  { id: 1, name: 'PostgreSQL', src: '/skills/PostgreSQL-logo.png' },
  { id: 2, name: 'ExpressJs', src: '/skills/expressjs-logo.png' },
  { id: 3, name: 'ReactJs', src: '/skills/react-logo.png' },
  { id: 4, name: 'NodeJs', src: '/skills/nodejs-logo.jpg' },
  { id: 5, name: 'TailwindCSS', src: '/skills/tailwind-css-logo.png' },
  { id: 6, name: 'NextJs', src: '/skills/next-js-logo.svg' },
];

export default skills;
