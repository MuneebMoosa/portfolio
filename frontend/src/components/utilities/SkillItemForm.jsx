import { useState } from "react";
import { Save, X } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4B783]";

const SkillItemForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [percent, setPercent] = useState(
    initialData?.percent ?? 80
  );
  const [icon, setIcon] = useState(initialData?.icon || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !icon.trim()) {
      setError("Technology name and icon are required.");
      return;
    }

    const numericPercent = Number(percent);

    if (
      !Number.isFinite(numericPercent) ||
      numericPercent < 0 ||
      numericPercent > 100
    ) {
      setError("Proficiency must be between 0 and 100.");
      return;
    }

    setError("");

    try {
      await onSubmit({
        name: name.trim(),
        percent: numericPercent,
        icon: icon.trim(),
      });
    } catch (err) {
      setError(
        err?.data?.message || "Failed to save technology."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-[#27272a] bg-[#09090b] p-4"
    >
      <h4 className="font-medium text-white">
        {initialData ? "Edit technology" : "Add technology"}
      </h4>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Technology name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. React"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Proficiency ({percent}%)
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          className="w-full accent-[#D4B783]"
        />

        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Icon name
        </label>

        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="e.g. FaReact"
          className={inputClass}
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#D4B783] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c4a36c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} />
          {isLoading ? "Saving..." : "Save technology"}
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

export default SkillItemForm;