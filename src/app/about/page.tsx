// src/app/about/page.tsx
import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { AboutContent } from "@/components/about/AboutContent";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Self-taught full-stack software engineer shipping production platforms end to end in TypeScript, Next.js, Node, and PostgreSQL. Nine live systems, 1,300 endpoints, 4,700+ tests.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main id="main">
        <AboutContent />
      </main>
      <div className="pt-6">
        <Footer />
      </div>
    </>
  );
}
