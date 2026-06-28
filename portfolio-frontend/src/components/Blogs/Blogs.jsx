import { useEffect, useState } from "react";
import api from "../../services/api";
import BlogCard from "./BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = () => {
    api.get("/blogs").then(r => setBlogs(r.data)).catch(console.error);
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setImageUrl("");
    setCategory("");
    setReadTime("");
    setFeatured(false);
    setEditingId(null);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const blog = { title, content, author, imageUrl, category, readTime, featured };
    const response = await api.post("/blogs", blog);
    setBlogs([...blogs, response.data]);
    clearForm();
  };

  const handleEditBlog = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
    setImageUrl(blog.imageUrl || "");
    setCategory(blog.category || "");
    setReadTime(blog.readTime || "");
    setFeatured(blog.featured || false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateBlog = async () => {
    const updatedBlog = { title, content, author, imageUrl, category, readTime, featured };
    const response = await api.put(`/blogs/${editingId}`, updatedBlog);
    setBlogs(blogs.map(blog => blog.id === editingId ? response.data : blog));
    clearForm();
  };

  const handleDeleteBlog = async (id) => {
    await api.delete(`/blogs/${id}`);
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <section id="blogs" className="bg-gray-100 dark:bg-slate-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-12 dark:text-white">My Blogs</h2>

        <form onSubmit={handleAddBlog} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-16">
          <input className="w-full border rounded-lg p-3 mb-4" placeholder="Blog Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="w-full border rounded-lg p-3 mb-4" rows="5" placeholder="Blog Content" value={content} onChange={e=>setContent(e.target.value)} />
          <input className="w-full border rounded-lg p-3 mb-4" placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} />
          <input className="w-full border rounded-lg p-3 mb-4" placeholder="Cover Image URL" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
          <input className="w-full border rounded-lg p-3 mb-4" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
          <input className="w-full border rounded-lg p-3 mb-4" type="number" placeholder="Reading Time" value={readTime} onChange={e=>setReadTime(e.target.value)} />

          <div className="flex items-center gap-3 mb-6">
            <input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)} />
            <label className="dark:text-white">Featured Blog</label>
          </div>

          {editingId ? (
            <div className="flex gap-4">
              <button type="button" onClick={handleUpdateBlog} className="bg-yellow-500 text-white px-6 py-3 rounded-lg">Update Blog</button>
              <button type="button" onClick={clearForm} className="bg-gray-500 text-white px-6 py-3 rounded-lg">Cancel</button>
            </div>
          ) : (
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Publish Blog</button>
          )}
        </form>

        {blogs.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-10 text-center shadow-lg">
            <p>No blogs published yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} onEdit={handleEditBlog} onDelete={handleDeleteBlog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blogs;
