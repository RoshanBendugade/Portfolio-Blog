import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

function BlogCard({ id, image, title, description, category, author, readTime }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article>
      <Link
        to={`/blog/${id}`}
        className="group flex items-start gap-5 p-5 transition-colors hover:bg-[var(--soft)] sm:p-6"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-semibold text-accent">
              {category || "General"}
            </span>

            {readTime && (
              <span className="text-muted">{readTime} min read</span>
            )}
          </div>

          <h3 className="mt-2 text-xl font-bold tracking-tight transition-colors group-hover:text-accent">
            {title}
          </h3>

          <p className="mt-2 line-clamp-2 whitespace-pre-line leading-7 text-muted">
            {description || "No description available."}
          </p>

          <div className="mt-3 flex items-center gap-3 text-sm">
            {author && <span className="text-muted">By {author}</span>}

            <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
              Read article
              <FaArrowRight
                size={11}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>

        {image && !imageFailed && (
          <img
            src={image}
            alt={title || "Blog image"}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="hidden h-24 w-36 shrink-0 rounded-xl object-cover sm:block"
          />
        )}
      </Link>
    </article>
  );
}

export default BlogCard;