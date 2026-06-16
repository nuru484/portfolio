'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import testimonials from '@/data/testimonials';

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

  const current = testimonials[currentSlide];

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
            <Image
              src={current.image !== '' ? current.image : '/user-icon.png'}
              alt={current.image !== '' ? current.author : 'default user profile'}
              width={96}
              height={96}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Author Name */}
          <h3 className="text-2xl font-semibold mb-2">{current.author}</h3>

          {/* Role */}
          <p className="text-gray-500 mb-8">{current.role}</p>

          {/* Quote */}
          <p className="text-xl leading-relaxed mb-12">
            &quot;{current.quote}&quot;
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
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
