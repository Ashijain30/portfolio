import React, { useState, useMemo } from "react";
import {
  Users,
  Flame,
  Clock,
  Snowflake,
  Search,
  PlusCircle,
  FilterX
} from "lucide-react";
import StatCard from "../components/common/StatCard";
import LeadCard from "../components/leads/LeadCard";
import EmptyState from "../components/common/EmptyState";

/**
 * Dashboard Page - Main salesperson command center
 * @param {Object} props
 * @param {Array} props.leads - Array of lead objects
 * @param {Function} props.onSelectLead - Callback when a lead is chosen
 * @param {Function} props.onNavigate - Page switcher callback
 */
export default function Dashboard({ leads, onSelectLead, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // KPI Calculations
  const stats = useMemo(() => {
    const total = leads.length;
    const hot = leads.filter((l) => l.priorityLabel === "HOT").length;
    const warm = leads.filter((l) => l.priorityLabel === "WARM").length;
    const cold = leads.filter((l) => l.priorityLabel === "COLD").length;
    return { total, hot, warm, cold };
  }, [leads]);

  // Filtered Leads List
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Priority match
      const matchesPriority =
        priorityFilter === "ALL" || lead.priorityLabel === priorityFilter;

      // 2. Search match
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        lead.name.toLowerCase().includes(term) ||
        lead.location.toLowerCase().includes(term) ||
        lead.propertyRequirement.toLowerCase().includes(term) ||
        lead.customerMessage.toLowerCase().includes(term) ||
        lead.budget.toLowerCase().includes(term);

      return matchesPriority && matchesSearch;
    });
  }, [leads, priorityFilter, searchTerm]);

  return (
    <div>
      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <StatCard
          label="Total Leads"
          value={stats.total}
          subtext="Active inbound pipeline"
          type="total"
          icon={<Users size={22} />}
          onClick={() => setPriorityFilter("ALL")}
          active={priorityFilter === "ALL"}
        />
        <StatCard
          label="HOT Leads"
          value={stats.hot}
          subtext="Immediate closing intent"
          type="hot"
          icon={<Flame size={22} />}
          onClick={() => setPriorityFilter("HOT")}
          active={priorityFilter === "HOT"}
        />
        <StatCard
          label="WARM Leads"
          value={stats.warm}
          subtext="1-3 month closing window"
          type="warm"
          icon={<Clock size={22} />}
          onClick={() => setPriorityFilter("WARM")}
          active={priorityFilter === "WARM"}
        />
        <StatCard
          label="COLD Leads"
          value={stats.cold}
          subtext="Low intent / long nurture"
          type="cold"
          icon={<Snowflake size={22} />}
          onClick={() => setPriorityFilter("COLD")}
          active={priorityFilter === "COLD"}
        />
      </div>

      {/* Toolbar: Search & Priority Filter Pills */}
      <div className="toolbar-container">
        <div className="search-box">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search leads by name, location, requirement, or budget..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
            >
              <FilterX size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
            Filter:
          </span>
          {["ALL", "HOT", "WARM", "COLD"].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${priorityFilter === filter ? "active" : ""}`}
              onClick={() => setPriorityFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => onNavigate("add-lead")}>
          <PlusCircle size={15} />
          <span>New Lead</span>
        </button>
      </div>

      {/* Leads List or Empty State */}
      {filteredLeads.length > 0 ? (
        <div className="leads-grid">
          {filteredLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onSelect={onSelectLead} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchTerm ? `No leads matching "${searchTerm}"` : `No ${priorityFilter} leads found`}
          description="Try modifying your keyword search or switching to another priority filter."
          actionLabel="Add New Lead"
          onAction={() => onNavigate("add-lead")}
        />
      )}
    </div>
  );
}
