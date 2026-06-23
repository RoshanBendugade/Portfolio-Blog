import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    api
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    const project = {
      title,
      description,
      githubUrl,
      liveUrl,
    };

    try {
      const response = await api.post(
        "/projects",
        project
      );

      setProjects([
        ...projects,
        response.data,
      ]);

      setTitle("");
      setDescription("");
      setGithubUrl("");
      setLiveUrl("");

      alert("Project Added!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProject = (project) => {
    setEditingId(project.id);

    setTitle(project.title);
    setDescription(project.description);
    setGithubUrl(project.githubUrl);
    setLiveUrl(project.liveUrl);
  };

  const handleUpdateProject = async () => {
    try {
      const updatedProject = {
        title,
        description,
        githubUrl,
        liveUrl,
      };

      const response = await api.put(
        `/projects/${editingId}`,
        updatedProject
      );

      setProjects(
        projects.map((project) =>
          project.id === editingId
            ? response.data
            : project
        )
      );

      setEditingId(null);

      setTitle("");
      setDescription("");
      setGithubUrl("");
      setLiveUrl("");

      alert("Project Updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);

      setProjects(
        projects.filter(
          (project) => project.id !== id
        )
      );

      alert("Project Deleted!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Projects</h1>

      <form onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Github URL"
          value={githubUrl}
          onChange={(e) =>
            setGithubUrl(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Live URL"
          value={liveUrl}
          onChange={(e) =>
            setLiveUrl(e.target.value)
          }
        />

        <br />
        <br />

        {editingId ? (
          <button
            type="button"
            onClick={handleUpdateProject}
          >
            Update Project
          </button>
        ) : (
          <button type="submit">
            Add Project
          </button>
        )}
      </form>

      <hr />

      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <br />

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>

          <br />
          <br />

          <button
            onClick={() =>
              handleEditProject(project)
            }
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() =>
              handleDeleteProject(project.id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Projects;