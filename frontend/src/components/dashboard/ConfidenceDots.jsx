import React from "react";

// Renders three dots showing confidence: Low (1), Med (2), High (3)
export const ConfidenceDots = ({ level = "High", showLabel = true }) => {
  const filled = level === "High" ? 3 : level === "Med" ? 2 : 1;
  const labelColor =
    level === "High"
      ? "text-slate-700"
      : level === "Med"
      ? "text-slate-700"
      : "text-slate-500";

  return (
    <div className="flex items-center gap-2" data-testid={`confidence-${level.toLowerCase()}`}>
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`inline-block w-2.5 h-2.5 rounded-full transition-colors ${
              i <= filled ? "bg-slate-500" : "border border-slate-300 bg-white"
            }`}
          />
        ))}
      </div>
      {showLabel && <span className={`text-sm ${labelColor}`}>{level}</span>}
    </div>
  );
};

export default ConfidenceDots;
