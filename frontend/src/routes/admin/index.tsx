import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, ExternalLink, Search } from "lucide-react";
import { BlogPost } from "@/components/admin/BlogForm";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { blogApi } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogApi.getPosts();
        setPosts(data);
      } catch (error) {
        toast.error("Failed to load posts from server");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const deletePost = async () => {
    if (deleteId) {
      try {
        await blogApi.deletePost(deleteId);
        setPosts(posts.filter(p => p.id !== deleteId));
        toast.success("Post deleted successfully");
      } catch (error) {
        toast.error("Failed to delete post");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold">Posts Library</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor your website's content.</p>
        </div>
        <Link
          to="/admin/new"
          className="flex items-center gap-2 rounded-full bg-lime-grad px-6 py-3 text-sm font-bold text-lime-foreground shadow-glow"
        >
          <Plus className="h-4 w-4" /> Create New Post
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-5 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Post</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">SEO Score</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                        {post.img && <img src={post.img} className="h-full w-full object-cover" alt="" />}
                      </div>
                      <span className="font-semibold line-clamp-1">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                      {post.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-lime-grad w-[85%]" />
                      </div>
                      <span className="text-xs text-primary font-bold">Good</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition" title="Preview">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <Link 
                        to="/admin/edit/$id" 
                        params={{ id: post.id }}
                        className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition" 
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => setDeleteId(post.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition" 
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                  {searchTerm ? "No matching posts found." : "No posts yet. Start by creating your first article!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="glass border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deletePost}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
