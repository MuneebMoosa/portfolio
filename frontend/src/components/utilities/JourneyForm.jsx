import { useState } from "react";
import { Save, X } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4B783]";

const JourneyForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [organization, setOrganization] = useState(
    initialData?.organization || ""
  );

  const [roleOrDegree, setRoleOrDegree] = useState(
    initialData?.roleOrDegree || ""
  );

  const [startDate, setStartDate] = useState(
    initialData?.startDate || ""
  );

  const [endDate, setEndDate] = useState(
    initialData?.endDate || ""
  );

  const [isPresent, setIsPresent] = useState(
    initialData ? !initialData.endDate : false
  );

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [icon, setIcon] = useState(
    initialData?.icon || "GraduationCap"
  );

  const [displayOrder, setDisplayOrder] = useState(
    initialData?.displayOrder ?? 0
  );

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !organization.trim() ||
      !roleOrDegree.trim() ||
      !startDate ||
      !description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isPresent && endDate && endDate < startDate) {
      setError("End date cannot be earlier than the start date.");
      return;
    }

    setError("");

    try {
      await onSubmit({
        organization: organization.trim(),
        roleOrDegree: roleOrDegree.trim(),
        startDate,
        endDate: isPresent || !endDate ? null : endDate,
        description: description.trim(),
        icon,
        displayOrder: Number(displayOrder),
      });
    } catch (err) {
      setError(
        err?.data?.message ||
          err?.data?.errors?.[0]?.message ||
          "Failed to save journey entry."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-[#27272a] bg-[#111114] p-5 sm:p-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">
          {initialData ? "Edit journey entry" : "New journey entry"}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Add your education or professional experience.
        </p>
      </div>

      {/* Organization */}
      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Organization / Institution *
        </label>

        <input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="e.g. Thejus Engineering College"
          className={inputClass}
          required
        />
      </div>

      {/* Role or degree */}
      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Role / Degree *
        </label>

        <input
          value={roleOrDegree}
          onChange={(e) => setRoleOrDegree(e.target.value)}
          placeholder="e.g. B.Tech Computer Science and Engineering"
          className={inputClass}
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Start date *
          </label>

          <input
            type="month"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            End date
          </label>

          <input
            type="month"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isPresent}
            className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-40`}
          />
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={isPresent}
          onChange={(e) => setIsPresent(e.target.checked)}
          className="h-4 w-4 accent-[#D4B783]"
        />
        This is my current education or role (Present)
      </label>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Description *
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your studies, responsibilities or achievements..."
          rows={4}
          className={`${inputClass} resize-y`}
          required
        />
      </div>

      {/* Icon */}
      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Timeline icon *
        </label>

        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className={inputClass}
          required
        >
          <option value="GraduationCap">Education — Graduation Cap</option>
          <option value="Briefcase">Work — Briefcase</option>
        </select>
      </div>

      {/* Display order */}
      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Display order
        </label>

        <input
          type="number"
          min="0"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          className={inputClass}
        />

        <p className="mt-2 text-xs text-gray-500">
          Smaller numbers appear first in the timeline.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#D4B783] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e4c99c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} />
          {isLoading ? "Saving..." : "Save entry"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-lg border border-[#27272a] px-4 py-2.5 text-sm text-gray-300 transition hover:bg-[#27272a]"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JourneyForm;