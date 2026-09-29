/**
 * Mock Real-Estate Inbound Leads
 * Realistic dataset for Masal AI sales assistant demo.
 */

export const INITIAL_MOCK_LEADS = [
  {
    id: "lead-101",
    name: "Rajesh Sharma",
    location: "Whitefield, Bangalore",
    propertyRequirement: "3 BHK Luxury Apartment with large balcony & clubhouse",
    budget: "₹1.8 Cr - ₹2.2 Cr",
    buyingTimeline: "Within 15 days",
    customerMessage: "Urgent: Need to finalize before school admissions close in June. Have pre-approved HDFC loan sanction letter. Available for site visits this Saturday morning.",
    priorityScore: 92,
    priorityLabel: "HOT",
    urgency: "HIGH",
    createdAt: "2026-09-28T09:15:00Z",
    aiAnalysis: {
      summary: "High-intent buyer with pre-approved financing seeking a ready-to-move 3 BHK in Whitefield with strict 15-day timeline due to school admissions.",
      intent: "Immediate purchase for primary family residence. Fast decision maker with pre-cleared capital.",
      requirements: [
        "3 BHK (1800+ sq.ft.)",
        "Whitefield / ITPL corridor",
        "Ready to move / Immediate possession",
        "Premium clubhouse & kids play amenities"
      ],
      concerns: [
        "Time-pressured by school admissions deadline",
        "Wants builder with crystal-clear occupancy certificate (OC/CC)"
      ],
      recommendedAction: "Schedule private walkthrough for Saturday 11:00 AM at Prestige Fontaine Bleau. Carry loan paperwork assistance to expedite agreement.",
      suggestedResponse: "Hello Rajesh, I reviewed your requirement for a 3 BHK in Whitefield. We have 2 OC-received luxury units with expansive balconies matching your ₹2 Cr budget. Given your pre-approved loan, we can fast-track registration within 10 days. May I reserve your slot for 11 AM this Saturday?"
    }
  },
  {
    id: "lead-102",
    name: "Priya Mehta",
    location: "Koramangala, Bangalore",
    propertyRequirement: "4 BHK Gated Community Villa with private garden",
    budget: "₹3.5 Cr - ₹4.0 Cr",
    buyingTimeline: "Within 30 days",
    customerMessage: "Relocating from London next month. Seeking a quiet gated community villa near Koramangala or Sarjapur. Cash buyer, looking for prime developer track record.",
    priorityScore: 86,
    priorityLabel: "HOT",
    urgency: "HIGH",
    createdAt: "2026-09-28T14:45:00Z",
    aiAnalysis: {
      summary: "NRI cash buyer relocating from UK. High purchasing power seeking top-tier gated villa within 30 days.",
      intent: "Executive relocation and lifestyle upgrade. High purchasing velocity.",
      requirements: [
        "4 BHK Villa (3200+ sq.ft.)",
        "Koramangala / Sarjapur belt",
        "Private lawn / garden",
        "24/7 high-security gated compound"
      ],
      concerns: [
        "Remote verification while finalizing relocation logistics",
        "Vastu compliance and developer credibility"
      ],
      recommendedAction: "Send curated 4K video walkthrough and Vastu compliance sheet of available villas today. Offer virtual Zoom consultation.",
      suggestedResponse: "Hi Priya, welcome back to Bangalore! We have a curated collection of ultra-luxury 4 BHK villas in private gated communities near Koramangala within your ₹3.5–4 Cr range. I can share a personalized virtual walkthrough and architectural plan today. Would a 15-minute video call work for you tomorrow?"
    }
  },
  {
    id: "lead-103",
    name: "Anand Verma",
    location: "HSR Layout, Bangalore",
    propertyRequirement: "2 BHK or Compact 3 BHK close to Metro",
    budget: "₹95 Lakh - ₹1.1 Cr",
    buyingTimeline: "1 to 2 months",
    customerMessage: "Currently renting in Sector 2 HSR. Looking to buy our first home. Comparing resale vs newly launched projects. Need guidance on home loan eligibility.",
    priorityScore: 68,
    priorityLabel: "WARM",
    urgency: "MEDIUM",
    createdAt: "2026-09-27T16:20:00Z",
    aiAnalysis: {
      summary: "First-time homebuyer currently renting in HSR Layout. Exploring options within ₹1 Cr budget, weighing new launch vs resale.",
      intent: "First-time homeowner motivated by saving rent, but requires mortgage consultation and price comparison.",
      requirements: [
        "2 BHK or compact 3 BHK (1100-1350 sq.ft.)",
        "HSR Layout or within 3km radius",
        "Proximity to upcoming Metro station",
        "Budget capped at ₹1.1 Cr all-inclusive"
      ],
      concerns: [
        "Home loan EMI burden vs current rental outflow",
        "Possession delays on under-construction projects"
      ],
      recommendedAction: "Share comparative EMI breakdown showing rent vs buy advantages. Present OC-cleared projects near Silk Board metro link.",
      suggestedResponse: "Hello Anand, transitioning from rent to home ownership in HSR is a smart move right now. We have verified inventory near the upcoming metro stations that fit comfortably within ₹1 Cr with attractive bank tie-ups. Let's do a quick 10-minute call to compare new vs resale options."
    }
  },
  {
    id: "lead-104",
    name: "Sneha Kulkarni",
    location: "Devanahalli / Airport Road",
    propertyRequirement: "Residential Plot / Land for long-term investment",
    budget: "₹50 Lakh - ₹65 Lakh",
    buyingTimeline: "3 to 6 months",
    customerMessage: "Interested in plotted developments near KIADB Aerospace Park for capital appreciation. Still checking whether to invest now or wait until Diwali.",
    priorityScore: 52,
    priorityLabel: "WARM",
    urgency: "LOW",
    createdAt: "2026-09-26T11:10:00Z",
    aiAnalysis: {
      summary: "Long-term land investor looking for capital growth near North Bangalore airport corridor. Non-urgent timeline (3-6 months).",
      intent: "Wealth creation / investment plot. Evaluating market trends before committing funds.",
      requirements: [
        "1200 - 1500 sq.ft. plotted layout",
        "Devanahalli / Aerospace Park corridor",
        "BIAAPA / RERA approved development",
        "Expected 12-15% annual appreciation"
      ],
      concerns: [
        "Title clearance and government acquisition buffer zones",
        "Market peak concerns; debating whether to wait for festive offers"
      ],
      recommendedAction: "Add to monthly North Bangalore infrastructure update list. Send report on Aerospace Park appreciation trends to keep warm.",
      suggestedResponse: "Hi Sneha, the Devanahalli Aerospace Park is experiencing strong institutional growth. I can share our Q3 Capital Appreciation Report highlighting RERA-approved layouts with verified BIAAPA approvals. Would you like me to email you the analysis?"
    }
  },
  {
    id: "lead-105",
    name: "Vikram Malhotra",
    location: "Hebbal or North Bangalore",
    propertyRequirement: "General inquiry on retirement homes",
    budget: "Around ₹40 Lakh",
    buyingTimeline: "1+ year / Just exploring",
    customerMessage: "Just checking prices for retirement in 2-3 years. Don't call repeatedly, only send emails or brochures.",
    priorityScore: 24,
    priorityLabel: "COLD",
    urgency: "LOW",
    createdAt: "2026-09-25T18:00:00Z",
    aiAnalysis: {
      summary: "Passive prospect browsing far in advance of retirement. Unrealistic budget expectations for North Bangalore prime zones and low engagement intent.",
      intent: "Casual market scanning with minimal commitment. Sensitive to proactive sales outreach.",
      requirements: [
        "Senior-friendly / retirement community",
        "North Bangalore outskirts",
        "Low entry price point (₹40L)"
      ],
      concerns: [
        "Does not want phone calls or aggressive sales follow-ups",
        "Substantial budget mismatch for tier-1 Bangalore builders"
      ],
      recommendedAction: "Place on low-frequency email nurturing campaign. Do not assign active sales agent call time.",
      suggestedResponse: "Dear Vikram, thank you for your interest. As requested, we will respect your communication preference and send our quarterly Bangalore Senior Living Market Guide via email for your future reference."
    }
  }
];

