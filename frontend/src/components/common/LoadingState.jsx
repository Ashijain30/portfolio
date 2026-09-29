import React from "react";
import { Loader2 } from "lucide-react";

/**
 * LoadingState - Reusable skeleton/spinner for asynchronous loading
 * @param {Object} props
 * @param {string} [props.message] - Descriptive loading message
 */
export default function LoadingState({ message = "Analyzing real-estate inbound lead..." }) {
  return (
    <div className="loading-state">
      <div className="empty-icon-circle" style={{ animation: "spin 1.5s linear infinite" }}>
        <Loader2 size={28} color="var(--brand-primary)" />
      </div>
      <h3 className="empty-title">{message}</h3>
      <p className="empty-description">
        Please wait while our scoring engine and AI models evaluate customer intent and requirements.
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
