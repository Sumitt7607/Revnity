import { motion } from "framer-motion";
import { Users, BarChart3, Building2, Globe } from "lucide-react";

const features = [
  { icon: Users, title: "200M+ Personas", desc: "Access a comprehensive database of global professionals and key decision-makers." },
  { icon: BarChart3, title: "150+ Insights", desc: "Detailed analytics and technographic data points for every company profile in our system." },
  { icon: Building2, title: "45M+ Companies", desc: "Deep insights on the customer base of over 45,000 technologies and company profiles." },
  { icon: Globe, title: "140+ Countries", desc: "Global presence and comprehensive coverage to help you identify and expand your market reach." },
];

export function Features() {
  return (
    <section id="features" className="bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl bg-card-grad p-8 shadow-card"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/30 blur-3xl transition group-hover:bg-primary/30" />
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="relative grid h-14 w-14 place-items-center rounded-2xl bg-accent/30 text-foreground"
            >
              <f.icon className="h-6 w-6" />
            </motion.div>
            <h3 className="relative mt-6 text-xl font-semibold sm:text-2xl">{f.title}</h3>
            <p className="relative mt-3 max-w-md text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
