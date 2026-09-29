import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  PhoneCall,
  Sparkles,
  Copy,
  Check,
  RefreshCw
} from "lucide-react";

/**
 * FollowUpGenerator - Generates multi-channel sales follow-up messages
 * @param {Object} props
 * @param {Object} props.lead - Selected lead details
 */
export default function FollowUpGenerator({ lead }) {
  const [channel, setChannel] = useState("whatsapp");
  const [tone, setTone] = useState("professional");
  const [generatedText, setGeneratedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const channels = [
    { id: "whatsapp", label: "WhatsApp Message", icon: <MessageCircle size={15} /> },
    { id: "email", label: "Email Template", icon: <Mail size={15} /> },
    { id: "call_script", label: "Phone Call Script", icon: <PhoneCall size={15} /> }
  ];

  const tones = [
    { id: "professional", label: "Professional" },
    { id: "friendly", label: "Friendly & Warm" },
    { id: "assertive", label: "Assertive Closer" },
    { id: "urgent", label: "High Urgency" }
  ];

  const firstName = lead.name.split(" ")[0];

  // Helper generating realistic mock templates based on chosen Channel & Tone
  const buildMockFollowUp = (selectedChannel, selectedTone) => {
    if (selectedChannel === "whatsapp") {
      switch (selectedTone) {
        case "friendly":
          return `Hey ${firstName}! 👋 Hope your week is going great. I saw you were looking for ${lead.propertyRequirement} in ${lead.location}. We just got two lovely ready-to-move homes within your budget of ${lead.budget}. Would love to share quick photos—can I WhatsApp the brochure over? 😊`;
        case "assertive":
          return `Hi ${firstName}, following up on your ${lead.location} property search. We have 2 verified properties matching ${lead.propertyRequirement} at ${lead.budget}. Inventory in this cluster is selling fast this month. Let's lock in 15 minutes tomorrow at 11 AM to review the floor plans. Does that work?`;
        case "urgent":
          return `Urgent Update for ${firstName}: One of the prime units in ${lead.location} fitting your ${lead.budget} budget and ${lead.buyingTimeline} timeline just opened up due to a cancellation. It will likely be booked by this evening. Call me right away at +91 98765 43210 if you want first priority!`;
        case "professional":
        default:
          return `Hello ${lead.name}, thank you for your inquiry regarding ${lead.propertyRequirement} in ${lead.location}. I have curated two options within your ${lead.budget} price bracket that align with your ${lead.buyingTimeline} timeline. Please let me know your availability for a brief consultation this week. Best regards, Masal Realty.`;
      }
    }

    if (selectedChannel === "email") {
      switch (selectedTone) {
        case "friendly":
          return `Subject: Finding your dream home in ${lead.location} 🏡\n\nHi ${firstName},\n\nIt was great to receive your note about wanting ${lead.propertyRequirement} in ${lead.location}!\n\nI know finding the right place can feel overwhelming, but we've got some wonderful options matching your ${lead.budget} budget that I think you and your family will adore.\n\nTake a look at the attached portfolio, and let's hop on a relaxed coffee chat or phone call whenever you're free!\n\nWarmly,\nAshi Jain | Masal AI Real Estate`;
        case "assertive":
          return `Subject: Strategic Property Options for ${lead.name} — ${lead.location}\n\nDear ${lead.name},\n\nI have reviewed your requirement for ${lead.propertyRequirement} within the ${lead.budget} bracket. Given your target timeline of ${lead.buyingTimeline}, immediate action is required to secure optimal pricing.\n\nI have pre-screened two RERA-compliant projects with clear title deeds and pre-approved bank loans. I have held these options for 48 hours for your review.\n\nPlease confirm your availability for a 20-minute executive briefing tomorrow.\n\nSincerely,\nAshi Jain | Sales Director`;
        case "urgent":
          return `Subject: TIME-SENSITIVE: Off-Market Unit Available in ${lead.location}\n\nDear ${lead.name},\n\nRegarding your requirement for ${lead.propertyRequirement} in ${lead.location}:\n\nA premium unit within your ${lead.budget} budget has just become available under market rate, but offers are being collected until 5:00 PM tomorrow. Since your timeline is ${lead.buyingTimeline}, this fits your requirements perfectly.\n\nPlease reply immediately or call +91 98765 43210 to review before general release.\n\nUrgent regards,\nAshi Jain`;
        case "professional":
        default:
          return `Subject: Curated Property Portfolio: ${lead.propertyRequirement} in ${lead.location}\n\nDear ${lead.name},\n\nThank you for contacting Masal AI regarding your real-estate requirements in ${lead.location}. Based on your stated criteria (${lead.propertyRequirement}, budget of ${lead.budget}, timeline of ${lead.buyingTimeline}), we have compiled a personalized shortlist of verified properties.\n\nKey Highlights:\n- Clear legal titles & occupancy certificates (OC)\n- Prime connectivity matching your lifestyle preferences\n- Flexible payment schedules tailored to your financial goals\n\nCould we arrange a brief telephone discussion this Thursday at 3:00 PM to review these options?\n\nBest regards,\nAshi Jain\nMasal AI Real Estate Advisory`;
      }
    }

    if (selectedChannel === "call_script") {
      switch (selectedTone) {
        case "assertive":
          return `[CALL SCRIPT - ASSERTIVE CLOSER]\n\nAgent: "Good morning ${lead.name}, this is Ashi from Masal AI. I'm calling directly regarding your requirement for ${lead.propertyRequirement} in ${lead.location}."\n\nProspect: [Answers]\n\nAgent: "The reason for my call is direct: you mentioned needing to close ${lead.buyingTimeline} with a budget of ${lead.budget}. Two prime units just passed our legal due diligence this morning. If you are serious about finalizing this month, I can arrange an exclusive site visit tomorrow at 11 AM or 2 PM. Which slot works better for you?"\n\n[If Objection]: "I understand your hesitation, but properties with these exact specifications in ${lead.location} are experiencing 12-day absorption rates. Let's inspect the property first so you have all facts to make a decision."`;
        case "urgent":
          return `[CALL SCRIPT - HIGH URGENCY]\n\nAgent: "Hi ${firstName}, Ashi here with urgent news on your ${lead.location} search."\n\nProspect: [Answers]\n\nAgent: "I'm calling right off the bat because an OC-received unit fitting your ${lead.budget} budget and ${lead.propertyRequirement} requirement just came back on market due to an NRI cancellation. Given your ${lead.buyingTimeline} timeline, this is an exact match. Are you free for 5 minutes right now so I can share the floor plan before the open house?"`;
        case "friendly":
          return `[CALL SCRIPT - WARM & CONSULTATIVE]\n\nAgent: "Hello ${firstName}, how are you doing today? This is Ashi from Masal AI."\n\nProspect: [Answers]\n\nAgent: "I loved reading your note about searching for ${lead.propertyRequirement} around ${lead.location}. It's a wonderful neighborhood! I wanted to check in and see how your search has been going so far, and share a couple of lovely new developments in the ${lead.budget} range. Do you have a couple of minutes to chat?"`;
        case "professional":
        default:
          return `[CALL SCRIPT - PROFESSIONAL CONSULTATIVE]\n\nAgent: "Good day Mr./Ms. ${lead.name}, my name is Ashi Jain calling from Masal AI. I am following up on your recent property inquiry."\n\nProspect: [Answers]\n\nAgent: "I noticed your interest in ${lead.propertyRequirement} within ${lead.location} for ${lead.budget}. We have conducted a preliminary inventory audit and identified two developments meeting your ${lead.buyingTimeline} timeline with full RERA compliance. I would be pleased to schedule a formal site tour at your convenience. Would this coming weekend suit your schedule?"`;
      }
    }

    return "Select a channel and tone to generate follow-up.";
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedText(buildMockFollowUp(channel, tone));
      setIsGenerating(false);
      setIsCopied(false);
    }, 250);
  };

  // Generate on first mount or when channel/tone changes
  React.useEffect(() => {
    setGeneratedText(buildMockFollowUp(channel, tone));
  }, [channel, tone, lead.id]);

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="followup-card">
      <div className="section-title-bar">
        <div className="section-title">
          <Sparkles size={18} color="var(--brand-primary)" />
          <span>AI Follow-Up Generator</span>
        </div>
        <span className="ai-badge-tag">Unique Feature (Mock)</span>
      </div>

      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
        Generate tailored sales follow-ups personalized with <strong>{lead.name}</strong>'s exact requirements, budget ({lead.budget}), and timeline.
      </p>

      {/* Channel Selector */}
      <div style={{ marginBottom: "18px" }}>
        <label className="form-label">Communication Channel</label>
        <div className="selector-pill-group">
          {channels.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className={`selector-pill ${channel === ch.id ? "selected" : ""}`}
              onClick={() => setChannel(ch.id)}
            >
              {ch.icon}
              <span>{ch.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label className="form-label">Message Tone</label>
        <div className="selector-pill-group">
          {tones.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`selector-pill ${tone === t.id ? "selected" : ""}`}
              onClick={() => setTone(t.id)}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trigger & Controls */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? <RefreshCw size={14} className="spin" /> : <Sparkles size={14} />}
          <span>{isGenerating ? "Regenerating..." : "Regenerate Output"}</span>
        </button>
      </div>

      {/* Output Display Area */}
      <div className="output-container">
        <div className="output-header">
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Generated {channels.find((c) => c.id === channel)?.label} ({tones.find((t) => t.id === tone)?.label})
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
            disabled={!generatedText}
          >
            {isCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
            <span>{isCopied ? "Copied to Clipboard!" : "Copy Text"}</span>
          </button>
        </div>
        <div className="output-content">{generatedText}</div>
      </div>
    </div>
  );
}
