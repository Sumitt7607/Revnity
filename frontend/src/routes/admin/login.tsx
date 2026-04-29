import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize default admin if not exists
    if (!localStorage.getItem("admin_auth")) {
      localStorage.setItem("admin_auth", JSON.stringify({
        email: "admin@revnity.com",
        password: "admin"
      }));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem("admin_auth") || "{}");
    
    if (email === auth.email && password === auth.password) {
      localStorage.setItem("admin_session", "true");
      toast.success("Login successful");
      navigate({ to: "/admin" });
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-grad shadow-glow mb-6">
            <Lock className="h-8 w-8 text-lime-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage Revnity</p>
        </div>

        <div className="glass rounded-[2rem] p-8 shadow-card border border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="admin@revnity.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Removed inline error in favor of toasts */}

            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 rounded-xl bg-lime-grad py-3.5 text-sm font-bold text-lime-foreground shadow-glow transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Access Dashboard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; 2026 Revnity Marketing Agency. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
