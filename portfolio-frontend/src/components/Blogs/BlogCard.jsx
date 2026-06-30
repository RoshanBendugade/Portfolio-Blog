import { FaArrowRight } from "react-icons/fa";

function BlogCard({
  image,
  title,
 description,
  category,
  date,
  link,
}) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition duration-500 hover:-translate-y-2">

      <div className="overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-6">

        <div className="flex justify-between text-sm text-orange-500">
          <span>{category}</span>
          <span>{date}</span>
        </div>

        <h3 className="mt-4 text-2xl font-bold dark:text-white">
          {title}
        </h3>

        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
          {description}
        </p>

        <a
          href={link}
          className="inline-flex items-center gap-2 mt-6 text-orange-500 font-semibold hover:gap-3 transition-all"
        >
          Read More
          <FaArrowRight />
        </a>

      </div>
    </div>
  );
}

export default BlogCard;