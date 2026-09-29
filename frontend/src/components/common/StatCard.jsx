import React from "react";

/**
 * StatCard - Metric tile for Dashboard header
 * @param {Object} props
 * @param {string} props.label - Metric name
 * @param {number|string} props.value - Metric count/value
 * @param {string} [props.subtext] - Contextual subtitle
 * @param {'total'|'hot'|'warm'|'cold'} [props.type] - Color scheme variant
 * @param {React.ReactNode} props.icon - Lucide icon component
 * @param {Function} [props.onClick] - Optional click handler for filtering
 * @param {boolean} [props.active] - Highlight if selected as active filter
 */
export default function StatCard({
  label,
  value,
  subtext,
  type = "total",
  icon,
  onClick,
  active = false
}) {
  return (
    <div
      className={`stat-card ${type} ${active ? "active-filter" : ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      role={onClick ? "button" : undefined}
    >
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {subtext && <div className="stat-subtext">{subtext}</div>}
      </div>
      <div className="stat-icon-wrapper">
        {icon}
      </div>
    </div>
  );
}
