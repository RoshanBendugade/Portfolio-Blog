import { useEffect, useState } from "react";
import api from "../../services/api";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [featured, setFeatured] = useState(false);

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
    setImageUrl("");
    setGithubUrl("");
    setLiveUrl("");
    setTechnologies("");
    setFeatured(false);
    setEditingId(null);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    const project = {
      title,
      description,
      imageUrl,
      githubUrl,
      liveUrl,
      technologies,
      featured,
    };

    try {
      const response = await api.post("/projects", project);

      setProjects([...projects, response.data]);

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
    setImageUrl(project.imageUrl || "");
    setGithubUrl(project.githubUrl);
    setLiveUrl(project.liveUrl);
    setTechnologies(project.technologies || "");
    setFeatured(project.featured || false);

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
        imageUrl,
        githubUrl,
        liveUrl,
        technologies,
        featured,
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
      className="bg-gray-100 dark:bg-slate-900 min-h-screen py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-12 dark:text-white">
          My Projects
        </h2>

        <ProjectForm
          editingId={editingId}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          githubUrl={githubUrl}
          setGithubUrl={setGithubUrl}
          liveUrl={liveUrl}
          setLiveUrl={setLiveUrl}
          technologies={technologies}
          setTechnologies={setTechnologies}
          featured={featured}
          setFeatured={setFeatured}
          handleAddProject={handleAddProject}
          handleUpdateProject={handleUpdateProject}
          clearForm={clearForm}
        />

        {projects.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-10 text-center shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">
              No projects added yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;