import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CtaFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-deep">
      <section className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-card-grad p-10 shadow-card md:p-16"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-blob" />

          <p className="text-sm uppercase tracking-[0.25em] text-primary">Get in touch</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-6xl">
            Power Up Your Marketing <span className="text-shimmer">Edge today.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }} 
              href="mailto:sales@revnitymarketing.com"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
            >
              Contact Sales <ArrowUpRight className="h-4 w-4" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }} 
              href="tel:+13452876422"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold"
            >
              Call Us: +1 345 287 6422 <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="relative grid h-8 w-8 place-items-center rounded-md bg-lime-grad">
              <span className="block h-3 w-3 rotate-45 bg-deep" />
            </span>
            <span className="font-display text-lg font-semibold">Revnity</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Revnity. Specialists in digital identity and B2B intelligence.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Twitter</a>
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
