// src/components/home/Hero.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="max-w-6xl font-urbanist mx-auto mb-24 md:mb-32 pt-6 md:pt-12">
      <div className="px-6 md:px-12">
        <p className="text-lg">Hi, I&apos;m Nurudeen</p>
        {/* Fluid size so the longest word ("applications,") fits a 280px
            viewport without mid-word breaks. */}
        <h1 className="text-[clamp(2.1rem,12vw,3rem)] md:text-6xl lg:text-[5.5rem] font-medium leading-tight tracking-normal mt-8 mb-5 md:mb-8">
          I build fast, reliable web applications, end to end.
        </h1>
        <div className="flex justify-between flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-1/2 sm:order-2">
            <p className="text-left text-lg text-muted-foreground leading-relaxed tracking-normal">
              I specialize in designing and developing efficient software
              solutions that streamline workflows and empower businesses to
              achieve their goals.
            </p>
          </div>
          <div className="w-full md:w-1/2 sm:order-1 text-left">
            <Link href="/contact">
              <button className="bg-foreground text-background border border-foreground px-8 py-4 text-lg md:px-14 md:py-6 md:text-xl font-medium rounded-full flex justify-center items-center gap-2 hover:bg-background hover:text-foreground transition-colors duration-500 ease-in-out">
                Contact Me <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
