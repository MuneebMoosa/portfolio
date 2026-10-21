import { useState } from "react";
import { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation, } from "../../services/portfolioApi";

const PROJECT_TYPES = [
  "Full Stack",
  "Frontend",
  "Backend",
  "Chrome Extension",
  "AI/ML",
  "Mobile App",
  "Other",
];

const emptyForm = {
  title: "",
  description: "",
  type: {
    name: "Full Stack",
    icon: "Layers",
  },
  techStack: "",
  image: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
};

const inputClass = "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#D4B783]";

const labelClass = "mb-1.5 block text-sm text-zinc-300";

function getErrorMessage(error) {
  return (
    error?.data?.message ||
    error?.data?.error ||
    error?.error ||
    "Something went wrong. Please try again."
  );
}

function ProjectForm({ initialProject, onCancel, onSave, isSaving, saveError, }) {
  const [form, setForm] = useState(() => {
    if (!initialProject) return { ...emptyForm };

    return {
      title: initialProject.title || "",
      description: initialProject.description || "",
      type: {
        name: initialProject.type?.name || "Full Stack",
        icon: initialProject.type?.icon || "Layers",
      },
      techStack: (initialProject.techStack || [])
        .map((technology) => `${technology.name}|${technology.icon}`)
        .join("\n"),
      image: initialProject.image || "",
      liveUrl: initialProject.liveUrl || "",
      githubUrl: initialProject.githubUrl || "",
      featured: initialProject.featured || false,
      order: initialProject.order ?? 0,
    };
  });

  const [validationError, setValidationError] = useState("");

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");

    const technologies = form.techStack
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf("|");

        if (separator === -1) {
          return { name: line.trim(), icon: "" };
        }

        return {
          name: line.slice(0, separator).trim(),
          icon: line.slice(separator + 1).trim(),
        };
      });

    if (!form.title.trim() || !form.description.trim()) {
      setValidationError("Title and description are required.");
      return;
    }

    if (!form.type.icon.trim()) {
      setValidationError("Please provide a project type icon name.");
      return;
    }

    if (
      technologies.some(
        (technology) => !technology.name || !technology.icon
      )
    ) {
      setValidationError(
        'Each technology must use the format "React|FaReact".'
      );
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      type: {
        name: form.type.name,
        icon: form.type.icon.trim(),
      },
      techStack: technologies,
      image: form.image.trim(),
      liveUrl: form.liveUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      featured: form.featured,
      order: Number(form.order) || 0,
    };

    await onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">
          {initialProject ? "Edit project" : "Add new project"}
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Fields marked with * are required.
        </p>
      </div>

      <div>
        <label className={labelClass}>Project title *</label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Pulse Chat"
          required
        />
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea
          className={inputClass}
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Describe what the project does..."
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Project type *</label>
          <select
            className={inputClass}
            value={form.type.name}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                type: { ...previous.type, name: e.target.value },
              }))
            }
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Type icon name *</label>
          <input
            className={inputClass}
            value={form.type.icon}
            onChange={(e) =>
              setForm((previous) => ({
                ...previous,
                type: { ...previous.type, icon: e.target.value },
              }))
            }
            placeholder="Layers"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Technology stack</label>
        <textarea
          className={inputClass}
          rows={4}
          value={form.techStack}
          onChange={(e) => updateField("techStack", e.target.value)}
          placeholder={"One technology per line:\nReact|FaReact\nNode.js|FaNodeJs\nWebRTC|SiWebrtc"}
        />
        <p className="mt-1.5 text-xs text-zinc-500">
          Enter each technology as its name, a vertical bar, and its icon key.
          Leave empty if the project has no technologies to list.
        </p>
      </div>

      <div>
        <label className={labelClass}>Image URL</label>
        <input
          className={inputClass}
          type="url"
          value={form.image}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Live project URL</label>
          <input
            className={inputClass}
            type="url"
            value={form.liveUrl}
            onChange={(e) => updateField("liveUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass}>GitHub URL</label>
          <input
            className={inputClass}
            type="url"
            value={form.githubUrl}
            onChange={(e) => updateField("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Display order</label>
          <input
            className={inputClass}
            type="number"
            value={form.order}
            onChange={(e) => updateField("order", e.target.value)}
          />
          <p className="mt-1 text-xs text-zinc-500">
            Smaller numbers appear first.
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-3 self-center rounded-lg border border-zinc-800 p-3">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="h-4 w-4 accent-[#D4B783]"
          />
          <span className="text-sm text-zinc-200">
            Featured project
          </span>
        </label>
      </div>

      {(validationError || saveError) && (
        <p className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">
          {validationError || getErrorMessage(saveError)}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-[#D4B783] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-[#e5cda2] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving
            ? "Saving..."
            : initialProject
              ? "Save changes"
              : "Create project"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ProjectsAdmin() {
  const { data: response, isLoading, isError, error, refetch } =
    useGetProjectsQuery();

  const [createProject, createState] = useCreateProjectMutation();
  const [updateProject, updateState] = useUpdateProjectMutation();
  const [deleteProject, deleteState] = useDeleteProjectMutation();

  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const projects = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : [];

  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(search.toLowerCase())
  );

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setSaveError(null);
  };

  const handleSave = async (payload) => {
    setSaveError(null);
    setSuccessMessage("");

    try {
      if (editingProject) {
        await updateProject({
          id: editingProject._id,
          ...payload,
        }).unwrap();

        setSuccessMessage("Project updated successfully.");
      } else {
        await createProject(payload).unwrap();
        setSuccessMessage("Project created successfully.");
      }

      closeForm();
    } catch (err) {
      setSaveError(err);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setSuccessMessage("");

    try {
      await deleteProject(project._id).unwrap();
      setSuccessMessage("Project deleted successfully.");
    } catch (err) {
      setSaveError(err);
    }
  };

  const openCreateForm = () => {
    setEditingProject(null);
    setSaveError(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setSaveError(null);
    setShowForm(true);
  };

  const isSaving = createState.isLoading || updateState.isLoading;

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 p-4 text-left text-zinc-100 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#D4B783]">PORTFOLIO MANAGEMENT</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-lg bg-[#D4B783] px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-[#e5cda2]"
          >
            + Add project
          </button>
        )}
      </header>

      {successMessage && (
        <div className="rounded-lg border border-emerald-900 bg-emerald-950/30 p-3 text-sm text-emerald-300">
          {successMessage}
        </div>
      )}

      {deleteState.isError && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-3 text-sm text-red-300">
          {getErrorMessage(deleteState.error)}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-5">
          <p className="text-sm text-red-300">
            Could not load projects: {getErrorMessage(error)}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="mt-3 rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
          >
            Try again
          </button>
        </div>
      )}

      {showForm && (
        <ProjectForm
          key={editingProject?._id || "new-project"}
          initialProject={editingProject}
          onCancel={closeForm}
          onSave={handleSave}
          isSaving={isSaving}
          saveError={saveError}
        />
      )}

      {!showForm && (
        <>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by title..."
              className={`${inputClass} sm:max-w-sm`}
            />
            <p className="self-center text-sm text-zinc-400">
              {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-zinc-800 p-8 text-center text-zinc-400">
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center">
              <p className="font-medium text-zinc-200">
                {search ? "No matching projects" : "No projects yet"}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {search
                  ? "Try a different search term."
                  : "Add your first project to get started."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-zinc-900 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Project</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Featured</th>
                    <th className="px-4 py-3 font-medium">Order</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      className="transition hover:bg-zinc-900/60"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-white">
                          {project.title}
                        </p>
                        <p className="mt-1 max-w-xs truncate text-xs text-zinc-500">
                          {project.description}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-zinc-300">
                        {project.type?.name || "—"}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={
                            project.featured
                              ? "rounded-full bg-emerald-950 px-2.5 py-1 text-xs text-emerald-300"
                              : "rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
                          }
                        >
                          {project.featured ? "Featured" : "No"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-zinc-300">
                        {project.order ?? 0}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(project)}
                            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs hover:border-[#D4B783] hover:text-[#D4B783]"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={deleteState.isLoading}
                            onClick={() => handleDelete(project)}
                            className="rounded-md border border-red-900 px-3 py-1.5 text-xs text-red-300 hover:bg-red-950 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}