import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, User, Bot } from "lucide-react";

/**
 * LeadChat - Conversational AI interface grounded in the selected lead's data
 * @param {Object} props
 * @param {Object} props.lead - Selected lead details
 */
export default function LeadChat({ lead }) {
  const initialMessages = [
    {
      id: 1,
      sender: "assistant",
      text: `Hello! I have loaded all context for **${lead.name}**. I can help you structure your sales pitch, handle their objections, or draft tailored responses. What would you like to know?`,
      timestamp: "Just now"
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "What should I emphasize on the call?",
    "What are this customer's main concerns?",
    "Make my reply more assertive.",
    "What should I do next?"
  ];

  // Helper to generate a contextual mock answer grounded in this specific lead
  const generateMockAnswer = (question) => {
    const qLower = question.toLowerCase();

    if (qLower.includes("emphasize") || qLower.includes("pitch")) {
      return `For **${lead.name}**, emphasize: \n1. **Location & Spec Fit**: Highlight inventory matching "${lead.propertyRequirement}" in ${lead.location}.\n2. **Timeline Urgency**: They stated "${lead.buyingTimeline}". Reassure them on fast OC/registration.\n3. **Financial Alignment**: Emphasize units strictly within ${lead.budget} to build instant trust.`;
    }

    if (qLower.includes("concern") || qLower.includes("objection")) {
      const concernsList = lead.aiAnalysis?.concerns?.join(", ") || "documentation and timelines";
      return `Key objections & concerns for **${lead.name}**:\n- **Identified Risks**: ${concernsList}.\n- **Strategy**: Proactively offer RERA/OC certificate copies before they ask to neutralize apprehension.`;
    }

    if (qLower.includes("assertive")) {
      return `Here is an assertive closing pitch for **${lead.name}**:\n\n*"${lead.name.split(" ")[0]}, with properties moving this fast in ${lead.location}, our 2 shortlisted units fitting your ${lead.budget} budget will not remain available past this weekend. I have booked your slot for Saturday 11 AM—please confirm so I can hold the keys."*`;
    }

    if (qLower.includes("next") || qLower.includes("action")) {
      return `Recommended next step for **${lead.name}**:\n👉 ${lead.aiAnalysis?.recommendedAction || "Call the customer within 30 minutes to confirm requirement and schedule a site visit."}`;
    }

    // Default contextual fallback
    return `Based on **${lead.name}**'s profile (Priority: **${lead.priorityLabel}**, Budget: ${lead.budget}, Timeline: ${lead.buyingTimeline}):\nFocus on their specific inquiry regarding "${lead.propertyRequirement}". In Phase 5, this will be powered directly by Gemini LLM with dynamic prompt grounding!`;
  };

  const handleSendMessage = (textToSend) => {
    const messageText = textToSend || inputValue.trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate short AI thinking delay
    setTimeout(() => {
      const mockResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        text: generateMockAnswer(messageText),
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, mockResponse]);
      setIsTyping(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-title">
          <MessageSquare size={17} color="var(--brand-primary)" />
          <span>Ask AI Assistant about {lead.name}</span>
        </div>
        <span className="ai-badge-tag">
          <Sparkles size={11} />
          <span>Context Grounded (Mock)</span>
        </span>
      </div>

      {/* Message History */}
      <div className="chat-messages-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            <div className="chat-bubble-sender">
              {msg.sender === "user" ? (
                <>
                  <User size={12} />
                  <span>You (Salesperson)</span>
                </>
              ) : (
                <>
                  <Bot size={12} />
                  <span>Masal AI Assistant</span>
                </>
              )}
            </div>
            <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble assistant" style={{ fontStyle: "italic", opacity: 0.7 }}>
            AI Assistant is formulating response...
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="chat-quick-prompts">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            className="quick-prompt-chip"
            onClick={() => handleSendMessage(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="chat-input-bar">
        <input
          type="text"
          placeholder={`Ask about ${lead.name}'s requirements, objections, or strategy...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm" disabled={!inputValue.trim()}>
          <Send size={15} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}
