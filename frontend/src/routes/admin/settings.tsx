import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Lock, Save, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem("admin_auth") || "{}");

    if (currentPass !== auth.password) {
      toast.error("Existing password is incorrect.");
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPass.length < 4) {
      toast.error("Password must be at least 4 characters.");
      return;
    }

    // Update password
    localStorage.setItem("admin_auth", JSON.stringify({ ...auth, password: newPass }));
    toast.success("Password updated successfully!");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and security preferences.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[2rem] p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Security & Password</h3>
              <p className="text-xs text-muted-foreground">Change your existing password here.</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Existing Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="Minimum 4 characters"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="Repeat new password"
                />
              </div>
            </div>

            {/* Removed inline messages in favor of toasts */}

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-lime-grad px-6 py-3 text-sm font-bold text-lime-foreground shadow-glow w-full justify-center transition hover:scale-[1.02]"
            >
              <Save className="h-4 w-4" /> Update Password
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass rounded-[2rem] p-8 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Security Info</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-xs">1</div>
                No email or OTP required for internal password changes.
              </li>
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-xs">2</div>
                Always use a strong password to protect your admin access.
              </li>
              <li className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-xs">3</div>
                Your session persists in this browser until you logout.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
