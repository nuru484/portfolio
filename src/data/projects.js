// src/data/projects.js

const projects = [
  {
    title: 'Blog Application with API-Driven Architecture',
    description:
      'Built a full-stack blog application with a RESTful API backend using Node.js, Express, and Prisma. Developed two front-ends: one for readers to view and comment on posts, and another for authors to manage content. Secured routes with JWT authentication and implemented features like unpublished posts, rich text editing, and comment moderation.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Prisma'],
    desktopImage: '/projectImages/blog site desktop.jpg',
    mobileImage: '/projectImages/blog site phone.jpg',
    githubUrl: 'https://github.com/nuru484/blog-api-backend',
    liveUrl: 'https://blog-api-frontend-blue.vercel.app/',
  },
  {
    title: 'Real-Time Voting System',
    description:
      'A secure voting system with an admin panel for approving voters via profile ID or OTP. Votes are counted in real-time using Socket.io. Each voter can only vote once, and the system automatically logs them out after voting.',
    technologies: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Socket.io'],
    desktopImage: '/voting system desktop.jpg',
    mobileImage: '/voting system mobile.jpg',
    githubUrl: 'https://github.com/nuru484/credible',
    liveUrl: 'https://github.com/nuru484/credible',
  },
  {
    title: 'Nutrition Tracker App',
    description:
      'A nutrition tracking app that allows users to log their daily food intake, track nutrients, monitor exercise routines, and record water consumption. Built with Node.js, Express, EJS, and Tailwind CSS for a responsive and user-friendly interface.',
    technologies: ['Node.js', 'Express', 'EJS', 'Tailwind CSS', 'Prisma'],
    desktopImage: '/nutrition app desktop.jpg',
    mobileImage: '/nutrition app mobile.jpg',
    githubUrl: 'https://github.com/nuru484/nutrition-app',
    liveUrl: 'https://nutrition-app-ouxg.onrender.com',
  },
];

export default projects;
