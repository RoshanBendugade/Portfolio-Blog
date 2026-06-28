import {
  FaGithub,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-2xl
      overflow-hidden
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >
      {/* Project Image */}

      <div className="relative">

        <img
          src={
            project.imageUrl ||
            "https://picsum.photos/600/400"
          }
          alt={project.title}
          className="
          w-full
          h-56
          object-cover
          hover:scale-105
          transition-transform
          duration-500
          "
        />

        {project.featured && (
          <span
            className="
            absolute
            top-4
            right-4
            bg-orange-500
            text-white
            text-xs
            font-semibold
            px-3
            py-1
            rounded-full
            "
          >
            ⭐ Featured
          </span>
        )}

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="text-2xl font-bold dark:text-white">
          {project.title}
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        {/* Technologies */}

        <div className="flex flex-wrap gap-2 mt-5">

          {project.technologies &&
            project.technologies
              .split(",")
              .map((tech, index) => (
                <span
                  key={index}
                  className="
                  bg-orange-100
                  text-orange-600
                  dark:bg-orange-500/20
                  dark:text-orange-300
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                >
                  {tech.trim()}
                </span>
              ))}

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="
            flex
            items-center
            gap-2
            bg-gray-900
            hover:bg-black
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>

        </div>

        {/* Edit Delete */}

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onEdit(project)}
            className="
            flex
            items-center
            gap-2
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(project.id)}
            className="
            flex
            items-center
            gap-2
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProjectCard;