import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    author: 'Alex Rodriguez',
    role: 'Technical Lead, InnovateTech',
    image: '/profile.jpg',
    quote:
      'The development team exceeded all our expectations. Their technical prowess and attention to detail transformed our concept into a robust, scalable solution. The way they handled our complex requirements while maintaining code quality was truly impressive.',
  },
  {
    id: 2,
    author: 'Lisa Chen',
    role: 'VP of Operations, DataFlow Systems',
    image: '/profile.jpg',
    quote:
      'Working with this development team was a game-changer for our data processing pipeline. They not only understood our technical challenges but provided innovative solutions that improved our system efficiency by 200%. Their communication and project management were exceptional.',
  },
  {
    id: 3,
    author: 'Marcus Thompson',
    role: 'CEO, CloudScale Solutions',
    image: '/profile.jpg',
    quote:
      'Finding a development partner who understands both the technical and business aspects is rare. This team not only delivered a superior product but also provided strategic insights that helped us better serve our enterprise clients. Their expertise in cloud architecture was invaluable.',
  },
];

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-urbanist">
      <div className="relative">
        {/* Main Content */}
        <div className="flex flex-col items-center mx-auto text-center w-5/6 py-4 md:w-3/4 md:shadow-none md:border-none shadow-md border border-gray-200 rounded-xl">
          {/* Profile Image */}
          <div className="w-24 h-24 mb-6">
            <img
              src={testimonials[currentSlide].image}
              alt={testimonials[currentSlide].author}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Author Name */}
          <h3 className="text-2xl font-semibold mb-2">
            {testimonials[currentSlide].author}
          </h3>

          {/* Role */}
          <p className="text-gray-500 mb-8">
            {testimonials[currentSlide].role}
          </p>

          {/* Quote */}
          <p className="text-xl leading-relaxed mb-12">
            "{testimonials[currentSlide].quote}"
          </p>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
          aria-label="Previous testimonial"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
          aria-label="Next testimonial"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
