
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import api from "../../services/api";

const emptyBlog = {
  title: "",
  content: "",
  author: "",
  imageUrl: "",
  category: "",
  readTime: 5,
  featured: false,
};

function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState(emptyBlog);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/blogs");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Unable to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "readTime"
            ? Number(value)
            : value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyBlog);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (blog) => {
    setEditingId(blog.id);

    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      author: blog.author || "",
      imageUrl: blog.imageUrl || "",
      category: blog.category || "",
      readTime: blog.readTime ?? 5,
      featured: Boolean(blog.featured),
    });

    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await api.put(`/blogs/${editingId}`, formData);
      } else {
        await api.post("/blogs", formData);
      }

      setShowForm(false);
      setFormData(emptyBlog);
      setEditingId(null);

      await fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      setError(
        err.response?.data?.message || "Unable to save blog."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await api.delete(`/blogs/${id}`);
      await fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      setError("Unable to delete blog.");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Blog Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage your portfolio blogs.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Blog
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* Blog Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">
              {editingId !== null ? "Edit Blog" : "Create New Blog"}
            </h2>

            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-red-500"
              type="button"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Blog Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Author
                </label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="Technology, Java, Cloud..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reading Time (minutes)
                </label>
                <input
                  type="number"
                  name="readTime"
                  min="1"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Blog Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={7}
                className="w-full border rounded-lg p-3"
                placeholder="Write your blog content..."
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Blog
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update Blog"
                    : "Create Blog"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Category</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center">
                  Loading blogs...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No blogs found. Click Add Blog to create one.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-medium">
                    {blog.title}
                  </td>

                  <td className="p-4">
                    {blog.author}
                  </td>

                  <td className="p-4">
                    {blog.category || "-"}
                  </td>

                  <td className="p-4">
                    {blog.featured ? "Yes" : "No"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">

                      <button
                        onClick={() => openEditForm(blog)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit blog"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete blog"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default BlogsManager;
