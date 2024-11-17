const ServiceCard = ({ number, title, description }) => (
  <div className="flex items-center gap-10 font-urbanist">
    <div className="relative">
      <div
        style={{
          WebkitTextStroke: '1px black',
          color: 'transparent',
        }}
        className="absolute -rotate-90 origin-top-left text-6xl font-semibold text-gray-200 -translate-y-4"
      >
        {number.toString().padStart(2, '0')}
      </div>
    </div>
    <div className="pl-8 space-y-4">
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  </div>
);

const Services = () => {
  const services = [
    {
      number: 1,
      title: 'Backend Development',
      description:
        'I craft robust and scalable server-side solutions that power modern applications. Through efficient architecture and secure implementation, I build reliable systems that handle complex business logic and data processing with precision.',
    },
    {
      number: 2,
      title: 'Frontend Development',
      description:
        'Developing responsive and dynamic user interfaces that deliver exceptional experiences. I focus on creating clean, maintainable code that brings designs to life while ensuring optimal performance and cross-browser compatibility.',
    },
    {
      number: 3,
      title: 'Database Design',
      description:
        'Architecting efficient and organized database structures that scale. I design with data integrity and performance in mind, ensuring proper relationships, indexing, and query optimization for seamless data management and retrieval.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mb-16 flex flex-col gap-6">
      <h1 className="text-4xl md:text-5xl font-urbanist font-medium">
        Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service) => (
          <ServiceCard
            key={service.number}
            number={service.number}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
