
import { useCallback, useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  BookOpen,
} from "lucide-react";

import api from "../../services/api";
import PaginationControls from "../../components/ui/PaginationControls";
import AdminTableState from "../../components/ui/AdminTableState";

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
  const [deletingId, setDeletingId] = useState(null);

  // Separate loading and form/delete errors
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");

  // Pagination and sorting
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("id,desc");

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");

      const response = await api.get("/blogs", {
        params: {
          page,
          size,
          sort,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      setBlogs(data);

      setTotalPages(
        response.data?.totalPages ?? (data.length > 0 ? 1 : 0)
      );

      setTotalElements(
        response.data?.totalElements ?? data.length
      );

    } catch (err) {
      console.error("Error fetching blogs:", err);

      setLoadError(
        "Unable to load blogs. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, size, sort]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle form input changes
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

  // Open create form
  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyBlog });
    setError("");
    setShowForm(true);
  };

  // Open edit form
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

  // Create or update blog
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
      setFormData({ ...emptyBlog });
      setEditingId(null);

      // Return to first page after creating a blog
      if (editingId === null && page !== 0) {
        setPage(0);
      } else {
        await fetchBlogs();
      }

    } catch (err) {
      console.error("Error saving blog:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save blog. Please check your inputs."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await api.delete(`/blogs/${id}`);

      // Move to previous page if the last blog is deleted
      if (blogs.length === 1 && page > 0) {
        setPage((previous) => previous - 1);
      } else {
        await fetchBlogs();
      }

    } catch (err) {
      console.error("Error deleting blog:", err);

      setError("Unable to delete blog. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Change page size
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  // Change sorting
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(0);
  };

  return (
    <div className="p-6">

      {/* Page Header */}
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

          {/* Refresh Button */}
          <button
            type="button"
            onClick={fetchBlogs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />

            {loading ? "Refreshing..." : "Refresh"}
          </button>

          {/* Add Blog Button */}
          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add Blog
          </button>

        </div>
      </div>

      {/* Form / Delete Error */}
      {error && (
        <div
          role="alert"
          className="bg-red-100 text-red-700 p-3 rounded-lg mb-5"
        >
          {error}
        </div>
      )}

      {/* Blog Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              {editingId !== null
                ? "Edit Blog"
                : "Create New Blog"}
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              disabled={saving}
              className="text-gray-500 hover:text-red-500 disabled:opacity-50"
            >
              <X size={22} />
            </button>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Blog Title */}
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

              {/* Author */}
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

              {/* Category */}
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

              {/* Reading Time */}
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

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>

              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Blog Content */}
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

            {/* Featured Blog */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />

              Featured Blog
            </label>

            {/* Form Buttons */}
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
                disabled={saving}
                className="border px-6 py-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
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

            {/* Loading, Error and Empty States */}
            <AdminTableState
              loading={loading}
              error={loadError}
              isEmpty={blogs.length === 0}
              onRetry={fetchBlogs}
              columns={5}
              EmptyIcon={BookOpen}
              emptyTitle="No Blogs Published Yet"
              emptyDescription="You haven't published any blogs. Click Add Blog to share your knowledge."
            />

            {/* Blog Rows */}
            {!loading &&
              !loadError &&
              blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Title */}
                  <td className="p-4 font-medium">
                    {blog.title}
                  </td>

                  {/* Author */}
                  <td className="p-4">
                    {blog.author}
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    {blog.category || "-"}
                  </td>

                  {/* Featured */}
                  <td className="p-4">
                    {blog.featured ? "Yes" : "No"}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-3">

                      <button
                        type="button"
                        onClick={() => openEditForm(blog)}
                        disabled={deletingId !== null}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-40"
                        title="Edit blog"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId !== null}
                        className="text-red-600 hover:text-red-800 disabled:opacity-40"
                        title="Delete blog"
                      >
                        {deletingId === blog.id ? (
                          <RefreshCw
                            size={18}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

          </tbody>
        </table>
      </div>

      {/* Pagination and Sorting */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        size={size}
        sort={sort}
        onPageChange={setPage}
        onSizeChange={handleSizeChange}
        onSortChange={handleSortChange}
        sortOptions={[
          { value: "id,desc", label: "Newest first" },
          { value: "id,asc", label: "Oldest first" },
          { value: "title,asc", label: "Title A-Z" },
          { value: "title,desc", label: "Title Z-A" },
          { value: "author,asc", label: "Author A-Z" },
        ]}
      />

    </div>
  );
}

export default BlogsManager;
