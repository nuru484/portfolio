// src/components/about/AboutContent.tsx
// The about page is a pitch, not a biography: hook, proof, numbers, how I
// work, record, FAQ. Keep every figure here consistent with the CV and the
// Hereafter Ghana platforms it describes.
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/config/constants";

interface FAQItemProps {
  question: string;
  answer: string;
}

const facts = [
  { label: "Role", value: "Full-Stack Software Engineer" },
  { label: "Stack", value: "TypeScript · React / Next.js · Node · PostgreSQL" },
  { label: "Based in", value: CONTACT.location },
  { label: "Status", value: "Open to remote roles" },
];

// The numbers that sell the story. Update alongside the CV.
const stats = [
  {
    value: "9",
    label: "production platforms shipped end to end, solo",
  },
  {
    value: "1,300",
    label: "REST endpoints across 248 data models",
  },
  {
    value: "4,700+",
    label: "automated tests, most against a real database in CI",
  },
  {
    value: "GHS 70k+",
    label: "raised through my donor platform in its first months",
  },
];

const valueProps = [
  {
    title: "End-to-end ownership",
    body: "One engineer, the whole platform: data model, APIs, payments, background jobs, dashboards, frontend, deployment. Nothing waits on a missing specialist.",
  },
  {
    title: "Production discipline",
    body: "Integration tests against real databases, CI-gated deploys with rollback, audit logs, and documentation are part of every build, not afterthoughts.",
  },
  {
    title: "Measurable outcomes",
    body: "Every build is aimed at a number that matters: funds raised, payments reconciled, hours saved for the team running it.",
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
    company: "Hereafter Ghana",
    role: "Full-Stack Software Engineer & IT Manager",
    period: "Jan 2025 - Jul 2026",
    location: "Tamale, Ghana",
    points: [
      "Designed, built, and deployed the organisation's two production platforms solo: a public website with a custom CMS and a full Donor Management System, together spanning 71 data models and 408 REST endpoints.",
      "Integrated Paystack and Hubtel mobile money with recurring giving, webhook reconciliation, and automated charge sweeps, plus bulk SMS and email with delivery tracking on BullMQ and pg-boss background workers.",
      "Owned hosting, database architecture, and GitHub Actions CI/CD on AWS, and wrote the administration docs and trained the non-technical staff who run both platforms daily.",
    ],
  },
  {
    company: "HackerBoost",
    role: "Full-Stack Developer & Bootcamp Tutor",
    period: "Feb 2025 - Aug 2025",
    location: "Tamale, Ghana",
    points: [
      "Shipped frontend and backend features on the learning platform, improving performance and reliability.",
      "Tutored bootcamp students in web development fundamentals, explaining technical concepts to beginners and non-technical audiences.",
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
              I&apos;m Nurudeen, a self-taught full-stack software engineer. I
              build production platforms on my own, from the data model and APIs
              through payments, background jobs, and admin dashboards to
              deployment and the documentation that keeps them running after I
              hand them over.
            </p>
            <p>
              Over the past two years that has meant real systems for real
              organisations: a donor management platform for a nonprofit, a
              commodity-trading ERP, a hotel booking engine, an e-voting
              platform, and more, all in TypeScript, Next.js, Node, and
              PostgreSQL. Every one of them handles real money, real users, and
              real access control, and most of their tests run against a real
              database in CI.
            </p>
            <p>
              The proof is in what they do. At Hereafter Ghana I single-handedly
              built the organisation&apos;s CMS and Donor Management System; the
              donor platform helped raise over GHS 70,000 in its first months
              and now moves more than GHS 3,000 every week. The trading ERP
              replaced notebooks and WhatsApp with financial statements the
              software proves balance. Each system came with training and
              documentation, so the teams run them without me.
            </p>
            <p>
              I care about the parts that are hard to get right: idempotent
              payments, concurrency-safe inventory, tamper-evident audit trails,
              and deploys that roll back on their own. I&apos;m currently
              working through Harvard&apos;s CS50 to sharpen what sits beneath
              the frameworks. The{" "}
              <Link
                href="/projects"
                className="font-medium text-foreground underline underline-offset-4"
              >
                projects on this site
              </Link>{" "}
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

      {/* Value props - what hiring me delivers */}
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
                  {entry.company}{" "}
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
            question="What do you build?"
            answer="Full-stack web platforms, end to end: custom web applications, REST APIs, payment and messaging integrations (Paystack, Hubtel, SMS, email), database design, admin dashboards, and business systems. I work in TypeScript with React, Next.js, Node, Express, and PostgreSQL, deploying to AWS, Vercel, and Render with CI/CD."
          />
          <FAQItem
            question="How do I get started?"
            answer="Reach out through the contact form or email. After we discuss your goals, I'll send a roadmap with timelines, deliverables, and milestones."
          />
          <FAQItem
            question="What is your pricing?"
            answer="It depends on scope, complexity, and integrations. After an initial conversation I'll provide a fixed quote."
          />
          <FAQItem
            question="Do you work with international clients?"
            answer="Yes. I work remotely with clients across time zones."
          />
        </div>
      </section>
    </div>
  );
}
