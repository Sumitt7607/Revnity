import { createFileRoute, Outlet, redirect, useNavigate, useLocation } from "@tanstack/react-router";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_session") === "true";
    if (!isAuth && location.pathname !== "/admin/login") {
      navigate({ to: "/admin/login" });
    }
  }, [location.pathname]);

  const isLoginPage = location.pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      <AdminNavbar />
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-10 min-h-screen pt-20 lg:pt-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
