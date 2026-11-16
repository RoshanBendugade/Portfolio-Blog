
function BlogCard({
  image,
  title,
  description,
  category,
  author,
  readTime,
}) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition duration-500 hover:-translate-y-2">

      {/* Blog Image */}
      <div className="overflow-hidden h-56">
        <img
          src={image || "/portfolio.png"}
          alt={title || "Blog image"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/portfolio.png";
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-6">

        {/* Category and Reading Time */}
        <div className="flex justify-between items-center gap-2 text-sm text-orange-500">
          <span>{category || "General"}</span>

          {readTime && (
            <span>{readTime} min read</span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-2xl font-bold dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7 line-clamp-4 whitespace-pre-line">
          {description || "No description available."}
        </p>

        {/* Author */}
        {author && (
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Written by <span className="font-semibold text-orange-500">{author}</span>
          </p>
        )}

      </div>
    </div>
  );
}

export default BlogCard;
