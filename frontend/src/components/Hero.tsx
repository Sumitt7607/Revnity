import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef } from "react";

const word = {
  hidden: { y: "120%", opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const headline = ["Marketing", "Edge", "With", "Data"];

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-hero pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* animated blobs */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute -top-20 -left-32 h-[300px] w-[300px] rounded-full bg-accent/40 blur-3xl animate-blob sm:h-[420px] sm:w-[420px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute top-40 -right-24 h-[250px] w-[250px] rounded-full bg-primary/30 blur-3xl animate-blob sm:right-[-120px] sm:h-[380px] sm:w-[380px]"
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />

      {/* floating squiggle */}
      <motion.svg
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 left-6 h-16 w-32 animate-float md:left-16"
        viewBox="0 0 120 40"
        fill="none"
      >
        <path
          d="M2 20 Q 20 2, 40 20 T 80 20 T 118 20"
          stroke="oklch(0.78 0.18 340)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.svg>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-6xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Welcome to Revnity
        </motion.span>

        <h1 className="mt-4 flex max-w-4xl flex-wrap gap-y-2 text-[2.75rem] font-bold leading-[1.1] tracking-tight sm:text-7xl md:text-8xl">
          <span className="w-full">Power Up Your</span>
          {headline.map((w, i) => (
            <span key={w + i} className="mr-3 inline-block align-bottom sm:mr-4">
              <motion.span variants={word} initial="hidden" animate="show" custom={i} className="inline-block">
                {i === 1 ? <span className="text-shimmer">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-lg"
        >
          Unlock growth with a data-driven approach to technology marketing. Access 35,000+ vendors 
          and products to enhance your sales and marketing strategies and identify your total addressable market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-lime-grad px-6 py-3 text-sm font-semibold text-lime-foreground shadow-glow"
          >
            Get Free Sample
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
          <a href="#platform" className="group inline-flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-foreground/95 text-background">
              <span className="absolute inset-0 animate-ping rounded-full bg-foreground/30" />
              <Play className="relative h-4 w-4 fill-current" />
            </span>
            <span className="text-sm font-medium">How it Works</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
