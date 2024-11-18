import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AboutMePage = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-white font-urbanist">
        {/* Header Section */}
        <header className="text-center py-8 px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            More About Me!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Hi! I'm Nurudeen, a self-taught software developer passionate about
            building dynamic, user-friendly web applications. I honed my skills
            in full-stack development through The Odin Project, tackling
            hands-on projects and real-world coding challenges that equipped me
            with a deep understanding of HTML, CSS, JavaScript, React, Node.js,
            PostgreSQL and more. As a self-learner, I take pride in my ability
            to adapt quickly and persevere through challenges. I thrive on
            bringing ideas to life through code and solving real-world problems
            with innovative solutions. I'm currently seeking opportunities to
            contribute to impactful projects as part of a collaborative team
            while continuing to grow as a developer. When I'm not coding, you’ll
            find me exploring new tech trends or enjoying a good cup of coffee!
          </p>
        </header>

        {/* Experiences Section */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-10">Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience Items */}
            <ExperienceItem
              number="01."
              title="Creative Labs"
              role="Sr. Web Developer & Designer"
              duration="Jan 2024 – Present"
              description="At Creative Labs, I lead a team of designers and developers to deliver high-quality digital products. My role involves overseeing the entire development process."
            />
            <ExperienceItem
              number="02."
              title="Tech Innovations Inc."
              role="Full-Stack Developer"
              duration="Jun 2021 – Dec 2023"
              description="As a Full-Stack Developer at Tech Innovations Inc., I worked on a variety of projects that required both front-end and back-end expertise for developing web applications."
            />
            <ExperienceItem
              number="03."
              title="StartUp Solutions"
              role="Web Developer"
              duration="Aug 2019 – May 2021"
              description="At StartUp Solutions, I began my career as a Web Developer, where I focused on building and maintaining websites for small businesses. I honed my skills in HTML, CSS, JavaScript, and WordPress."
            />
            <ExperienceItem
              number="04."
              title="WebWorks Agency"
              role="Junior Web Developer (Internship)"
              duration="Jun 2017 – Jul 2019"
              description="During my internship at WebWorks Agency, I had the opportunity to work alongside experienced designers on various web design and development projects."
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-8 px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <FAQItem
              question="What services do you offer?"
              answer="I offer web development, web design, full-stack development, and creative consulting for digital projects."
            />
            <FAQItem
              question="How do I get started on a project with you?"
              answer="You can start by reaching out through the contact form or email. After discussing your project, I'll provide a roadmap and timeline for execution."
            />
            <FAQItem
              question="Can you help with creative direction or ideas?"
              answer="Absolutely! I can help brainstorm and provide creative guidance to ensure your project aligns with your brand vision."
            />
            <FAQItem
              question="What is your pricing structure?"
              answer="Pricing varies depending on the scope and complexity of the project. After an initial discussion, I'll provide you with a customized quote that aligns with your specific requirements."
            />
            <FAQItem
              question="Do you work with international clients?"
              answer="Yes, I work with clients worldwide and can accommodate different time zones and project requirements."
            />
          </div>
        </section>
      </div>
      <div className="pt-6">
        <Footer />
      </div>
    </div>
  );
};

// Experience Item Component
const ExperienceItem = ({ number, title, role, duration, description }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">
        {number} <span className="text-gray-700">{title}</span>
      </h3>
      <p className="text-gray-600">
        <strong>{role}</strong> <br />
        {duration}
      </p>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  return (
    <details className="bg-white shadow rounded-lg p-4">
      <summary className="font-medium text-lg cursor-pointer">
        {question}
      </summary>
      <p className="mt-2 text-gray-600">{answer}</p>
    </details>
  );
};

export default AboutMePage;
