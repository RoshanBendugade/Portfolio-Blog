import { useState } from "react";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

function ProjectCard({
  image,
  title,
  description,
  technologies = [],
  github,
  live,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasLive = live && live !== "#";
  const showImage = image && !imageFailed;

  return (
    <article className="bento lift group flex h-full flex-col overflow-hidden">
      {/* Image */}
      <div className="h-44 shrink-0 overflow-hidden bg-[var(--soft)]">
        {showImage ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-4xl font-bold text-accent">
            {title?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
          {description}
        </p>

        {technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span key={tech} className="chip !px-2.5 !py-0.5 !text-xs">
                {tech}
              </span>
            ))}
          </div>
        )}

        {(github || hasLive) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <FaGithub size={14} />
                Code
              </a>
            )}

            {hasLive && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Live demo
                <FaArrowUpRightFromSquare size={11} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;