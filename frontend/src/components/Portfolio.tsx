import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import img1 from "@/assets/portfolio-1.png";
import img2 from "@/assets/portfolio-2.png";
import img3 from "@/assets/portfolio-3.png";

const portfolioItems = [
  {
    id: 1,
    title: "Enterprise Analytics Dashboard",
    category: "SaaS Platform",
    image: img1,
  },
  {
    id: 2,
    title: "Marketing Intelligence Hub",
    category: "Data Visualization",
    image: img2,
  },
  {
    id: 3,
    title: "Global Network Mapping",
    category: "AI Infrastructure",
    image: img3,
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-display text-foreground"
          >
            Proven{" "}
            <span className="bg-lime-grad bg-clip-text text-transparent">
              Results
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Explore how we've empowered leading B2B enterprises to optimize
            their reach and uncover total addressable markets.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group glass rounded-3xl overflow-hidden shadow-card border border-white/10"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="p-3 rounded-full bg-primary text-primary-foreground shadow-glow">
                    <ExternalLink size={22} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            View All Case Studies
          </motion.button>
        </div>
      </div>
    </section>
  );
}
