// src/components/about/AboutContent.tsx

interface ExperienceItemProps {
  number: string;
  title: string;
  role?: string;
  duration: string;
  description: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function ExperienceItem({
  number,
  title,
  role,
  duration,
  description,
}: ExperienceItemProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">
        {number} <span className="text-muted-foreground">{title}</span>
      </h3>
      <p className="text-muted-foreground">
        <strong>{role}</strong> <br />
        {duration}
      </p>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="bg-card border border-border shadow rounded-lg p-4">
      <summary className="font-medium text-lg cursor-pointer">
        {question}
      </summary>
      <p className="mt-2 text-muted-foreground">{answer}</p>
    </details>
  );
}

export function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 bg-background font-urbanist">
      {/* Header Section */}
      <div className="py-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          More About Me!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hi! I&apos;m Nurudeen, a self-taught software developer passionate
          about building dynamic, user-friendly web applications. I honed my
          skills in full-stack development through The Odin Project, tackling
          hands-on projects and real-world coding challenges that equipped me
          with a deep understanding of HTML, CSS, JavaScript, React, Node.js,
          PostgreSQL and more. As a self-learner, I take pride in my ability to
          adapt quickly and persevere through challenges. I thrive on bringing
          ideas to life through code and solving real-world problems with
          innovative solutions. I&apos;m currently seeking opportunities to
          contribute to impactful projects as part of a collaborative team while
          continuing to grow as a developer. When I&apos;m not coding,
          you&apos;ll find me exploring new tech trends or enjoying a good cup of
          coffee!
        </p>
      </div>

      {/* Experiences Section */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ExperienceItem
            number="01."
            title="SSNIT (Social Security and National Insurance Trust), Tamale"
            role="National Service Personnel"
            duration="Nov. 2021 – Feb. 2022"
            description="During my national service at SSNIT, I developed a strong understanding of professional work ethics by collaborating with teams in a structured, fast-paced environment. Working in one of Ghana's largest institutions taught me the importance of accountability, effective communication, and meeting deadlines. This experience also honed my ability to adapt to organizational workflows and contribute meaningfully to achieving team goals. These skills have become invaluable as I pursue a career in web development, enabling me to approach projects with discipline, organization, and a collaborative mindset."
          />
          <ExperienceItem
            number="02."
            title="Freelance Graphic Designer"
            duration="Jun. 2019 – Dec 2023"
            description="Worked as a freelance graphic designer, creating visually compelling designs for clients across various industries. This experience sharpened my creativity, attention to detail, and understanding of user-centered design principles. These skills seamlessly complement my work as a full-stack developer, enabling me to design and implement aesthetically pleasing and intuitive interfaces for my projects."
          />
          <ExperienceItem
            number="03."
            title="Freelance Software Developer"
            duration="Aug 2024 – Present"
            description="Specializing in full-stack development with the PERN stack (PostgreSQL, Express, React, Node.js), I design and deliver dynamic, user-focused web applications. My adaptability allows me to quickly learn and apply new languages or frameworks to tackle diverse challenges. Notable projects include: A nutrition tracking app to help users monitor dietary habits with personalized dashboards. An e-voting system featuring real-time result counting and secure user authentication. This combination of technical expertise and a commitment to continuous learning ensures effective solutions tailored to client needs."
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-8 md:px-8">
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
