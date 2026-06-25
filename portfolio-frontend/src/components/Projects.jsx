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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setGithubUrl("");
    setLiveUrl("");
    setEditingId(null);
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

      clearForm();

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

      clearForm();

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
    <section
      id="projects"
      className="bg-gray-100 min-h-screen py-10"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          My Projects
        </h1>

        <form
          onSubmit={handleAddProject}
          className="bg-white shadow-lg rounded-xl p-6 mb-10"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
            rows="4"
          />

          <input
            type="text"
            placeholder="GitHub URL"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Live Demo URL"
            value={liveUrl}
            onChange={(e) =>
              setLiveUrl(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          {editingId ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleUpdateProject}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
              >
                Update Project
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Add Project
            </button>
          )}
        </form>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow">
            <p className="text-gray-500">
              No projects added yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="mt-3 text-gray-600">
                  {project.description}
                </p>

                <div className="flex gap-3 mt-5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Live Demo
                  </a>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      handleEditProject(project)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteProject(project.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;