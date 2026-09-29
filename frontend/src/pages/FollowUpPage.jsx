import React, { useState } from "react";
import { Sparkles, UserCheck } from "lucide-react";
import FollowUpGenerator from "../components/leads/FollowUpGenerator";
import PriorityBadge from "../components/common/PriorityBadge";
import EmptyState from "../components/common/EmptyState";

/**
 * FollowUpPage - Dedicated standalone page for AI Follow-Up Generation
 * @param {Object} props
 * @param {Array} props.leads - All leads list
 * @param {string} [props.initialLeadId] - Currently selected lead ID
 * @param {Function} props.onSelectLead - Callback when lead selection changes
 */
export default function FollowUpPage({ leads, initialLeadId, onSelectLead }) {
  const [selectedId, setSelectedId] = useState(initialLeadId || (leads[0]?.id ?? ""));

  const currentLead = leads.find((l) => l.id === selectedId) || leads[0];

  if (!leads || leads.length === 0) {
    return <EmptyState title="No leads available" description="Add an inbound lead to generate customized follow-ups." />;
  }

  return (
    <div>
      {/* Lead Selector Ribbon */}
      <div className="toolbar-container" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <UserCheck size={18} color="var(--brand-primary)" />
          <span style={{ fontSize: "0.88rem", fontWeight: 700 }}>Select Inbound Lead:</span>
        </div>

        <select
          className="form-select"
          style={{ minWidth: "300px" }}
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            if (onSelectLead) onSelectLead(e.target.value);
          }}
        >
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.name} — {lead.propertyRequirement} ({lead.priorityLabel})
            </option>
          ))}
        </select>

        {currentLead && (
          <PriorityBadge label={currentLead.priorityLabel} score={currentLead.priorityScore} />
        )}
      </div>

      {/* Render Follow-up Generator */}
      {currentLead && <FollowUpGenerator lead={currentLead} />}
    </div>
  );
}
