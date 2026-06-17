export interface Service {
  number: number;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: 1,
    title: 'Web & App Development',
    description:
      'I design and build web and mobile apps from the ground up — clean interfaces and solid functionality, from eCommerce and dashboards to content systems and custom features built around what you actually need.',
  },
  {
    number: 2,
    title: 'APIs & Backend',
    description:
      'I build the backend that powers your product — APIs, databases, authentication, and third-party integrations — so everything runs reliably and connects to the tools you already use.',
  },
  {
    number: 3,
    title: 'Maintenance & Optimization',
    description:
      'I keep what you ship running well — updates, performance tuning, and quick fixes — so your app stays fast and dependable as your needs grow.',
  },
];

export default services;
