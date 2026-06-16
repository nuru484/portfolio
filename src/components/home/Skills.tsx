// src/components/home/Skills.tsx
import Image from 'next/image';
import skills from '@/static-data/skills';

export function Skills() {
  // Duplicate the list so the marquee can loop seamlessly.
  const marquee = [...skills, ...skills];

  return (
    <section className="w-full overflow-hidden bg-white mb-16">
      <div className="max-w-6xl mx-auto pb-6 px-6 md:px-12 font-urbanist">
        <h1 className="text-4xl text-start md:text-5xl font-medium">Skills</h1>
      </div>

      <div className="relative w-full">
        <div className="animate-infinite-scroll flex">
          {marquee.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 px-4 lg:px-8"
            >
              <div className="h-32 w-48 flex items-center justify-center bg-gray-50 rounded-lg">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  className="h-32 w-auto object-contain opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
