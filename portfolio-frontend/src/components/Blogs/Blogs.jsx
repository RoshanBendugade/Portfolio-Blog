
import { useCallback, useEffect, useState } from "react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";
import BlogCard from "./BlogCard";
import AsyncState from "../ui/AsyncState";

import api from "../../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("Unable to load blogs. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section
      id="blogs"
      className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <Container>
        <SectionHeading
          subtitle="Blogs"
          title="Latest Articles"
          description="I enjoy sharing my learning journey and technical knowledge through blogs."
        />

        <AsyncState
          loading={loading}
          error={error}
          isEmpty={blogs.length === 0}
          onRetry={fetchBlogs}
          emptyTitle="No Blogs Published Yet"
          emptyDescription="I'm preparing new articles and tutorials. Stay tuned for upcoming posts."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <FadeIn
                key={blog.id}
                delay={index * 0.15}
              >
                <BlogCard
                  image={blog.imageUrl}
                  title={blog.title}
                  description={blog.content}
                  category={blog.category}
                  author={blog.author}
                  readTime={blog.readTime}
                />
              </FadeIn>
            ))}
          </div>
        </AsyncState>
      </Container>
    </section>
  );
}

export default Blogs;
