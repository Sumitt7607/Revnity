import { motion } from "framer-motion";
import holo from "@/assets/holo-cube.jpg";
import phone from "@/assets/dark-phone.jpg";
import dash from "@/assets/dashboard-stack.jpg";
import silk from "@/assets/silk-blue.jpg";
import meeting from "@/assets/meeting.jpg";
import professional from "@/assets/professional.jpg";
import team from "@/assets/team.jpg";
import collaboration from "@/assets/collaboration.jpg";
import boardroom from "@/assets/boardroom.jpg";

const items = [
  { title: "Hyper-Targeted Customer Profiling", tag: "Precision", img: collaboration, span: "md:col-span-2" },
  { title: "Cutting-Edge Tech Insights", tag: "AI Powered", img: boardroom, span: "md:col-span-3" },
  { title: "Technographic Intelligence", tag: "B2B Data", img: phone, span: "md:col-span-3" },
  { title: "Channel Partner Insights", tag: "Growth", img: team, span: "md:col-span-2" },
  { title: "Revenue-Driven Marketing", tag: "Strategy", img: meeting, span: "md:col-span-5" },
];

function TiltCard({ src, title, tag, className = "" }: { src: string; title: string; tag: string; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotate: -1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative overflow-hidden rounded-3xl shadow-card ${className}`}
    >
      <img src={src} alt={title} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/10 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white/90 backdrop-blur">
            {tag}
          </span>
          <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
        </div>
        <span className="grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center text-2xl font-bold sm:text-5xl"
        >
          Grow Your Business Fast with{" "}
          <span className="inline-block rounded-xl bg-deep px-3 py-1 text-primary">
            Revnity Intelligence
          </span>{" "}
          and Services
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={it.span}
            >
              <TiltCard src={it.img} title={it.title} tag={it.tag} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 max-w-2xl text-center text-muted-foreground"
        >
          Equip your teams with precision-driven strategies to maximize revenue growth. 
          Identify the right prospects and boost conversions with high-intent lead insights.
        </motion.p>
      </div>
    </section>
  );
}
