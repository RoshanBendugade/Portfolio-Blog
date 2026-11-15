
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  ExternalLink,
  FolderKanban,
  Code,
} from "lucide-react";

import api from "../../services/api";

const emptyProject = {
  title: "",
  description: "",
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
  technologies: "",
  featured: false,
};

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content ||
          response.data?.projects ||
          response.data?.data ||
          [];

      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Unable to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Open add form
  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyProject);
    setError("");
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (project) => {
    setEditingId(project.id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      featured: Boolean(project.featured),
    });

    setError("");
    setShowForm(true);
  };

  // Create or update project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      if (editingId !== null) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post("/projects", payload);
      }

      setShowForm(false);
      setFormData(emptyProject);
      setEditingId(null);

      await fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save project. Please check your inputs."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(`/projects/${id}`);

      setProjects((previous) =>
        previous.filter((project) => project.id !== id)
      );
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Unable to delete project.");
    }
  };

  return (
    <div className="p-6">

      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Project Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create, update and manage your portfolio projects.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchProjects}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* Project Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingId !== null ? "Edit Project" : "Add New Project"}
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Title *
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                  placeholder="Enter project title"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Technologies
                </label>

                <input
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="Java, Spring Boot, React, MySQL"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  GitHub URL
                </label>

                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="https://github.com/username/project"
                />
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Live Project URL
                </label>

                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="https://example.com"
                />
              </div>

            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Image URL
              </label>

              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://example.com/project-image.jpg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border rounded-lg p-3"
                placeholder="Describe your project..."
              />
            </div>

            {/* Featured */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />

              <span className="text-sm font-medium">
                Mark as Featured Project
              </span>
            </label>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update Project"
                    : "Create Project"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border px-6 py-3 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Project</th>
              <th className="p-4">Technologies</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Links</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center">
                  Loading projects...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  <FolderKanban
                    className="mx-auto mb-2 text-gray-400"
                    size={32}
                  />
                  No projects found. Click Add Project to create one.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    <div className="font-medium text-gray-800">
                      {project.title}
                    </div>

                    <p className="text-sm text-gray-500 max-w-xs truncate">
                      {project.description}
                    </p>
                  </td>

                  <td className="p-4 text-sm">
                    {Array.isArray(project.technologies)
                      ? project.technologies.join(", ")
                      : project.technologies || "-"}
                  </td>

                  <td className="p-4">
                    {project.featured ? "Yes" : "No"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-700 hover:text-orange-500"
                          title="GitHub"
                        >
                          <Code size={19} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          title="Live Project"
                        >
                          <ExternalLink size={19} />
                        </a>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">

                      <button
                        onClick={() => openEditForm(project)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit project"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete project"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ProjectsManager;
