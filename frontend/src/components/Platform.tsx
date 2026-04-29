import { motion } from "framer-motion";
import { Moon } from "lucide-react";

const steps = [
  { n: "01", t: "Ideal Customer Profiling", d: "Defining ICP and target audience personas with precision targeting." },
  { n: "02", t: "Insights and Suggestions", d: "Curating precise insights aligned with your ICP and suggesting targeting options." },
  { n: "03", t: "Validation and Implementation", d: "Delivery of high-accuracy data to enable your marketing strategy execution." },
];

export function Platform() {
  return (
    <section id="platform" className="relative overflow-hidden bg-deep py-16 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        {/* fake dashboard */}
        <div className="relative h-[320px] sm:h-[420px]">
          <div className="absolute inset-0 origin-top scale-75 sm:scale-100">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute left-0 top-0 w-56 rounded-3xl bg-card p-5 shadow-card animate-float"
          >
            <p className="text-xs text-muted-foreground">Market Reach</p>
            <div className="mt-3 flex items-end gap-3">
              <span className="font-display text-4xl font-bold text-primary">92%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="h-full bg-lime-grad"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="absolute right-4 top-12 w-48 rounded-3xl bg-card p-5 shadow-card sm:right-0 sm:w-52"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Data Accuracy</p>
                <p className="text-sm font-semibold">Verified leads</p>
              </div>
              <Moon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-5 w-9 rounded-full bg-primary p-0.5">
                <span className="block h-4 w-4 translate-x-4 rounded-full bg-deep" />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="absolute bottom-0 left-4 w-72 rounded-3xl bg-card p-5 shadow-card"
          >
            <p className="text-xs text-muted-foreground">Lead Volume</p>
            <svg viewBox="0 0 200 70" className="mt-3 h-20 w-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.88 0.22 130)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.88 0.22 130)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6 }}
                d="M0,55 L25,40 L50,48 L80,20 L110,30 L140,12 L170,28 L200,8"
                fill="none"
                stroke="oklch(0.88 0.22 130)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M0,55 L25,40 L50,48 L80,20 L110,30 L140,12 L170,28 L200,8 L200,70 L0,70 Z" fill="url(#g1)" opacity="0.6" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute bottom-12 right-0 w-36 rounded-2xl bg-card p-4 shadow-card sm:right-2"
          >
            <p className="text-xs text-muted-foreground">ROI</p>
            <p className="font-display text-2xl font-bold">12x</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </motion.div>
          </div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          >
            ◆ Revnity Intelligence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-bold sm:text-5xl"
          >
            Data-driven decisions for{" "}
            <span className="text-shimmer">scalable growth.</span>
          </motion.h2>

          <div className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-card/40 p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.n}
                </span>
                <div>
                  <h4 className="font-semibold">{s.t}</h4>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
