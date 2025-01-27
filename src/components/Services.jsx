import services from '../data/services';
import PropTypes from 'prop-types';

const ServiceCard = ({ number, title, description }) => (
  <div className="font-urbanist">
    <div className="relative pl-10">
      <div
        style={{
          WebkitTextStroke: '1px black',
          color: 'transparent',
          transform: 'translate(-100%, -0%) rotate(-90deg)',
        }}
        className="absolute text-6xl font-semibold text-gray-200 "
      >
        {number.toString().padStart(2, '0')}
      </div>

      <div className=" space-y-4">
        <h2 className="text-3xl font-medium">{title}</h2>

        <p className="text-gray-600 text-lg leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  </div>
);

ServiceCard.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Services = () => {
  return (
    <div className="max-w-6xl mx-auto  px-6 md:px-12 mb-16 flex flex-col gap-6">
      <h1 className="text-4xl md:text-5xl font-urbanist font-medium">
        Services
      </h1>

      <div className="grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
