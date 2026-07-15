// src/components/home/Skills.tsx
import skillGroups from '@/static-data/skills';

/** Grouped, static skill lists — no logos, no marquee. */
export function Skills() {
  return (
    <section className="mb-24 md:mb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist">
        <h2 className="text-4xl md:text-5xl font-medium">Skills</h2>

        <div className="mt-6 md:mt-8 flex flex-col divide-y divide-border">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="grid gap-1.5 py-5 md:grid-cols-[11rem_1fr] md:items-baseline md:gap-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {group.label}
              </h3>
              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-lg md:text-xl text-muted-foreground">
                {group.items.map((skill, i) => (
                  <li key={skill} className="flex items-baseline gap-x-3">
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {skill}
                    </span>
                    {i < group.items.length - 1 && (
                      <span
                        aria-hidden
                        className="text-muted-foreground/50 select-none"
                      >
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
