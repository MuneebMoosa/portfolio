import { useState } from "react";
import {
  Plus,
  GraduationCap,
  Briefcase,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

import {
  useGetJourneyQuery,
  useCreateJourneyMutation,
  useUpdateJourneyMutation,
  useDeleteJourneyMutation,
} from "../../services/portfolioApi";

import JourneyForm from "../../components/utilities/JourneyForm";
import ConfirmDialog from "../../components/utilities/ConfirmDialog";

const formatDate = (value) => {
  if (!value) return "";

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const JourneyAdmin = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetJourneyQuery();

  const [createJourney, { isLoading: creating }] =
    useCreateJourneyMutation();

  const [updateJourney, { isLoading: updating }] =
    useUpdateJourneyMutation();

  const [deleteJourney, { isLoading: deleting }] =
    useDeleteJourneyMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState(null);

  const entries = response?.data || [];

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  const handleCreate = async (values) => {
    await createJourney(values).unwrap();

    setShowForm(false);
    showMessage("success", "Journey entry created successfully.");
  };

  const handleUpdate = async (id, values) => {
    await updateJourney({ id, ...values }).unwrap();

    setEditingId(null);
    showMessage("success", "Journey entry updated successfully.");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteJourney(deleteTarget._id).unwrap();

      setDeleteTarget(null);
      showMessage("success", "Journey entry deleted successfully.");
    } catch (err) {
      setDeleteTarget(null);
      showMessage(
        "error",
        err?.data?.message || "Failed to delete journey entry."
      );
    }
  };

  const buttonClass =
    "inline-flex items-center gap-2 rounded-lg border border-[#27272a] px-3 py-2 text-sm text-gray-300 transition hover:border-[#D4B783] hover:text-[#D4B783]";

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading journey...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
        Failed to load journey entries. Please refresh and try again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page heading */}
      <div>
        <p className="mb-3 text-sm text-[#D4B783]">
          CONTENT / JOURNEY
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Journey
            </h1>

            <p className="mt-2 text-gray-400">
              Manage your education and professional experience.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm((current) => !current);
              setEditingId(null);
              setMessage(null);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4B783] px-4 py-3 font-semibold text-black transition hover:bg-[#e4c99c]"
          >
            <Plus size={19} />
            Add entry
          </button>
        </div>
      </div>

      {/* Feedback message */}
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
            aria-label="Dismiss message"
            className="text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <JourneyForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isLoading={creating}
        />
      )}

      {/* Empty state */}
      {entries.length === 0 && !showForm && (
        <div className="rounded-xl border border-dashed border-[#27272a] bg-[#111114] p-10 text-center">
          <GraduationCap
            size={36}
            className="mx-auto text-[#D4B783]"
          />

          <h2 className="mt-4 text-lg font-semibold text-white">
            No timeline entries yet
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Add your education or work experience to get started.
          </p>
        </div>
      )}

      {/* Journey entries */}
      <div className="space-y-5">
        {entries.map((entry) => {
          const Icon =
            entry.icon === "Briefcase" ? Briefcase : GraduationCap;

          const isEditing = editingId === entry._id;

          return (
            <section
              key={entry._id}
              className="overflow-hidden rounded-xl border border-[#27272a] bg-[#111114]"
            >
              {isEditing ? (
                <div className="p-5">
                  <JourneyForm
                    key={entry._id}
                    initialData={entry}
                    onSubmit={(values) =>
                      handleUpdate(entry._id, values)
                    }
                    onCancel={() => setEditingId(null)}
                    isLoading={updating}
                  />
                </div>
              ) : (
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4B783]/20 bg-[#D4B783]/10 text-[#D4B783]">
                        <Icon size={24} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="break-words text-lg font-semibold text-white">
                          {entry.roleOrDegree}
                        </h2>

                        <p className="mt-1 break-words text-[#D4B783]">
                          {entry.organization}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                          <CalendarDays size={15} />

                          <span>
                            {formatDate(entry.startDate)} —{" "}
                            {entry.endDate
                              ? formatDate(entry.endDate)
                              : "Present"}
                          </span>
                        </div>

                        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-400">
                          {entry.description}
                        </p>

                        <p className="mt-3 text-xs text-gray-500">
                          Display order: {entry.displayOrder ?? 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(entry._id);
                          setShowForm(false);
                          setMessage(null);
                        }}
                        className={buttonClass}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(entry)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete journey entry?"
          message={`Are you sure you want to delete "${deleteTarget.roleOrDegree}" at "${deleteTarget.organization}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleting}
        />
      )}
    </div>
  );
};

export default JourneyAdmin;