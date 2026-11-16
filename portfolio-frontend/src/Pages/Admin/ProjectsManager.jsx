
import { useCallback, useEffect, useState } from "react";

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
import PaginationControls from "../../components/ui/PaginationControls";
import AdminTableState from "../../components/ui/AdminTableState";

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
  const [deletingId, setDeletingId] = useState(null);

  // Separate errors for loading and form/delete operations
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");

  // Pagination and sorting
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("id,desc");

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");

      const response = await api.get("/projects", {
        params: {
          page,
          size,
          sort,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      setProjects(data);

      setTotalPages(
        response.data?.totalPages ?? (data.length > 0 ? 1 : 0)
      );

      setTotalElements(
        response.data?.totalElements ?? data.length
      );
    } catch (err) {
      console.error("Error fetching projects:", err);

      setLoadError(
        "Unable to load projects. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, size, sort]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
    setFormData({ ...emptyProject });
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
      setFormData({ ...emptyProject });
      setEditingId(null);

      // Refresh the table after saving
      if (editingId === null && page !== 0) {
        setPage(0);
      } else {
        await fetchProjects();
      }
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
      setDeletingId(id);
      setError("");

      await api.delete(`/projects/${id}`);

      // Move to previous page if the last item is deleted
      if (projects.length === 1 && page > 0) {
        setPage((previous) => previous - 1);
      } else {
        await fetchProjects();
      }
    } catch (err) {
      console.error("Error deleting project:", err);

      setError("Unable to delete project. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Change page size
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  // Change sorting
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(0);
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

          {/* Refresh Button */}
          <button
            type="button"
            onClick={fetchProjects}
            disabled={loading}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />

            {loading ? "Refreshing..." : "Refresh"}
          </button>

          {/* Add Project Button */}
          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add Project
          </button>

        </div>
      </div>

      {/* Form / Delete Error Message */}
      {error && (
        <div
          role="alert"
          className="bg-red-100 text-red-700 p-3 rounded-lg mb-5"
        >
          {error}
        </div>
      )}

      {/* Project Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold text-gray-800">
              {editingId !== null
                ? "Edit Project"
                : "Add New Project"}
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              disabled={saving}
              className="text-gray-500 hover:text-red-500 disabled:opacity-50"
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

            {/* Form Buttons */}
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
                disabled={saving}
                className="border px-6 py-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
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

            {/* Loading, Error and Empty States */}
            <AdminTableState
              loading={loading}
              error={loadError}
              isEmpty={projects.length === 0}
              onRetry={fetchProjects}
              columns={5}
              EmptyIcon={FolderKanban}
              emptyTitle="No Projects Yet"
              emptyDescription="You haven't added any projects. Click Add Project to showcase your work."
            />

            {/* Project Rows */}
            {!loading &&
              !loadError &&
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Project */}
                  <td className="p-4">
                    <div className="font-medium text-gray-800">
                      {project.title}
                    </div>

                    <p className="text-sm text-gray-500 max-w-xs truncate">
                      {project.description}
                    </p>
                  </td>

                  {/* Technologies */}
                  <td className="p-4 text-sm">
                    {Array.isArray(project.technologies)
                      ? project.technologies.join(", ")
                      : project.technologies || "-"}
                  </td>

                  {/* Featured */}
                  <td className="p-4">
                    {project.featured ? "Yes" : "No"}
                  </td>

                  {/* Links */}
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

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-3">

                      <button
                        type="button"
                        onClick={() => openEditForm(project)}
                        disabled={deletingId !== null}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-40"
                        title="Edit project"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId !== null}
                        className="text-red-600 hover:text-red-800 disabled:opacity-40"
                        title="Delete project"
                      >
                        {deletingId === project.id ? (
                          <RefreshCw
                            size={18}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

          </tbody>
        </table>
      </div>

      {/* Pagination and Sorting */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        size={size}
        sort={sort}
        onPageChange={setPage}
        onSizeChange={handleSizeChange}
        onSortChange={handleSortChange}
        sortOptions={[
          { value: "id,desc", label: "Newest first" },
          { value: "id,asc", label: "Oldest first" },
          { value: "title,asc", label: "Title A-Z" },
          { value: "title,desc", label: "Title Z-A" },
        ]}
      />

    </div>
  );
}

export default ProjectsManager;
