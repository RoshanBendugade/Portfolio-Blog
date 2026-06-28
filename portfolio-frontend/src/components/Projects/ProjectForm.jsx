function ProjectForm({
  editingId,
  title,
  setTitle,
  description,
  setDescription,
  imageUrl,
  setImageUrl,
  githubUrl,
  setGithubUrl,
  liveUrl,
  setLiveUrl,
  technologies,
  setTechnologies,
  featured,
  setFeatured,
  handleAddProject,
  handleUpdateProject,
  clearForm,
}) {
  return (
    <form
      onSubmit={handleAddProject}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-16"
    >
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
      />

      <textarea
        rows="4"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Project Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="GitHub URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Live Demo URL"
        value={liveUrl}
        onChange={(e) => setLiveUrl(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Technologies (React, Spring Boot, MySQL)"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4 dark:bg-slate-700 dark:text-white"
      />

      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />

        <label className="dark:text-white">
          Featured Project
        </label>
      </div>

      {editingId ? (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleUpdateProject}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
          >
            Update Project
          </button>

          <button
            type="button"
            onClick={clearForm}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Add Project
        </button>
      )}
    </form>
  );
}

export default ProjectForm;