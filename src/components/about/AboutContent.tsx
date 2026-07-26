// src/components/about/AboutContent.tsx
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT } from '@/config/constants';

interface FAQItemProps {
  question: string;
  answer: string;
}

const facts = [
  { label: 'Role', value: 'Full-Stack Software Engineer' },
  { label: 'Stack', value: 'TypeScript · React / Next.js · Node · PostgreSQL' },
  { label: 'Based in', value: CONTACT.location },
  { label: 'Status', value: 'Open to remote roles' },
];

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

const experience: ExperienceEntry[] = [
  {
    company: 'Hereafter Ghana',
    role: 'Full-Stack Software Engineer & IT Manager',
    period: 'Jan 2025 - Present',
    location: 'Tamale, Ghana',
    points: [
      "Single-handedly designed, built, and deployed the organization's two production platforms: a public website with a custom CMS and a full Donor Management System, each with its own admin dashboard, spanning roughly 70 data models and 400+ REST endpoints.",
      'Integrated online payments and mobile money (Paystack, Hubtel) with recurring giving, webhook reconciliation, and automated charging, plus bulk SMS and email with delivery tracking on Redis/BullMQ and pg-boss background workers.',
      'Manage hosting, deployments, and database architecture on AWS with GitHub Actions CI/CD, and wrote the administration documentation and trained the non-technical staff who run both platforms day to day.',
    ],
  },
  {
    company: 'HackerBoost',
    role: 'Full-Stack Developer & Bootcamp Tutor',
    period: 'Feb 2025 - Aug 2025',
    location: 'Tamale, Ghana',
    points: [
      'Built and shipped features across the frontend and backend of the learning platform, improving performance, reliability, and user experience.',
      'Tutored students through coding bootcamps, mentoring beginners in web development fundamentals and explaining technical concepts to non-technical audiences.',
    ],
  },
];

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="bg-card border border-border rounded-lg p-4">
      <summary className="font-medium text-lg cursor-pointer">
        {question}
      </summary>
      <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
        {answer}
      </p>
    </details>
  );
}

export function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
      {/* Intro — prose left, portrait right from lg */}
      <section className="py-12 md:py-20">
        <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
          About Me
        </h1>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div className="max-w-3xl space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              Hi! I&apos;m Nurudeen, a self-taught full-stack software engineer
              who learned to code by solving real problems. What drives me is
              genuine curiosity about how computers work, not just at the
              application layer, but down to the systems that power everything
              we build. Over the past two years I have designed, built, and
              shipped production platforms end to end, from PostgreSQL data
              models and secure REST APIs to responsive React and Next.js
              interfaces, across donor management, e-commerce, travel booking,
              fintech, and nonprofit systems.
            </p>
            <p>
              At Hereafter Ghana I built the organization&apos;s two production
              platforms solo: a public website with a custom CMS and a full
              Donor Management System with real payment rails, recurring
              giving, and role-based access control. The donor platform helped
              raise over GHS 70,000 in its first few months and now processes
              more than GHS 3,000 in Giving Friday donations every week, with
              recurring subscriptions on track for around GHS 6,250 in monthly
              giving. I own the whole delivery cycle, including documentation,
              handover, and training the non-technical teams who run what I
              build.
            </p>
            <p>
              I work mainly in JavaScript and TypeScript, deploy to AWS and
              Vercel with GitHub Actions CI/CD, and I am backed by a Statistics
              background and a bias for clean, well-tested, maintainable code.
              Right now I&apos;m looking for a remote full-stack role where I
              can solve meaningful problems alongside experienced engineers
              while deepening my computer science fundamentals; long term,
              I&apos;m working toward systems programming and language design.
              The{' '}
              <Link
                href="/projects"
                className="font-medium text-foreground underline underline-offset-4"
              >
                projects on this site
              </Link>{' '}
              are the receipts.
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-muted lg:mx-0">
            <Image
              src="/profile-photo.jpg"
              alt="Abdul-Majeed Nurudeen"
              fill
              priority
              sizes="(min-width: 1024px) 20rem, 20rem"
              className="object-cover"
            />
          </div>
        </div>

        {/* At a glance — breaks up the prose */}
        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                {label}
              </dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Experience — the professional record behind the intro */}
      <section className="pb-12 md:pb-16">
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        <div className="space-y-6">
          {experience.map((entry) => (
            <article
              key={entry.company}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-medium">
                  {entry.company}{' '}
                  <span className="text-muted-foreground font-normal">
                    · {entry.role}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {entry.period} · {entry.location}
                </p>
              </div>
              <ul className="mt-4 ml-5 list-disc space-y-2 text-lg text-muted-foreground leading-relaxed">
                {entry.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ — full-bleed on mobile, contained surface from sm up */}
      <section className="py-12 md:py-16 sm:bg-muted sm:rounded-2xl sm:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <FAQItem
            question="What services do you offer?"
            answer="I build full-stack web platforms end to end: custom web applications, REST APIs and integrations (payments, SMS, email), database design, admin dashboards, and custom business software systems. I work mainly in JavaScript and TypeScript with React, Next.js, Node.js, Express, and PostgreSQL, deploying to AWS and Vercel with CI/CD."
          />
          <FAQItem
            question="How do I get started with you?"
            answer="To get started, simply reach out through the contact form or email. After discussing your project goals and requirements, I'll provide a roadmap outlining the development process, including timelines, deliverables, and milestones."
          />
          <FAQItem
            question="Can you help with designing the user interface for my app?"
            answer="Absolutely! I bring a strong design background to my development process, ensuring that the user interface is not only functional but also visually appealing and user-friendly."
          />
          <FAQItem
            question="What is your pricing structure?"
            answer="Pricing depends on the project's scope, complexity, and technology requirements. After an initial consultation, I'll provide a custom quote based on your specific needs."
          />
          <FAQItem
            question="Do you work with international clients?"
            answer="Yes, I work with clients globally. Thanks to remote communication tools, I can efficiently collaborate across time zones and ensure smooth project delivery."
          />
        </div>
      </section>
    </div>
  );
}
