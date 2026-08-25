export interface Service {
  number: number;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: 1,
    title: "Web Application Development",
    description:
      "Custom web platforms built from the ground up: dashboards, content systems, booking and payment flows, and business software shaped around how you actually work.",
  },
  {
    number: 2,
    title: "APIs & Backend",
    description:
      "The backend that powers your product: REST APIs, database design, authentication, background jobs, and integrations with payments, SMS, and email.",
  },
  {
    number: 3,
    title: "Maintenance & Optimization",
    description:
      "Keeping what you ship running well: updates, performance tuning, monitoring, and quick fixes as your needs grow.",
  },
];

export default services;
