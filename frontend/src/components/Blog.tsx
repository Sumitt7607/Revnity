import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogPost } from "./admin/BlogForm";
import { blogApi } from "@/lib/api";
import featured from "@/assets/blog-tech.jpg";
import keys from "@/assets/blog-keys.jpg";
import watch from "@/assets/blog-watch.jpg";
import dash from "@/assets/dashboard-stack.jpg";

const staticPosts = [
  { id: "1", tag: "Hardware", title: "What to expect on your first technical interview?", img: keys, date: "April 2026" },
  { id: "2", tag: "Lifestyle", title: "Designing for time: lessons from watchmakers", img: watch, date: "April 2026" },
  { id: "3", tag: "Product", title: "Inside our analytics dashboard rebuild", img: dash, date: "April 2026" },
];

export function Blog() {
  const [posts, setPosts] = useState<any[]>(staticPosts);
  const [featuredPost, setFeaturedPost] = useState<any>({
    tag: "Our Reviews",
    title: "What to expect on your first technical interview?",
    img: featured,
    date: "April 2026"
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const dynamicPosts = await blogApi.getPosts();
        if (dynamicPosts.length > 0) {
          setFeaturedPost(dynamicPosts[0]);
          setPosts(dynamicPosts.slice(1).concat(staticPosts).slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold leading-tight sm:text-5xl"
          >
            News, events, our <span className="text-shimmer">internal activities</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:justify-self-end"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-lime-grad px-5 py-2.5 text-sm font-semibold text-lime-foreground shadow-glow"
            >
              Discover more
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl shadow-card"
          >
            <img
              src={featuredPost.img}
              alt={featuredPost.title}
              loading="lazy"
              className="h-[480px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {featuredPost.tag}
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
                {featuredPost.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">5 min read · {featuredPost.date}</p>
            </div>
            <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </motion.article>

          {/* Stack */}
          <div className="flex flex-col gap-6">
            {posts.map((p, i) => (
              <motion.article
                key={p.id + i}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-4 overflow-hidden rounded-2xl bg-card-grad p-3 shadow-card sm:flex-row"
              >
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:w-36">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between py-1 pr-3">
                  <span className="w-fit rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {p.tag}
                  </span>
                  <h4 className="text-base font-semibold leading-snug transition group-hover:text-primary">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">3 min read</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
