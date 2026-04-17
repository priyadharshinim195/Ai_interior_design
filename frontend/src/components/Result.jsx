import { useMemo, useState } from "react";

export default function Result({ result }) {
  const [position, setPosition] = useState(50);

  const hasImages = useMemo(() => {
    return Boolean(result?.beforeImage);
  }, [result]);

  if (!result) {
    return (
      <section className="result-card empty">
        <h3>Preview Canvas</h3>
        <p>Upload a room image and generate your first concept.</p>
      </section>
    );
  }

  if (!hasImages) {
    return (
      <section className="result-card">
        <h3>Preview Canvas</h3>
        <p>Image data is missing in the response.</p>
      </section>
    );
  }

  const hasAfterImage = Boolean(result.afterImage);

  return (
    <section className="result-card">
      <div className="result-title-row">
        <h3>Live Compare Studio</h3>
        <span className="status-pill">
          {result.style ? `${result.style} concept` : "preview"}
        </span>
      </div>

      <div className="compare-shell">
        <img
          src={result.afterImage || result.beforeImage}
          alt="Room after AI design"
          className="compare-image"
        />

        <img
          src={result.beforeImage}
          alt="Room before design"
          className="compare-image"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        {!hasAfterImage && (
          <div className="compare-after-empty" style={{ left: `${position}%` }}>
            Generate design to populate the after view.
          </div>
        )}

        <div className="compare-divider" style={{ left: `${position}%` }} />
      </div>

      <div className="compare-labels">
        <span>Before</span>
        <span>After</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="compare-slider"
      />

      <div className="suggestion">
        <h4>Design Suggestion</h4>
        <p>{result.suggestion || "No text suggestion returned by backend."}</p>
      </div>
    </section>
  );
}
