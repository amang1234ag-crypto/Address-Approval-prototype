import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Reusable metric card used across the top of the dashboard.
 * Variants:
 *  - "plain"       -> icon + label + value (no arrow, not clickable)
 *  - "clickable"   -> icon + label + value + right arrow (opens popover)
 *  - "wide"        -> single-line summary with arrow on the right (used for Track Record)
 */
export const MetricCard = React.forwardRef(function MetricCard(
  {
    icon: Icon,
    iconColor = "text-slate-500",
    label,
    value,
    variant = "plain",
    onClick,
    active = false,
    testId,
    className = "",
  },
  ref
) {
  const isClickable = variant === "clickable" || variant === "wide";

  const Wrapper = isClickable ? motion.button : "div";
  const wrapperProps = isClickable
    ? {
        onClick,
        whileHover: { y: -1 },
        whileTap: { scale: 0.995 },
        type: "button",
      }
    : {};

  return (
    <Wrapper
      ref={ref}
      data-testid={testId}
      {...wrapperProps}
      className={`text-left w-full bg-white border rounded-xl px-4 py-3.5 flex items-center justify-between gap-3 transition-shadow ${
        active
          ? "border-slate-300 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.08)]"
          : "border-slate-200 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.06)]"
      } ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {Icon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center w-6 h-6 ${iconColor}`}
          >
            <Icon size={18} strokeWidth={2} />
          </span>
        )}
        <span className="text-[14px] text-slate-700 font-medium leading-tight">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {value !== undefined && value !== null && (
          <span className="text-[22px] font-semibold text-slate-900 tabular-nums leading-none">
            {value}
          </span>
        )}
        {isClickable && (
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1d7bff] text-white transition-transform">
            <ArrowRight size={14} strokeWidth={2.5} />
          </span>
        )}
      </div>
    </Wrapper>
  );
});

export default MetricCard;
