import type { StaticImageData } from 'next/image';
import postgreSQL from '@/assets/skills-logos/PostgreSQL-logo.png';
import expressJs from '@/assets/skills-logos/expressjs-logo.png';
import reactJs from '@/assets/skills-logos/react-logo.png';
import nodeJs from '@/assets/skills-logos/nodejs-logo.jpg';
import tailwindCss from '@/assets/skills-logos/tailwind-css-logo.png';
import nextJs from '@/assets/skills-logos/next-js-logo.svg';

export interface Skill {
  id: number;
  name: string;
  src: StaticImageData;
}

const skills: Skill[] = [
  { id: 1, name: 'PostgreSQL', src: postgreSQL },
  { id: 2, name: 'ExpressJs', src: expressJs },
  { id: 3, name: 'ReactJs', src: reactJs },
  { id: 4, name: 'NodeJs', src: nodeJs },
  { id: 5, name: 'TailwindCSS', src: tailwindCss },
  { id: 6, name: 'NextJs', src: nextJs },
];

export default skills;
