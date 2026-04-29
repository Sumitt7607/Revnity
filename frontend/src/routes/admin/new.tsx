import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BlogForm, BlogPost } from "@/components/admin/BlogForm";
import { ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { blogApi } from "@/lib/api";

export const Route = createFileRoute("/admin/new")({
  component: NewBlogPost,
});

function NewBlogPost() {
  const navigate = useNavigate();

  const handleSave = async (data: Omit<BlogPost, "id" | "date">) => {
    try {
      await blogApi.createPost(data);
      toast.success("Post published successfully!");
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error("Failed to publish post");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white transition">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground text-sm">Write something amazing for your audience.</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-card/40 p-8 shadow-card">
        <BlogForm onSave={handleSave} />
      </div>
    </div>
  );
}
