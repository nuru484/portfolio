// src/components/home/Services.tsx
import services, { type Service } from '@/static-data/services';

function ServiceCard({ number, title, description }: Service) {
  return (
    <div className="font-urbanist border-t border-border pt-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        {number.toString().padStart(2, '0')}
      </p>
      <div className="mt-3 space-y-3">
        <h3 className="text-3xl font-medium">{title}</h3>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24 md:mb-32 flex flex-col gap-8">
      <h2 className="text-4xl md:text-5xl font-urbanist font-medium">
        Services
      </h2>

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
    </section>
  );
}
