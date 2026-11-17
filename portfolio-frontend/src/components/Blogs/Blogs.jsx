import { useCallback, useEffect, useState } from "react";

import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import AsyncState from "../ui/AsyncState";
import BlogCard from "./BlogCard";

import api from "../../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch blogs from Spring Boot API
  const fetchBlogs = useCallback(async () => {
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
      setError(
        "Unable to load blogs. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section id="blogs" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blog"
          title="Writing"
          description="Notes on what I'm learning and building in software development."
        />

        <AsyncState
          loading={loading}
          error={error}
          isEmpty={blogs.length === 0}
          onRetry={fetchBlogs}
          emptyTitle="No articles yet"
          emptyDescription="I'm preparing new posts. Stay tuned."
        >
          <FadeIn>
            <div className="bento divided h-full overflow-hidden">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  image={blog.imageUrl}
                  title={blog.title}
                  description={blog.content}
                  category={blog.category}
                  author={blog.author}
                  readTime={blog.readTime}
                />
              ))}
            </div>
          </FadeIn>
        </AsyncState>
      </div>
    </section>
  );
}

export default Blogs;