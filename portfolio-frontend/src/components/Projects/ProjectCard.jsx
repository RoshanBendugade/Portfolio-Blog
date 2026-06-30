import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function ProjectCard({
  image,
  title,
  description,
  technologies,
  github,
  live,
}) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-lg hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-3">

      {/* Image */}

      <div className="overflow-hidden h-60">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}

      <div className="p-6">

        <h3 className="text-2xl font-bold dark:text-white">
          {title}
        </h3>

        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
          {description}
        </p>

        {/* Technologies */}

        <div className="flex flex-wrap gap-2 mt-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-8">

          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>

        </div>

      </div>

    </div>
  );
}

export default ProjectCard;