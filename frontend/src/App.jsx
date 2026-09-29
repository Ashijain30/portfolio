import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddLead from "./pages/AddLead";
import LeadDetails from "./pages/LeadDetails";
import FollowUpPage from "./pages/FollowUpPage";
import { INITIAL_MOCK_LEADS, generateMockAiAnalysis } from "./data/mockLeads";
import { PlusCircle, Sparkles } from "lucide-react";

/**
 * Main Application Shell for Masal AI
 * Manages view routing and in-memory lead state for Phase 2.
 */
export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [leads, setLeads] = useState(INITIAL_MOCK_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState(INITIAL_MOCK_LEADS[0]?.id || "");

  // Navigation controller
  const navigateTo = (view, leadId = null) => {
    if (leadId) {
      setSelectedLeadId(leadId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select a lead and navigate to details
  const handleSelectLead = (leadId) => {
    setSelectedLeadId(leadId);
    setCurrentView("lead-details");
  };

  // Add a new lead from intake form (in-memory state for Phase 2)
  const handleAddLead = (formData) => {
    const generatedInsights = generateMockAiAnalysis(formData);
    const newLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      ...formData,
      ...generatedInsights,
      createdAt: new Date().toISOString()
    };

    // Prepend new lead so it appears first in the dashboard
    setLeads((prev) => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
    setCurrentView("lead-details");
  };

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  // Dynamic titles for topbar
  const getHeaderMeta = () => {
    switch (currentView) {
      case "add-lead":
        return {
          title: "Intake Inbound Real-Estate Lead",
          subtitle: "Record incoming buyer requirements, budget, and customer inquiries."
        };
      case "lead-details":
        return {
          title: selectedLead ? `${selectedLead.name} — Lead Analysis` : "Lead Details",
          subtitle: "AI qualification breakdown, intent profiling, and conversational assistant."
        };
      case "follow-up":
        return {
          title: "AI Follow-Up Message Generator",
          subtitle: "Produce tailored WhatsApp, Email, and Call Scripts matched to customer tone and timeline."
        };
      case "dashboard":
      default:
        return {
          title: "Inbound Lead Prioritization Dashboard",
          subtitle: "Triage high-value real-estate opportunities and act on high-intent buyers."
        };
    }
  };

  const headerMeta = getHeaderMeta();

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="app-main">
        {/* Global Topbar */}
        <header className="top-bar">
          <div className="page-title-block">
            <h1>{headerMeta.title}</h1>
            <p>{headerMeta.subtitle}</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {currentView !== "add-lead" && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigateTo("add-lead")}
              >
                <PlusCircle size={15} />
                <span>Intake Lead</span>
              </button>
            )}
          </div>
        </header>

        {/* View Switcher Container */}
        <section className="content-body">
          {currentView === "dashboard" && (
            <Dashboard
              leads={leads}
              onSelectLead={handleSelectLead}
              onNavigate={navigateTo}
            />
          )}

          {currentView === "add-lead" && (
            <AddLead
              onAddLead={handleAddLead}
              onCancel={() => navigateTo("dashboard")}
            />
          )}

          {currentView === "lead-details" && (
            <LeadDetails
              lead={selectedLead}
              onBack={() => navigateTo("dashboard")}
            />
          )}

          {currentView === "follow-up" && (
            <FollowUpPage
              leads={leads}
              initialLeadId={selectedLeadId}
              onSelectLead={(id) => setSelectedLeadId(id)}
            />
          )}
        </section>
      </main>
    </div>
  );
}
