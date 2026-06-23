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
    api.get("/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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

      setTitle("");
      setContent("");
      setAuthor("");

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

      setEditingId(null);

      setTitle("");
      setContent("");
      setAuthor("");

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
    <div style={{ padding: "20px" }}>
      <h1>Blogs</h1>

      <form onSubmit={handleAddBlog}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) =>
            setAuthor(e.target.value)
          }
        />

        <br /><br />

        {editingId ? (
          <button
            type="button"
            onClick={handleUpdateBlog}
          >
            Update Blog
          </button>
        ) : (
          <button type="submit">
            Publish Blog
          </button>
        )}
      </form>

      <hr />

      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>

          <p>{blog.content}</p>

          <small>
            By {blog.author}
          </small>

          <br /><br />

          <button
            onClick={() =>
              handleEditBlog(blog)
            }
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() =>
              handleDeleteBlog(blog.id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Blogs;