import { useState } from "react";
import { Save, X } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-[#27272a] bg-[#09090b] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4B783]";

const SkillCategoryForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [category, setCategory] = useState(
    initialData?.category || ""
  );

  const [icon, setIcon] = useState(initialData?.icon || "");

  const [order, setOrder] = useState(
    initialData?.order ?? 0
  );

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim() || !icon.trim()) {
      setError("Category name and icon are required.");
      return;
    }

    setError("");

    try {
      await onSubmit({
        category: category.trim(),
        icon: icon.trim(),
        order: Number(order),
      });
    } catch (err) {
      setError(
        err?.data?.message || "Failed to save category."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-[#27272a] bg-[#111114] p-5"
    >
      <h3 className="text-lg font-semibold text-white">
        {initialData ? "Edit category" : "New skill category"}
      </h3>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Category name
        </label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Frontend"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Icon name
        </label>

        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="e.g. FaCode"
          className={inputClass}
          required
        />

        <p className="mt-2 text-xs text-gray-500">
          Use an icon key supported by your portfolio's icon registry.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Display order
        </label>

        <input
          type="number"
          min="0"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className={inputClass}
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
          {isLoading ? "Saving..." : "Save category"}
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

export default SkillCategoryForm;