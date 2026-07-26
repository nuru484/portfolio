// src/components/about/AboutContent.tsx
// The about page is a pitch, not a biography: hook, proof, numbers, how I
// work, record, FAQ. Keep every figure here consistent with the CV and the
// Hereafter Ghana platforms it describes.
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

// The numbers that sell the story. Update alongside the CV.
const stats = [
  {
    value: 'GHS 70k+',
    label: 'raised through my donor platform in its first months',
  },
  {
    value: 'GHS 3k+',
    label: 'in donations processed every week by systems I built',
  },
  {
    value: '400+',
    label: 'REST endpoints designed and shipped across ~70 data models',
  },
  {
    value: '2 yrs',
    label: 'shipping production platforms end to end, solo',
  },
];

const valueProps = [
  {
    title: 'End-to-end ownership',
    body: 'One engineer, the whole platform: data model, secure APIs, payments, background jobs, admin dashboards, frontend, deployment. Nothing waits on a missing specialist.',
  },
  {
    title: 'Production discipline',
    body: 'Security, automated tests, CI/CD, and documentation are part of the build, not afterthoughts. What I ship keeps running after I hand it over.',
  },
  {
    title: 'Measurable outcomes',
    body: 'I aim every build at a number that matters, then hit it: funds raised, payments reconciled, hours saved for the team running it.',
  },
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
    period: 'Jan 2025 - Jul 2026',
    location: 'Tamale, Ghana',
    points: [
      "Single-handedly designed, built, and deployed the organization's two production platforms: a public website with a custom CMS and a full Donor Management System, each with its own admin dashboard, spanning roughly 70 data models and 400+ REST endpoints.",
      'Integrated online payments and mobile money (Paystack, Hubtel) with recurring giving, webhook reconciliation, and automated charging, plus bulk SMS and email with delivery tracking on Redis/BullMQ and pg-boss background workers.',
      'Managed hosting, deployments, and database architecture on AWS with GitHub Actions CI/CD, and wrote the administration documentation and trained the non-technical staff who run both platforms day to day.',
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
      {/* Intro - prose left, portrait right from lg */}
      <section className="py-12 md:py-20">
        <h1 className="text-5xl lg:text-7xl font-medium leading-tight tracking-normal">
          About Me
        </h1>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div className="max-w-3xl space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p className="text-xl text-foreground">
              I&apos;m Nurudeen, a self-taught full-stack software engineer who
              ships entire production platforms alone: data model, secure
              APIs, payments, background jobs, admin dashboards, frontend,
              deployment, and the documentation that keeps them running.
            </p>
            <p>
              I learned to code by solving real problems, driven by genuine
              curiosity about how computers work, not just at the application
              layer but down to the systems underneath. Over the past two
              years that has meant real production systems across donor
              management, e-commerce, travel booking, fintech, and nonprofit
              work, with real payment rails (Paystack, Hubtel mobile money),
              recurring billing, and role-based access control.
            </p>
            <p>
              The proof is in the outcomes. At Hereafter Ghana I built the
              organization&apos;s custom CMS and full Donor Management System
              solo; the donor platform helped raise over GHS 70,000 in its
              first few months and now moves more than GHS 3,000 in Giving
              Friday donations every week, with recurring giving on track for
              around GHS 6,250 a month. And when I hand a system over, it
              comes with documentation, training, and a team that can actually
              run it.
            </p>
            <p>
              I never stop sharpening the toolkit: right now I&apos;m working
              through Harvard&apos;s CS50 to master what happens beneath the
              frameworks, because my goal is not just to use this field but to
              master it and build things nobody has built yet. The next step
              is a remote full-stack role solving meaningful problems
              alongside experienced engineers. The{' '}
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

        {/* At a glance - breaks up the prose */}
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

      {/* The numbers - big figures, small captions */}
      <section className="pb-12 md:pb-16">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6">
          By the numbers
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p className="text-4xl font-medium tracking-tight">{value}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What hiring me actually gets you */}
      <section className="pb-12 md:pb-16">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6">
          What you get
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {valueProps.map(({ title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Experience - the professional record behind the pitch */}
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

      {/* FAQ - full-bleed on mobile, contained surface from sm up */}
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
