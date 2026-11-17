import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa6";

import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

function BlogPost() {
  const { id } = useParams();
  const { darkMode, toggleTheme } = useTheme();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  // Load the article
  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;

    api
      .get(`/blogs/${id}`)
      .then((response) => {
        if (!cancelled) setBlog(response.data);
      })
      .catch((err) => {
        if (cancelled) return;

        setError(
          err.response?.status === 404
            ? "This article doesn't exist or has been removed."
            : "Unable to load this article. Please try again later."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Browser tab title
  useEffect(() => {
    if (!blog?.title) return;

    document.title = `${blog.title} | Roshan Bendugade`;

    return () => {
      document.title = "Roshan Bendugade | Java Full Stack Developer";
    };
  }, [blog]);

  // Blank line in the admin editor = new paragraph
  const paragraphs = (blog?.content || "")
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <>
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div className="glass mx-auto flex max-w-3xl items-center justify-between rounded-2xl px-4 py-2.5">
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-[var(--accent)]"
          >
            <FaArrowLeft size={12} />
            All articles
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="icon-btn"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
        {loading && (
          <div className="animate-pulse space-y-4" aria-busy="true">
            <div className="h-4 w-1/4 rounded bg-[var(--soft)]" />
            <div className="h-10 w-4/5 rounded bg-[var(--soft)]" />
            <div className="h-64 rounded-3xl bg-[var(--soft)]" />
            <div className="h-4 w-full rounded bg-[var(--soft)]" />
            <div className="h-4 w-11/12 rounded bg-[var(--soft)]" />
            <div className="h-4 w-2/3 rounded bg-[var(--soft)]" />
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="bento p-10 text-center">
            <h1 className="text-2xl font-bold">Article unavailable</h1>
            <p className="mt-2 text-muted">{error}</p>

            <Link to="/#blogs" className="btn btn-primary mt-6">
              <FaArrowLeft size={13} />
              Back to articles
            </Link>
          </div>
        )}

        {!loading && blog && (
          <article>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-accent">
                {blog.category || "General"}
              </span>

              {blog.readTime && (
                <span className="text-muted">{blog.readTime} min read</span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {blog.title}
            </h1>

            {blog.author && (
              <p className="mt-4 text-muted">By {blog.author}</p>
            )}

            {blog.imageUrl && !imageFailed && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                onError={() => setImageFailed(true)}
                className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
              />
            )}

            <div className="mt-10 space-y-6 text-lg leading-8">
              {paragraphs.map((text, index) => (
                <p key={index} className="whitespace-pre-line">
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-14 border-t border-line pt-8">
              <Link to="/#blogs" className="btn btn-ghost">
                <FaArrowLeft size={13} />
                Back to all articles
              </Link>
            </div>
          </article>
        )}
      </main>
    </>
  );
}

export default BlogPost;