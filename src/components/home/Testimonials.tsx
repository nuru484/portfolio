// src/components/home/Testimonials.tsx
import { getPublishedTestimonials } from '@/lib/testimonials/testimonial-service';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';

export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="max-w-6xl px-6 md:px-12 mx-auto font-urbanist flex flex-col gap-8 mb-24 md:mb-32">
      <h1 className="text-4xl md:text-5xl font-medium">Testimonials</h1>
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}
