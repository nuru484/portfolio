// src/components/home/Skills.tsx
import skills from '@/static-data/skills';

/** Plain, static list of skill names — no logos, no marquee. */
export function Skills() {
  return (
    <section className="mb-24 md:mb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h2 className="text-4xl md:text-5xl font-medium">Skills</h2>

        <ul className="mt-6 md:mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-xl md:text-2xl text-muted-foreground">
          {skills.map((skill, i) => (
            <li key={skill} className="flex items-baseline gap-x-3">
              <span className="min-w-0 [overflow-wrap:anywhere]">{skill}</span>
              {i < skills.length - 1 && (
                <span aria-hidden className="text-muted-foreground/50 select-none">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
