// src/components/about/AboutContent.tsx
import Image from 'next/image';
import { CONTACT } from '@/config/constants';

interface FAQItemProps {
  question: string;
  answer: string;
}

const facts = [
  { label: 'Role', value: 'Full-Stack Developer' },
  { label: 'Stack', value: 'PERN (Postgres · Express · React · Node)' },
  { label: 'Based in', value: CONTACT.location },
  { label: 'Status', value: 'Open to opportunities' },
];

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="bg-card border border-border shadow-sm rounded-lg p-4">
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
              Hi! I&apos;m Nurudeen, a self-taught software developer passionate
              about building dynamic, user-friendly web applications. I honed my
              skills in full-stack development through The Odin Project — tackling
              hands-on projects and real-world coding challenges that gave me a
              deep understanding of HTML, CSS, JavaScript, React, Node.js,
              PostgreSQL and more.
            </p>
            <p>
              As a self-learner, I take pride in adapting quickly and persevering
              through challenges. I thrive on bringing ideas to life through code
              and solving real-world problems with innovative solutions. I&apos;m
              currently seeking opportunities to contribute to impactful projects
              as part of a collaborative team while continuing to grow. When
              I&apos;m not coding, you&apos;ll find me exploring new tech trends or
              enjoying a good cup of coffee!
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

      {/* FAQ — full-bleed on mobile, contained surface from sm up */}
      <section className="py-12 md:py-16 sm:bg-muted sm:rounded-2xl sm:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <FAQItem
            question="What services do you offer?"
            answer="I offer full-stack web development, including custom web applications, API integration, database management and custom business software systems. I specialize in the PERN stack (PostgreSQL, Express, React, Node.js) but am adaptable to other technologies as needed."
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
