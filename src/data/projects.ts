import type { StaticImageData } from 'next/image';
import blogSiteDesktop from '@/assets/projectImages/blog-site-desktop.jpg';
import blogSiteMobile from '@/assets/projectImages/blog-site-mobile.jpg';
import votingSystemDesktop from '@/assets/projectImages/voting-system-desktop.jpg';
import votingSystemMobile from '@/assets/projectImages/voting-system-mobile.jpg';
import nutritionAppDesktop from '@/assets/projectImages/nutrition-app-desktop.jpg';
import nutritionAppMobile from '@/assets/projectImages/nutrition-app-mobile.jpg';
import qrCodeDesktop from '@/assets/projectImages/qrcode-desktop.jpg';
import qrCodeMobile from '@/assets/projectImages/qrcode-mobile.jpg';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: 'Blog Application with API-Driven Architecture',
    description:
      'Built a full-stack blog application with a RESTful API backend using Node.js, Express, and Prisma. Developed two front-ends: one for readers to view and comment on posts, and another for authors to manage content. Secured routes with JWT authentication and implemented features like unpublished posts, rich text editing, and comment moderation.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Prisma'],
    desktopImage: blogSiteDesktop,
    mobileImage: blogSiteMobile,
    githubUrl: 'https://github.com/nuru484/blog-api-backend',
    liveUrl: 'https://blog-api-frontend-blue.vercel.app/',
  },
  {
    title: 'Real-Time Voting System',
    description:
      'A secure voting system with an admin panel for approving voters via profile ID or OTP. Votes are counted in real-time using Socket.io. Each voter can only vote once, and the system automatically logs them out after voting.',
    technologies: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Socket.io'],
    desktopImage: votingSystemDesktop,
    mobileImage: votingSystemMobile,
    githubUrl: 'https://github.com/nuru484/credible',
    liveUrl: 'https://github.com/nuru484/credible',
  },
  {
    title: 'Nutrition Tracker App',
    description:
      'A nutrition tracking app that allows users to log their daily food intake, track nutrients, monitor exercise routines, and record water consumption. Built with Node.js, Express, EJS, and Tailwind CSS for a responsive and user-friendly interface.',
    technologies: ['Node.js', 'Express', 'EJS', 'Tailwind CSS', 'Prisma'],
    desktopImage: nutritionAppDesktop,
    mobileImage: nutritionAppMobile,
    githubUrl: 'https://github.com/nuru484/nutrition-app',
    liveUrl: 'https://nutrition-app-ouxg.onrender.com',
  },
  {
    title: 'QR Code Event Management System',
    description:
      'A QR code-based event management system that allows users to register for events, generate QR codes, and scan them to check-in. The system also includes an admin panel for managing events, users, and check-ins.',
    technologies: [
      'Node.js',
      'Express',
      'React',
      'Tailwind CSS',
      'Prisma',
      'QR Code',
      'JWT',
    ],
    desktopImage: qrCodeDesktop,
    mobileImage: qrCodeMobile,
    githubUrl: 'https://github.com/nuru484/qrcode-frontend',
    liveUrl: 'https://qrcode-frontend-lovat.vercel.app/',
  },
];

export default projects;
