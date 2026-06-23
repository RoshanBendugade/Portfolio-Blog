function ProjectCard({ project }) {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <a href={project.githubUrl}>GitHub</a>
      <br />
      <a href={project.liveUrl}>Live Demo</a>
      <hr />
    </div>
  );
}

export default ProjectCard;