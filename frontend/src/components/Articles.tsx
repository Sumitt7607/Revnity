import { motion } from "framer-motion";
import team from "@/assets/team-work.jpg";
import holo from "@/assets/holo-cube.jpg";
import dash from "@/assets/dashboard-stack.jpg";

const posts = [
  { tag: "Our Reviews", title: "What to expect on your first technical interview?", img: holo },
  { tag: "Insights", title: "How design systems scale your product team", img: dash },
  { tag: "Workflow", title: "A field guide to remote-first creative teams", img: team },
];

export function Articles() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold sm:text-5xl"
          >
            Latest <span className="text-primary">articles</span> & insights
          </motion.h2>
          <a href="#" className="text-sm font-semibold text-primary">View all →</a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl bg-card-grad shadow-card"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-snug transition group-hover:text-primary">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">5 min read · April 2026</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
