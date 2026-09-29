import React, { useState } from "react";
import { UserPlus, RotateCcw, ArrowLeft, CheckCircle2 } from "lucide-react";

/**
 * AddLead Page - Inbound Lead Intake Form
 * @param {Object} props
 * @param {Function} props.onAddLead - Handler to add lead to state
 * @param {Function} props.onCancel - Return to dashboard callback
 */
export default function AddLead({ onAddLead, onCancel }) {
  const initialFormState = {
    name: "",
    location: "",
    propertyRequirement: "",
    budget: "",
    buyingTimeline: "Within 15 days",
    customerMessage: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const timelineOptions = [
    "Immediate / Within 15 days",
    "Within 30 days",
    "1 to 2 months",
    "3 to 6 months",
    "1+ year / Just exploring"
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Preferred location is required.";
    }

    if (!formData.propertyRequirement.trim()) {
      newErrors.propertyRequirement = "Property requirement is required (e.g., 3 BHK, Plot, Villa).";
    }

    if (!formData.budget.trim()) {
      newErrors.budget = "Budget range is required (e.g., ₹1.5 Cr).";
    }

    if (!formData.customerMessage.trim()) {
      newErrors.customerMessage = "Customer message or inquiry notes are required for AI analysis.";
    } else if (formData.customerMessage.trim().length < 10) {
      newErrors.customerMessage = "Please enter at least 10 characters for meaningful analysis.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSuccess(true);
    setTimeout(() => {
      onAddLead(formData);
    }, 400);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="form-card">
        <div className="form-header">
          <h2>Inbound Real-Estate Lead Intake</h2>
          <p>
            Enter incoming buyer inquiry details. In Phase 6, Masal AI will automatically score this lead and extract structured customer intent.
          </p>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 16px" }} />
            <h3>Lead Captured Successfully!</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
              Generating mock AI insights and redirecting...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Customer Name <span className="req">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Rajesh Sharma"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label" htmlFor="location">
                  Target Location / Micro-market <span className="req">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Whitefield, Bangalore"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <span className="form-error">{errors.location}</span>}
              </div>

              {/* Property Requirement */}
              <div className="form-group">
                <label className="form-label" htmlFor="propertyRequirement">
                  Property Requirement <span className="req">*</span>
                </label>
                <input
                  id="propertyRequirement"
                  name="propertyRequirement"
                  type="text"
                  className="form-input"
                  placeholder="e.g., 3 BHK Luxury Apartment with Balcony"
                  value={formData.propertyRequirement}
                  onChange={handleChange}
                />
                {errors.propertyRequirement && (
                  <span className="form-error">{errors.propertyRequirement}</span>
                )}
              </div>

              {/* Budget */}
              <div className="form-group">
                <label className="form-label" htmlFor="budget">
                  Budget Range <span className="req">*</span>
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  className="form-input"
                  placeholder="e.g., ₹1.8 Cr - ₹2.2 Cr"
                  value={formData.budget}
                  onChange={handleChange}
                />
                {errors.budget && <span className="form-error">{errors.budget}</span>}
              </div>

              {/* Buying Timeline */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="buyingTimeline">
                  Buying Timeline <span className="req">*</span>
                </label>
                <select
                  id="buyingTimeline"
                  name="buyingTimeline"
                  className="form-select"
                  value={formData.buyingTimeline}
                  onChange={handleChange}
                >
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Message */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="customerMessage">
                  Original Customer Message / Inquiry <span className="req">*</span>
                </label>
                <textarea
                  id="customerMessage"
                  name="customerMessage"
                  className="form-textarea"
                  placeholder="Paste WhatsApp inquiry, email inquiry, or call notes here..."
                  value={formData.customerMessage}
                  onChange={handleChange}
                />
                {errors.customerMessage && (
                  <span className="form-error">{errors.customerMessage}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                <RotateCcw size={14} />
                <span>Reset Form</span>
              </button>
              <button type="submit" className="btn btn-primary">
                <UserPlus size={16} />
                <span>Save & Analyze Lead</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
