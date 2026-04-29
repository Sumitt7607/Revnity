import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      >
        <div className="glass flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 shadow-card">
          <a href="/" className="flex items-center gap-2">
            <span className="relative grid h-8 w-8 place-items-center rounded-md bg-lime-grad shadow-glow">
              <span className="block h-3 w-3 rotate-45 bg-deep" />
            </span>
            <span className="font-display text-lg font-semibold">Revnity</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {["Home", "Services", "Platform", "Articles", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="relative transition hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-white/5 hover:text-foreground">
              <Search className="h-4 w-4" />
            </button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-lime-grad px-4 py-2 text-sm font-semibold text-lime-foreground shadow-glow sm:inline-flex"
            >
              Get Started <ArrowUpRight className="h-4 w-4" />
            </motion.a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground md:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-card/95 p-8 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center text-lg font-medium">
              {["Home", "Services", "Platform", "Articles", "Contact"].map((l) => (
                <a 
                  key={l} 
                  href={`#${l.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="transition hover:text-primary"
                >
                  {l}
                </a>
              ))}
              <hr className="border-white/10" />
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-lime-grad py-3 text-sm font-bold text-lime-foreground"
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
