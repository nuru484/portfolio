// src/components/home/Testimonials.tsx
import { getPublishedTestimonials } from '@/lib/testimonials/testimonial-service';
import { TestimonialsGrid } from '@/components/home/TestimonialsGrid';

export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="max-w-6xl px-6 md:px-12 mx-auto font-urbanist flex flex-col gap-8 mb-24 md:mb-32">
      <div>
        <h2 className="text-4xl md:text-5xl font-medium">Testimonials</h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          What clients and collaborators say about working with me.
        </p>
      </div>
      <TestimonialsGrid testimonials={testimonials} />
    </section>
  );
}
