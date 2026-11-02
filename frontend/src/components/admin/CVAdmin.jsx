import { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import {
  API_BASE_URL,
  useGetCvQuery,
  useUploadCvMutation,
} from "../../services/portfolioApi";

const MAX_CV_SIZE = 10 * 1024 * 1024;

function getErrorMessage(error) {
  return (
    error?.data?.message ||
    error?.data?.error ||
    error?.error ||
    "Something went wrong. Please try again."
  );
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString();
}

export default function CVAdmin() {
  const { data: response, isLoading, isError, refetch } =
    useGetCvQuery();
  const [uploadCv, { isLoading: isUploading }] =
    useUploadCvMutation();

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);

  const cv = response?.data || null;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    setMessage(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      event.target.value = "";
      setMessage({
        type: "error",
        text: "Choose a PDF file.",
      });
      return;
    }

    if (file.size > MAX_CV_SIZE) {
      setSelectedFile(null);
      event.target.value = "";
      setMessage({
        type: "error",
        text: "The CV must be 10 MB or smaller.",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!selectedFile) {
      setMessage({
        type: "error",
        text: "Choose a PDF file before uploading.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("cv", selectedFile);

    try {
      const result = await uploadCv(formData).unwrap();

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage({
        type: "success",
        text:
          result?.message ||
          (cv
            ? "CV replaced successfully."
            : "CV uploaded successfully."),
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="mb-3 text-sm text-[#D4B783]">
          CONTENT / CV
        </p>

        <h1 className="text-3xl font-bold text-white">CV</h1>

        <p className="mt-2 text-gray-400">
          Manage the CV downloaded from your public portfolio.
        </p>
      </div>

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

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-sm text-red-400">
            Could not load the current CV.
          </p>

          <button
            type="button"
            onClick={refetch}
            className="mt-3 rounded-lg border border-[#27272a] px-4 py-2 text-sm text-gray-300 transition hover:border-[#D4B783] hover:text-[#D4B783]"
          >
            Try again
          </button>
        </div>
      )}

      <section className="rounded-xl border border-[#27272a] bg-[#111114] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-[#D4B783]/10 p-3 text-[#D4B783]">
            <FileText size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-white">
              Current CV
            </h2>

            {isLoading ? (
              <p className="mt-2 text-sm text-gray-400">
                Loading CV details...
              </p>
            ) : cv ? (
              <>
                <p className="mt-2 break-words text-sm text-white">
                  {cv.fileName}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Last updated: {formatDate(cv.updatedAt)}
                </p>

                <a
                  href={`${API_BASE_URL}/cv/download`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#27272a] px-3 py-2 text-sm text-gray-300 transition hover:border-[#D4B783] hover:text-[#D4B783]"
                >
                  <FileText size={16} />
                  Download current CV
                </a>
              </>
            ) : (
              <p className="mt-2 text-sm text-gray-400">
                No CV has been uploaded yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <form
        onSubmit={handleUpload}
        className="space-y-4 rounded-xl border border-[#27272a] bg-[#111114] p-5 sm:p-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-white">
            {cv ? "Replace CV" : "Upload CV"}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Upload a PDF file, up to 10 MB.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-400 file:mr-3 file:rounded-md file:border-0 file:bg-[#D4B783] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#c4a36c]"
        />

        {selectedFile && (
          <p className="text-sm text-gray-300">
            Selected: {selectedFile.name}
          </p>
        )}

        {isUploading && (
          <div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#27272a]">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#D4B783]" />
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Uploading CV...
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading || !selectedFile}
          className="inline-flex items-center gap-2 rounded-lg bg-[#D4B783] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#c4a36c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload size={18} />
          {isUploading
            ? "Uploading..."
            : cv
              ? "Replace CV"
              : "Upload CV"}
        </button>
      </form>
    </div>
  );
}
