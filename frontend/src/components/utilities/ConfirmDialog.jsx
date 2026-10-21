import { AlertTriangle, X } from "lucide-react";

const ConfirmDialog = ({ title, message, onConfirm, onCancel, isLoading = false, }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-2xl border border-[#27272a] bg-[#111114] p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-500/10 p-3 text-red-400">
              <AlertTriangle size={22} />
            </div>

            <h3
              id="confirm-dialog-title"
              className="text-lg font-semibold text-white"
            >
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Close confirmation"
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-6 text-sm leading-6 text-gray-400">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg border border-[#27272a] px-4 py-2.5 text-sm text-gray-300 hover:bg-[#27272a] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;