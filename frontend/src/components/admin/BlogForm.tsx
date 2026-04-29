import { useState } from "react";
import { Save, Eye, Settings, Globe, FileText, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { toast } from "sonner";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  tag: string;
  img: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string;
  date: string;
}

interface BlogFormProps {
  initialData?: BlogPost;
  onSave: (data: Omit<BlogPost, "id" | "date">) => void;
}

export function BlogForm({ initialData, onSave }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    tag: initialData?.tag || "Marketing",
    img: initialData?.img || "",
    metaTitle: initialData?.metaTitle || "",
    metaDesc: initialData?.metaDesc || "",
    keywords: initialData?.keywords || "",
  });

  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, img: url }));
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title" && !initialData) {
      setFormData((prev) => ({
        ...prev,
        slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        metaTitle: value // Default meta title to title
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.img) {
      toast.warning("No image selected. Using a default placeholder.");
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === "content" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <FileText className="h-4 w-4" /> Content
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === "seo" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <Globe className="h-4 w-4" /> SEO Settings
          </button>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-lime-grad px-6 py-2.5 text-sm font-bold text-lime-foreground shadow-glow"
        >
          <Save className="h-4 w-4" /> Save Post
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "content" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Post Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a catchy title..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xl font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Content (Markdown supported)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your story here..."
                  rows={15}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <Settings className="h-5 w-5 text-primary" /> Google Search Preview
                </h3>
                <div className="rounded-xl bg-white p-4 text-left font-sans">
                  <p className="text-xs text-[#202124]">revnity.com › blog › {formData.slug || "your-post"}</p>
                  <p className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate">
                    {formData.metaTitle || formData.title || "Meta Title Preview"}
                  </p>
                  <p className="text-sm text-[#4d5156] line-clamp-2 mt-1">
                    {formData.metaDesc || "Enter a meta description to see how this post will appear in search results..."}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground">Optimal: 50-60 characters</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Keywords (comma separated)</label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="marketing, analytics, growth..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                <textarea
                  name="metaDesc"
                  value={formData.metaDesc}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm focus:border-primary focus:outline-none"
                />
                <p className="text-[10px] text-muted-foreground">Optimal: 150-160 characters</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">
            <h3 className="font-bold">Publishing Info</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">URL Slug</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
                <span className="text-muted-foreground">revnity.com/blog/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Marketing" className="text-black">Marketing</option>
                <option value="Lifestyle" className="text-black">Lifestyle</option>
                <option value="Product" className="text-black">Product</option>
                <option value="Hardware" className="text-black">Hardware</option>
                <option value="Workflow" className="text-black">Workflow</option>
                <option value="Insights" className="text-black">Insights</option>
              </select>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h3 className="flex items-center gap-2 font-bold">
              <ImageIcon className="h-4 w-4" /> Featured Image
            </h3>
            <div className="aspect-video relative overflow-hidden rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center group">
              {formData.img ? (
                <>
                  <img src={formData.img} alt="Preview" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <p className="text-[10px] text-white">Click Upload to Change</p>
                  </div>
                </>
              ) : (
                <div className="text-center px-4">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">No image selected</p>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-2.5 text-xs font-semibold cursor-pointer hover:bg-white/10 transition">
                <Upload className="h-3.5 w-3.5" />
                {isUploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Or Paste URL</label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
