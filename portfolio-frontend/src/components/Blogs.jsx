import { useEffect, useState } from "react";
import api from "../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    api
      .get("/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setEditingId(null);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const blog = {
      title,
      content,
      author,
    };

    try {
      const response = await api.post(
        "/blogs",
        blog
      );

      setBlogs([
        ...blogs,
        response.data,
      ]);

      clearForm();

      alert("Blog Added!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingId(blog.id);

    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdateBlog = async () => {
    try {
      const updatedBlog = {
        title,
        content,
        author,
      };

      const response = await api.put(
        `/blogs/${editingId}`,
        updatedBlog
      );

      setBlogs(
        blogs.map((blog) =>
          blog.id === editingId
            ? response.data
            : blog
        )
      );

      clearForm();

      alert("Blog Updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);

      setBlogs(
        blogs.filter(
          (blog) => blog.id !== id
        )
      );

      alert("Blog Deleted!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      id="blogs"
      className="bg-gray-100 min-h-screen py-10"
    >
     <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          My Blogs
        </h1>

        <form
          onSubmit={handleAddBlog}
          className="bg-white shadow-lg rounded-xl p-6 mb-10"
        >
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            rows="5"
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          {editingId ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleUpdateBlog}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
              >
                Update Blog
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Publish Blog
            </button>
          )}
        </form>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow">
            <p className="text-gray-500">
              No blogs published yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold">
                  {blog.title}
                </h2>

                <p className="mt-3 text-gray-700">
                  {blog.content}
                </p>

                <p className="mt-4 text-gray-500">
                  By {blog.author}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      handleEditBlog(blog)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteBlog(blog.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Blogs;