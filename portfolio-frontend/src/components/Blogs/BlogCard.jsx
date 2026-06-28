import {
  FaEdit,
  FaTrash,
  FaClock,
  FaUser,
} from "react-icons/fa";

function BlogCard({ blog, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative">
        <img
          src={blog.imageUrl || "https://picsum.photos/600/400"}
          alt={blog.title}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
        />

        {blog.featured && (
          <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ⭐ Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
            {blog.category || "General"}
          </span>

          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300 text-sm">
            <FaClock />
            <span>{blog.readTime || 5} min</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold dark:text-white">
          {blog.title}
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-4">
          {blog.content}
        </p>

        <div className="flex items-center gap-2 mt-5 text-gray-500 dark:text-gray-300">
          <FaUser />
          <span>{blog.author}</span>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onEdit(blog)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(blog.id)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
