import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    author: 'Mumuni Abdul Gafaru (KENZY)',
    role: 'Student, Tamale Technical University',
    image: '',
    quote:
      'Working with Nurudeen was an incredible experience. I needed a complex system for my final-year project, and they delivered it flawlessly, on time, and with all the features I required. Their professionalism and ability to break down technical concepts made the whole process smooth and stress-free. Thanks to their support, I achieved top marks for my project!',
  },
  {
    id: 2,
    author: 'Zakaria Umar Papaja',
    role: 'Student, Tamale Technical University',
    image: '',
    quote:
      'As a final-year computer science student, I was struggling to bring my project idea to life. Nurudeen not only helped me build a fully functional application but also explained the technical aspects in a way that boosted my confidence. The project exceeded my expectations and received high praise from my professors. Working with Nurudeen was a game-changer for my academic journey!',
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
    <div className="relative max-w-6xl px-6 md:px-12 mx-auto font-urbanist flex flex-col gap-6 mb-16">
      <div className="max-w-6xl  font-urbanist">
        <h1 className="text-4xl md:text-5xl font-medium">Testimonials</h1>
      </div>
      <div>
        {/* Main Content */}
        <div className="flex flex-col items-center mx-auto text-center w-full p-4 md:w-3/4 md:shadow-none md:border-none shadow-md border border-gray-200 rounded-xl">
          {/* Profile Image */}
          <div className="w-24 h-24 mb-6">
            {testimonials[currentSlide].image !== '' ? (
              <img
                src={testimonials[currentSlide].image}
                alt={testimonials[currentSlide].author}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="/user.png"
                alt="default user profile"
                className="w-full h-full rounded-full object-cover"
              />
            )}
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
