import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FilePlus, Globe, LogOut, Settings, Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function AdminNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    navigate({ to: "/admin/login" });
  };

  const NavContent = () => (
    <>
      <div className="flex flex-col h-full">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <span className="relative grid h-8 w-8 place-items-center rounded-md bg-lime-grad shadow-glow">
            <span className="block h-3 w-3 rotate-45 bg-deep" />
          </span>
          <span className="font-display text-lg font-semibold text-white">Revnity Admin</span>
        </Link>

        <div className="space-y-2 flex-1">
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            activeProps={{ className: "bg-primary text-primary-foreground shadow-glow" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/5"
          >
            <LayoutDashboard className="h-4 w-4" />
            Posts Library
          </Link>
          <Link
            to="/admin/new"
            onClick={() => setIsOpen(false)}
            activeProps={{ className: "bg-primary text-primary-foreground shadow-glow" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/5"
          >
            <FilePlus className="h-4 w-4" />
            Write New Post
          </Link>
          <Link
            to="/admin/settings"
            onClick={() => setIsOpen(false)}
            activeProps={{ className: "bg-primary text-primary-foreground shadow-glow" }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/5"
          >
            <Settings className="h-4 w-4" />
            Admin Settings
          </Link>
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/5"
          >
            <Globe className="h-4 w-4" />
            View Live Site
          </a>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[60] bg-deep/80 backdrop-blur border-b border-white/10 p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-md bg-lime-grad shadow-glow">
            <span className="block h-3 w-3 rotate-45 bg-deep" />
          </span>
          <span className="font-display text-base font-semibold text-white">Revnity Admin</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-white/5 text-white"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-0 top-0 bottom-0 z-50 w-64 border-r border-white/10 bg-deep p-6">
        <NavContent />
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            />
            <motion.nav 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-[80] w-72 bg-deep border-r border-white/10 p-6 pt-24"
            >
              <NavContent />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
