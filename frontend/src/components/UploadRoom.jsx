import { useState } from "react";
import API from "../services/api";

const styleOptions = [
  { value: "modern", label: "Modern" },
  { value: "luxury", label: "Luxury" },
  { value: "scandinavian", label: "Scandinavian" },
  { value: "bohemian", label: "Bohemian" },
  { value: "latino", label: "Latino" },
  { value: "industrial", label: "Industrial" },
  { value: "minimalist", label: "Minimalist" },
];

export default function UploadRoom({
  setResult,
  setLoading,
  setError,
  loading = false,
}) {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("modern");

  const toAbsoluteUrl = (value) => {
    if (!value) return "";

    if (/^https?:\/\//i.test(value) || value.startsWith("blob:")) {
      return value;
    }

    const baseURL = API.defaults.baseURL || "http://127.0.0.1:8000";
    return `${baseURL.replace(/\/$/, "")}/${value.replace(/^\//, "")}`;
  };

  const extractAfterImage = (data) => {
    if (!data) return "";

    // backend returns { image: "uploads/xxx.png" }
    if (data.image) {
      return toAbsoluteUrl(data.image);
    }

    return "";
  };

  const handleSubmit = async () => {
    if (!file) {
      setError?.({
        type: "validation",
        message: "Please choose a room image first.",
      });
      return;
    }

    const beforeImage = URL.createObjectURL(file);

    try {
      setLoading?.(true);
      setError?.(null);

      const resizedFile = await resizeImage(file);

      const formData = new FormData();
      formData.append("image", resizedFile);
      formData.append("style", style);

      const res = await API.post("/generate-design", formData);

      setResult({
        beforeImage,
        afterImage: extractAfterImage(res.data),
        suggestion: res?.data?.design_suggestion || "",
        raw: res.data,
        style,
      });

    } catch (error) {
      URL.revokeObjectURL(beforeImage);

      setError?.({
        type: "request",
        message:
          error?.response?.data?.detail ||
          "Could not generate design. Please try again.",
      });
    } finally {
      setLoading?.(false);
    }
  };

  return (
    <section className="studio-controls">
      <div className="panel-head">
        <h2>Design Controls</h2>
        <p>Upload your room and generate a styled interior transformation.</p>
      </div>

      <div className="control-block">
        <label className="control-label">Room Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="control-block">
        <label className="control-label">Design Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {styleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="style-chips">
        {styleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`chip ${style === option.value ? "active" : ""}`}
            onClick={() => setStyle(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        className="primary-btn"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Generating..." : "Generate Design"}
      </button>

      <p className="hint-text">
        {file
          ? `Selected: ${file.name}`
          : "Tip: bright, front-facing room photos work best."}
      </p>
    </section>
  );
}

const resizeImage = (file, maxWidth = 1024) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = maxWidth / img.width;

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, {
          type: "image/jpeg",
        });

        resolve(resizedFile);
      }, "image/jpeg", 0.7);
    };

    reader.readAsDataURL(file);
  });
};