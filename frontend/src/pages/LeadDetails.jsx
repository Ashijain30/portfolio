import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Wallet,
  Sparkles,
  Bot,
  MessageSquare,
  Send,
  Building,
  AlertCircle,
  FileText
} from "lucide-react";
import PriorityBadge from "../components/common/PriorityBadge";
import LeadChat from "../components/leads/LeadChat";
import FollowUpGenerator from "../components/leads/FollowUpGenerator";

/**
 * LeadDetails Page - Detailed salesperson perspective on a selected lead
 * @param {Object} props
 * @param {Object} props.lead - Selected lead object
 * @param {Function} props.onBack - Return to list callback
 */
export default function LeadDetails({ lead, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!lead) {
    return (
      <div>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
        <p style={{ marginTop: "20px" }}>No lead selected.</p>
      </div>
    );
  }

  const ai = lead.aiAnalysis || {};

  return (
    <div className="lead-details-container">
      {/* Top Navigation Back */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Lead ID: {lead.id}
        </span>
      </div>

      {/* Header Profile Card */}
      <div className="details-header-card">
        <div className="details-client-meta">
          <div className="details-avatar">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <div className="details-header-name">{lead.name}</div>
            <div className="details-header-sub">
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={14} color="var(--brand-primary)" />
                {lead.location}
              </span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={14} />
                Timeline: <strong>{lead.buyingTimeline}</strong>
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              AI Priority Rating
            </div>
            <div style={{ marginTop: "4px" }}>
              <PriorityBadge label={lead.priorityLabel} score={lead.priorityScore} />
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="filter-group" style={{ marginBottom: "0px" }}>
        <button
          className={`filter-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <FileText size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
          Overview & AI Analysis
        </button>
        <button
          className={`filter-btn ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          <MessageSquare size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
          Conversational Assistant
        </button>
        <button
          className={`filter-btn ${activeTab === "follow-up" ? "active" : ""}`}
          onClick={() => setActiveTab("follow-up")}
        >
          <Sparkles size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
          Follow-Up Generator
        </button>
      </div>

      {/* Tab 1: Overview & AI Analysis */}
      {activeTab === "overview" && (
        <div className="details-grid">
          {/* Column 1: Customer Profile & Original Message */}
          <div className="details-section-card">
            <div className="section-title-bar">
              <div className="section-title">
                <Building size={18} color="var(--brand-primary)" />
                <span>Customer Inquiry Details</span>
              </div>
            </div>

            <div className="meta-field-list">
              <div className="meta-field-row">
                <span className="meta-field-label">Customer Name</span>
                <span className="meta-field-value">{lead.name}</span>
              </div>

              <div className="meta-field-row">
                <span className="meta-field-label">Target Location</span>
                <span className="meta-field-value">{lead.location}</span>
              </div>

              <div className="meta-field-row">
                <span className="meta-field-label">Property Requirement</span>
                <span className="meta-field-value">{lead.propertyRequirement}</span>
              </div>

              <div className="meta-field-row">
                <span className="meta-field-label">Stated Budget</span>
                <span className="meta-field-value" style={{ fontWeight: 700, color: "var(--brand-primary)" }}>
                  {lead.budget}
                </span>
              </div>

              <div className="meta-field-row">
                <span className="meta-field-label">Buying Timeline</span>
                <span className="meta-field-value">{lead.buyingTimeline}</span>
              </div>

              <div className="meta-field-row">
                <span className="meta-field-label">Original Inbound Message</span>
                <div className="message-quote-box">"{lead.customerMessage}"</div>
              </div>
            </div>
          </div>

          {/* Column 2: AI Analysis (Structured) */}
          <div className="details-section-card">
            <div className="section-title-bar">
              <div className="section-title">
                <Bot size={18} color="var(--brand-primary)" />
                <span>AI Qualification Analysis</span>
              </div>
              <span className="ai-badge-tag">
                <Sparkles size={11} /> Mock AI
              </span>
            </div>

            {/* AI Summary */}
            <div className="ai-summary-block">
              <div className="ai-block-label">
                <Sparkles size={13} />
                <span>Executive Lead Summary</span>
              </div>
              <div className="ai-block-content">{ai.summary || "No summary available."}</div>
            </div>

            {/* Customer Intent */}
            <div className="ai-summary-block">
              <div className="ai-block-label">
                <Bot size={13} />
                <span>Customer Intent</span>
              </div>
              <div className="ai-block-content">{ai.intent || "Evaluating intent..."}</div>
            </div>

            {/* Key Requirements List */}
            <div style={{ marginTop: "16px" }}>
              <div className="meta-field-label">Key Identified Requirements</div>
              <ul className="bullet-list requirements">
                {ai.requirements && ai.requirements.length > 0 ? (
                  ai.requirements.map((req, i) => <li key={i}>{req}</li>)
                ) : (
                  <li>Standard property inquiry</li>
                )}
              </ul>
            </div>

            {/* Objections / Concerns List */}
            <div style={{ marginTop: "16px" }}>
              <div className="meta-field-label">Objections & Potential Concerns</div>
              <ul className="bullet-list concerns">
                {ai.concerns && ai.concerns.length > 0 ? (
                  ai.concerns.map((c, i) => <li key={i}>{c}</li>)
                ) : (
                  <li>No major objections recorded.</li>
                )}
              </ul>
            </div>

            {/* Recommended Action Box */}
            <div className="recommended-action-box">
              <div className="action-label">Recommended Next Action</div>
              <div style={{ fontSize: "0.88rem", color: "#064e3b", fontWeight: 600 }}>
                {ai.recommendedAction || "Follow up within 24 hours."}
              </div>
            </div>

            {/* Suggested Initial Response */}
            <div className="suggested-response-box">
              <div className="response-label">Suggested Response for Salesperson</div>
              <div style={{ fontSize: "0.86rem", color: "#4c1d95", fontStyle: "italic", lineHeight: 1.45 }}>
                "{ai.suggestedResponse || "Thank you for reaching out..."}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Conversational Assistant */}
      {activeTab === "chat" && (
        <div>
          <LeadChat lead={lead} />
        </div>
      )}

      {/* Tab 3: AI Follow-Up Generator */}
      {activeTab === "follow-up" && (
        <div>
          <FollowUpGenerator lead={lead} />
        </div>
      )}
    </div>
  );
}
