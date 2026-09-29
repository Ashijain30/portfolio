import React from "react";
import {
  LayoutDashboard,
  UserPlus,
  Sparkles,
  Building2,
  ChevronRight
} from "lucide-react";

/**
 * Sidebar Navigation Component
 * @param {Object} props
 * @param {string} props.currentView - Active view identifier
 * @param {Function} props.onNavigate - Navigation callback function
 */
export default function Sidebar({ currentView, onNavigate }) {
  const navItems = [
    {
      id: "dashboard",
      label: "Lead Dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      id: "add-lead",
      label: "Intake New Lead",
      icon: <UserPlus size={18} />
    },
    {
      id: "follow-up",
      label: "Follow-Up Generator",
      icon: <Sparkles size={18} />
    }
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon-wrapper">
          <Building2 size={20} />
        </div>
        <div>
          <div className="brand-title">Masal AI</div>
          <div className="brand-subtitle">Real Estate Copilot</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-link ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && <ChevronRight size={14} opacity={0.7} />}
            </button>
          );
        })}
      </nav>

      {/* Salesperson Profile Footer */}
      <div className="sidebar-footer">
        <div className="agent-profile">
          <div className="agent-avatar">AJ</div>
          <div>
            <div className="agent-name">Ashi Jain</div>
            <div className="agent-role">Sales Director</div>
          </div>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            background: "#e2e8f0",
            padding: "2px 6px",
            borderRadius: "4px",
            fontWeight: 700
          }}
        >
          DEMO
        </span>
      </div>
    </aside>
  );
}