/**
 * Helper to generate a realistic mock AI analysis for freshly submitted leads in Phase 2
 */
export function generateMockAiAnalysis(leadData) {
  const budgetNum = parseInt(leadData.budget.replace(/[^0-9]/g, ""), 10) || 50;
  const isUrgent = leadData.buyingTimeline.toLowerCase().includes("15") || 
                   leadData.buyingTimeline.toLowerCase().includes("immediate") ||
                   leadData.buyingTimeline.toLowerCase().includes("urgent");
  
  let score = 55;
  let label = "WARM";
  let urgency = "MEDIUM";

  if (isUrgent) {
    score = 88;
    label = "HOT";
    urgency = "HIGH";
  } else if (leadData.buyingTimeline.toLowerCase().includes("year") || budgetNum < 30) {
    score = 35;
    label = "COLD";
    urgency = "LOW";
  }

  return {
    priorityScore: score,
    priorityLabel: label,
    urgency: urgency,
    aiAnalysis: {
      summary: `Inbound inquiry from ${leadData.name} seeking property in ${leadData.location} with a budget of ${leadData.budget} and timeline: ${leadData.buyingTimeline}.`,
      intent: `Customer is actively evaluating options for ${leadData.propertyRequirement}. Message tone shows ${urgency.toLowerCase()} buying intent.`,
      requirements: [
        leadData.propertyRequirement,
        `Preferred location: ${leadData.location}`,
        `Stated budget: ${leadData.budget}`,
        `Target closing: ${leadData.buyingTimeline}`
      ],
      concerns: [
        "Pricing transparency and total all-inclusive cost",
        "Timely possession and documentation verification"
      ],
      recommendedAction: `Acknowledge request within 15 minutes. Send top 2 matching properties in ${leadData.location} matching ${leadData.budget}.`,
      suggestedResponse: `Hello ${leadData.name}, thank you for reaching out regarding properties in ${leadData.location}. I have shortlisted 2 verified options matching your requirement of ${leadData.propertyRequirement} within your ${leadData.budget} budget. Would you be free for a brief 5-minute call today to discuss details?`
    }
  };
}
