// src/components/home/Skills.tsx
import Image from 'next/image';
import skills from '@/static-data/skills';

export function Skills() {
  // Duplicate the list so the marquee can loop seamlessly.
  const marquee = [...skills, ...skills];

  return (
    <section className="w-full overflow-hidden mb-24 md:mb-32">
      <div className="max-w-6xl mx-auto pb-8 px-6 md:px-12 font-urbanist">
        <h1 className="text-4xl text-start md:text-5xl font-medium">Skills</h1>
      </div>

      <div className="relative w-full">
        <div className="animate-infinite-scroll flex">
          {marquee.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 px-3 lg:px-5"
            >
              <div className="skill-tile h-32 w-48 flex flex-col items-center justify-center gap-2 rounded-xl border border-border p-6 shadow-sm">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={160}
                  height={64}
                  className="max-h-14 w-auto object-contain"
                />
                <span className="text-sm font-medium text-zinc-700">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
