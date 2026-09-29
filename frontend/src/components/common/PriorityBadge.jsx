import React from "react";
import { Flame, Clock, Snowflake } from "lucide-react";

/**
 * PriorityBadge - Visual indicator for Lead Priority classification
 * @param {Object} props
 * @param {'HOT'|'WARM'|'COLD'} props.label - Priority label
 * @param {number} [props.score] - Optional numerical score (0-100)
 */
export default function PriorityBadge({ label = "COLD", score }) {
  const normalizedLabel = label.toUpperCase();

  const config = {
    HOT: {
      className: "hot",
      icon: <Flame size={13} />,
      text: "HOT"
    },
    WARM: {
      className: "warm",
      icon: <Clock size={13} />,
      text: "WARM"
    },
    COLD: {
      className: "cold",
      icon: <Snowflake size={13} />,
      text: "COLD"
    }
  }[normalizedLabel] || {
    className: "cold",
    icon: <Snowflake size={13} />,
    text: normalizedLabel
  };

  return (
    <span className={`priority-badge ${config.className}`}>
      {config.icon}
      <span>{config.text}</span>
      {score !== undefined && score !== null && (
        <span className="score-pill">{score}</span>
      )}
    </span>
  );
}
