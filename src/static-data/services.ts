export interface Service {
  number: number;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: 1,
    title: 'Custom App and Web Development',
    description:
      'I create mobile and web applications tailored to business needs, focusing on intuitive design, seamless functionality, and scalability. Additionally, I design responsive and engaging websites optimized for user experience, offering solutions such as eCommerce platforms, content management systems, and any custom features to help you achieve your goals.',
  },
  {
    number: 2,
    title: 'API Integration and Backend Solutions',
    description:
      'I develop robust backend systems to support digital infrastructure and integrate third-party APIs for enhanced functionality, ensuring your applications and websites operate efficiently and seamlessly with other systems.',
  },
  {
    number: 3,
    title: 'Maintenance, Support, and Optimization',
    description:
      'I provide ongoing support to clients to keep their applications and websites running smoothly, offering updates, performance improvements, and troubleshooting to meet evolving business demands and ensure optimal performance.',
  },
];

export default services;
