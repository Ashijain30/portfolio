import React from "react";
import { SearchX, PlusCircle } from "lucide-react";

/**
 * EmptyState - Displayed when no leads or search results exist
 * @param {Object} props
 * @param {string} props.title - Main headline
 * @param {string} props.description - Detailed prompt
 * @param {string} [props.actionLabel] - Button CTA text
 * @param {Function} [props.onAction] - Action callback
 * @param {React.ReactNode} [props.icon] - Custom icon
 */
export default function EmptyState({
  title = "No leads found",
  description = "Try adjusting your search query or priority filters to find what you are looking for.",
  actionLabel,
  onAction,
  icon
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon-circle">
        {icon || <SearchX size={28} />}
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          <PlusCircle size={16} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
