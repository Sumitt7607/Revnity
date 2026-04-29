import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Revnity's technographic insights have completely transformed how we target SaaS companies. Our sales pipeline is stronger than ever.",
    author: "Sarah Jenkins",
    role: "VP of Marketing, TechGrowth",
  },
  {
    id: 2,
    quote:
      "The title-based database provided us with exactly the right decision-makers. We saw a 3x increase in our email outreach response rates.",
    author: "Michael Chang",
    role: "Director of Sales, CloudScale",
  },
  {
    id: 3,
    quote:
      "Exceptional data accuracy and partner intelligence. The platform is incredibly intuitive, making ICP data discovery effortless for our team.",
    author: "Elena Rodriguez",
    role: "Growth Lead, EnterpriseStack",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* ambient glows */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/3 w-72 h-72 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-primary"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-display text-foreground"
          >
            Trusted by{" "}
            <span className="bg-lime-grad bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-10 shadow-card relative">
          <Quote
            size={56}
            className="absolute top-8 right-8 text-primary/15"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </p>
              <div>
                <h4 className="font-bold text-foreground">
                  {testimonials[currentIndex].author}
                </h4>
                <span className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
