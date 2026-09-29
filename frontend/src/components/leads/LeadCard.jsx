import React from "react";
import { MapPin, Calendar, ArrowRight, Wallet } from "lucide-react";
import PriorityBadge from "../common/PriorityBadge";

/**
 * LeadCard - Row/Card item in the Dashboard lead list
 * @param {Object} props
 * @param {Object} props.lead - Lead data object
 * @param {Function} props.onSelect - Callback when clicked
 */
export default function LeadCard({ lead, onSelect }) {
  return (
    <div
      className="lead-card"
      onClick={() => onSelect(lead.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(lead.id);
        }
      }}
    >
      {/* Col 1: Customer Identity */}
      <div className="lead-col-primary">
        <div className="lead-name">
          <span>{lead.name}</span>
        </div>
        <div className="lead-location">
          <MapPin size={13} />
          <span>{lead.location}</span>
        </div>
      </div>

      {/* Col 2: Property Requirement & Message Snippet */}
      <div className="lead-col-requirement">
        <div className="req-text">{lead.propertyRequirement}</div>
        <div className="req-preview">"{lead.customerMessage}"</div>
      </div>

      {/* Col 3: Financials & Timeline */}
      <div className="lead-col-financials">
        <div className="budget-value" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Wallet size={14} color="var(--text-muted)" />
          <span>{lead.budget}</span>
        </div>
        <div className="timeline-badge">
          <Calendar size={12} />
          <span>{lead.buyingTimeline}</span>
        </div>
      </div>

      {/* Col 4: AI Priority Badge */}
      <div className="lead-col-priority" style={{ display: "flex", justifyContent: "center" }}>
        <PriorityBadge label={lead.priorityLabel} score={lead.priorityScore} />
      </div>

      {/* Col 5: Action Button */}
      <div className="lead-col-action" style={{ textAlign: "right" }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(lead.id);
          }}
        >
          <span>View Insights</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
