import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Awards } from "@/components/Awards";
import { Features } from "@/components/Features";
import { Platform } from "@/components/Platform";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Articles } from "@/components/Articles";
import { Blog } from "@/components/Blog";
import { CtaFooter } from "@/components/CtaFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Revnity — Industry-leading Marketing Solutions" },
      { name: "description", content: "Revnity helps businesses identify, engage, and expand their customer base with data-driven marketing and technographic intelligence." },
      { property: "og:title", content: "Revnity — Industry-leading Marketing Solutions" },
      { property: "og:description", content: "Identify, engage, and expand your customer base with our comprehensive database and global market intelligence." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Awards />
      <Features />
      <Platform />
      <Marquee />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Blog />
      <Articles />
      <CtaFooter />
    </main>
  );
}
