import { useState } from "react";
import { Code2, Plus, Pencil, Trash2, ChevronDown, ChevronUp, } from "lucide-react";

import {
  useGetSkillsQuery,
  useCreateSkillCategoryMutation,
  useUpdateSkillCategoryMutation,
  useDeleteSkillCategoryMutation,
  useAddSkillItemMutation,
  useUpdateSkillItemMutation,
  useDeleteSkillItemMutation,
} from "../../services/portfolioApi";

import SkillCategoryForm from "../../components/utilities/SkillCategoryForm";
import SkillItemForm from "../../components/utilities/SkillItemForm";
import ConfirmDialog from "../../components/utilities/ConfirmDialog";

const SkillsAdmin = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetSkillsQuery();

  const [createCategory, { isLoading: creatingCategory }] =
    useCreateSkillCategoryMutation();

  const [updateCategory, { isLoading: updatingCategory }] =
    useUpdateSkillCategoryMutation();

  const [deleteCategory, { isLoading: deletingCategory }] =
    useDeleteSkillCategoryMutation();

  const [addSkill, { isLoading: addingSkill }] =
    useAddSkillItemMutation();

  const [updateSkill, { isLoading: updatingSkill }] =
    useUpdateSkillItemMutation();

  const [deleteSkill, { isLoading: deletingSkill }] =
    useDeleteSkillItemMutation();

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [addingSkillCategoryId, setAddingSkillCategoryId] =
    useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState(null);

  // The backend returns { success, count, data }.
  const categories = response?.data || [];

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  const handleCreateCategory = async (values) => {
    await createCategory(values).unwrap();

    setShowCategoryForm(false);
    showMessage("success", "Category created successfully.");
  };

  const handleUpdateCategory = async (id, values) => {
    await updateCategory({ id, ...values }).unwrap();

    setEditingCategoryId(null);
    showMessage("success", "Category updated successfully.");
  };

  const handleAddSkill = async (categoryId, values) => {
    await addSkill({ id: categoryId, ...values }).unwrap();

    setAddingSkillCategoryId(null);
    showMessage("success", "Technology added successfully.");
  };

  const handleUpdateSkill = async (
    categoryId,
    oldSkillName,
    values
  ) => {
    await updateSkill({
      id: categoryId,
      skillName: oldSkillName,
      ...values,
    }).unwrap();

    setEditingSkill(null);
    showMessage("success", "Technology updated successfully.");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "category") {
        await deleteCategory(deleteTarget.category._id).unwrap();

        showMessage("success", "Category deleted successfully.");
      } else {
        await deleteSkill({
          id: deleteTarget.category._id,
          skillName: deleteTarget.skill.name,
        }).unwrap();

        showMessage("success", "Technology deleted successfully.");
      }

      setDeleteTarget(null);
    } catch (err) {
      showMessage(
        "error",
        err?.data?.message || "Could not delete the selected item."
      );
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((current) => ({
      ...current,
      [categoryId]: !(current[categoryId] ?? true),
    }));
  };

  const buttonClass =
    "inline-flex items-center gap-2 rounded-lg border border-[#27272a] px-3 py-2 text-sm text-gray-300 transition hover:border-[#D4B783] hover:text-[#D4B783]";

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading skills...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
        Failed to load skills. Please refresh the page and try again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page heading */}
      <div>
        <p className="mb-3 text-sm text-[#D4B783]">
          CONTENT / SKILLS
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Skills
            </h1>

            <p className="mt-2 text-gray-400">
              Manage categories, technologies and proficiency levels.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowCategoryForm((current) => !current);
              setEditingCategoryId(null);
              setMessage(null);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4B783] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#c4a36c]"
          >
            <Plus size={19} />
            Add category
          </button>
        </div>
      </div>

      {/* Success and error messages */}
      {message && (
        <div
          role="status"
          className={`flex items-center justify-between gap-3 rounded-lg border p-4 text-sm ${
            message.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
              : "border-red-500/20 bg-red-500/5 text-red-400"
          }`}
        >
          <span>{message.text}</span>

          <button
            type="button"
            onClick={() => setMessage(null)}
            className="text-current opacity-70 hover:opacity-100"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {/* Add category form */}
      {showCategoryForm && (
        <SkillCategoryForm
          onSubmit={handleCreateCategory}
          onCancel={() => setShowCategoryForm(false)}
          isLoading={creatingCategory}
        />
      )}

      {/* Empty state */}
      {categories.length === 0 && !showCategoryForm && (
        <div className="rounded-xl border border-dashed border-[#27272a] p-10 text-center">
          <Code2
            size={32}
            className="mx-auto mb-3 text-[#D4B783]"
          />

          <h2 className="font-semibold text-white">
            No skill categories yet
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Create a category to start adding technologies.
          </p>
        </div>
      )}

      {/* Category list */}
      <div className="space-y-5">
        {categories.map((category) => {
          const categoryId = category._id;
          const isExpanded =
            expandedCategories[categoryId] ?? true;

          const skills = category.skills || [];

          return (
            <section
              key={categoryId}
              className="overflow-hidden rounded-xl border border-[#27272a] bg-[#111114]"
            >
              {/* Category header */}
              <div className="flex flex-col gap-4 border-b border-[#27272a] p-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => toggleCategory(categoryId)}
                  className="flex min-w-0 items-center gap-3 text-left"
                >
                  <div className="rounded-lg bg-[#D4B783]/10 p-3 text-[#D4B783]">
                    <Code2 size={22} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white">
                      {category.category}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {skills.length}{" "}
                      {skills.length === 1
                        ? "technology"
                        : "technologies"}
                      {" · "}Order: {category.order ?? 0}
                    </p>
                  </div>

                  {isExpanded ? (
                    <ChevronUp
                      size={18}
                      className="ml-1 shrink-0 text-gray-500"
                    />
                  ) : (
                    <ChevronDown
                      size={18}
                      className="ml-1 shrink-0 text-gray-500"
                    />
                  )}
                </button>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategoryId(categoryId);
                      setShowCategoryForm(false);
                      setAddingSkillCategoryId(null);
                      setEditingSkill(null);
                      setMessage(null);
                    }}
                    className={buttonClass}
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget({
                        type: "category",
                        category,
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit category form */}
              {editingCategoryId === categoryId && (
                <div className="border-b border-[#27272a] p-5">
                  <SkillCategoryForm
                    key={categoryId}
                    initialData={category}
                    onSubmit={(values) =>
                      handleUpdateCategory(categoryId, values)
                    }
                    onCancel={() => setEditingCategoryId(null)}
                    isLoading={updatingCategory}
                  />
                </div>
              )}

              {/* Category content */}
              {isExpanded && (
                <div className="space-y-4 p-5">
                  {skills.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No technologies in this category yet.
                    </p>
                  )}

                  {/* Individual technologies */}
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {skills.map((skill) => {
                      const isEditing =
                        editingSkill?.categoryId === categoryId &&
                        editingSkill?.skillName === skill.name;

                      return (
                        <div
                          key={skill.name}
                          className="min-w-0 rounded-lg border border-[#27272a] bg-[#09090b] p-4"
                        >
                          {isEditing ? (
                            <SkillItemForm
                              key={`${categoryId}-${skill.name}`}
                              initialData={skill}
                              onSubmit={(values) =>
                                handleUpdateSkill(
                                  categoryId,
                                  skill.name,
                                  values
                                )
                              }
                              onCancel={() => setEditingSkill(null)}
                              isLoading={updatingSkill}
                            />
                          ) : (
                            <>
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <h3 className="break-words font-medium text-white">
                                    {skill.name}
                                  </h3>

                                  <p className="mt-1 text-xs text-gray-500">
                                    Icon: {skill.icon}
                                  </p>
                                </div>

                                <div className="flex shrink-0 gap-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingSkill({
                                        categoryId,
                                        skillName: skill.name,
                                      });
                                      setAddingSkillCategoryId(null);
                                      setMessage(null);
                                    }}
                                    aria-label={`Edit ${skill.name}`}
                                    className="rounded-md p-2 text-gray-400 transition hover:bg-[#27272a] hover:text-[#D4B783]"
                                  >
                                    <Pencil size={15} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setDeleteTarget({
                                        type: "skill",
                                        category,
                                        skill,
                                      })
                                    }
                                    aria-label={`Delete ${skill.name}`}
                                    className="rounded-md p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </div>

                              <div className="mt-4">
                                <div className="mb-2 flex justify-between text-xs text-gray-400">
                                  <span>Proficiency</span>
                                  <span>{skill.percent}%</span>
                                </div>

                                <div className="h-1.5 overflow-hidden rounded-full bg-[#27272a]">
                                  <div
                                    className="h-full rounded-full bg-[#D4B783]"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        Math.max(
                                          0,
                                          Number(skill.percent) || 0
                                        )
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add technology button */}
                  {addingSkillCategoryId !== categoryId && (
                    <button
                      type="button"
                      onClick={() => {
                        setAddingSkillCategoryId(categoryId);
                        setEditingSkill(null);
                        setMessage(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#3f3f46] px-4 py-3 text-sm text-gray-400 transition hover:border-[#D4B783] hover:text-[#D4B783]"
                    >
                      <Plus size={17} />
                      Add technology
                    </button>
                  )}

                  {/* Add technology form */}
                  {addingSkillCategoryId === categoryId && (
                    <SkillItemForm
                      key={categoryId}
                      onSubmit={(values) =>
                        handleAddSkill(categoryId, values)
                      }
                      onCancel={() =>
                        setAddingSkillCategoryId(null)
                      }
                      isLoading={addingSkill}
                    />
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title={
            deleteTarget.type === "category"
              ? "Delete category?"
              : "Delete technology?"
          }
          message={
            deleteTarget.type === "category"
              ? `Are you sure you want to delete "${deleteTarget.category.category}"? Its technologies will also be removed.`
              : `Are you sure you want to delete "${deleteTarget.skill.name}" from "${deleteTarget.category.category}"?`
          }
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={
            deleteTarget.type === "category"
              ? deletingCategory
              : deletingSkill
          }
        />
      )}
    </div>
  );
};

export default SkillsAdmin;