import { useState } from "react";
import { CASE_FORM_ENDPOINT } from "../../config/siteConfig.js";

const CASE_TYPES = [
  "Which Was Worse?",
  "Nostalgia vs Modern",
  "Wellness Gimmick vs Common Sense",
  "Beauty/Fashion Crime",
  "Middle School Trauma",
  "Other",
];

const INITIAL_FORM = {
  caseIdea: "",
  caseType: "",
  sideA: "",
  sideB: "",
  whyRelatable: "",
  burnLine: "",
  creditPermission: "Yes, use my TikTok handle",
  tiktokHandle: "",
  email: "",
};

function validateEmail(value) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildCloudflarePayload(form) {
  return {
    "Form type": "Real Life Court Case",
    "Your case idea": form.caseIdea.trim(),
    "Case type": form.caseType,
    "Side A": form.sideA.trim(),
    "Side B": form.sideB.trim(),
    "Why relatable": form.whyRelatable.trim(),
    "Suggested joke or burn line": form.burnLine.trim(),
    "Credit permission": form.creditPermission,
    "TikTok handle": form.tiktokHandle.trim(),
    Email: form.email.trim(),
    Source: "real-life-court-link-in-bio",
    "Submitted at": new Date().toISOString(),
  };
}

export default function SubmitCaseForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.caseIdea.trim()) {
      nextErrors.caseIdea = "The court needs a case idea.";
    }

    if (!form.caseType) {
      nextErrors.caseType = "Pick the legal category of this nonsense.";
    }

    if (!form.whyRelatable.trim()) {
      nextErrors.whyRelatable = "Tell us why this belongs in emotional court.";
    }

    if (!validateEmail(form.email.trim())) {
      nextErrors.email = "Enter a valid email or leave it blank.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) {
      setStatus("error");
      setMessage("A few exhibits need cleanup before they can be admitted.");
      return;
    }

    const payload = buildCloudflarePayload(form);
    const fallbackSuccessMessage =
      "Your case has been entered into evidence. Court is now emotionally reviewing it. ⚖️";

    setStatus("submitting");

    try {
      let result = {};

      if (CASE_FORM_ENDPOINT) {
        const response = await fetch(CASE_FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        result = await response.json().catch(() => ({}));

        if (!response.ok || result.ok === false) {
          throw new Error(
            result.message || `Form endpoint responded with ${response.status}`,
          );
        }
      } else {
        // To switch away from the default Cloudflare Worker, set
        // VITE_CASE_FORM_ENDPOINT to Google Forms, Formspree, Netlify Forms,
        // or a custom backend that accepts this JSON payload.
        console.info("Real Life Court demo submission", payload);
      }

      setForm(INITIAL_FORM);
      setErrors({});
      setStatus("success");
      setMessage(result.message || fallbackSuccessMessage);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("The clerk dropped the file. Try submitting again in a minute.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section className="submit-section section-shell" id="submit">
      <div className="section-heading">
        <p className="section-stamp">Emotionally admissible</p>
        <h2>Submit Your Case</h2>
        <p>
          What nostalgic trauma, wellness gimmick, or adult nonsense should go on
          trial next?
        </p>
        <p className="submit-note">
          Straight to the writing room. The comments will do the sentencing.
        </p>
      </div>

      <form className="case-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <Field
            error={errors.caseIdea}
            id="caseIdea"
            label="Your case idea"
            required
          >
            <input
              aria-describedby={errors.caseIdea ? "caseIdea-error" : undefined}
              aria-invalid={Boolean(errors.caseIdea)}
              id="caseIdea"
              name="caseIdea"
              onChange={updateField}
              placeholder="Example: Lip Gloss in Wind vs Wet Hair on the Bus"
              value={form.caseIdea}
            />
          </Field>

          <Field error={errors.caseType} id="caseType" label="Case type" required>
            <select
              aria-describedby={errors.caseType ? "caseType-error" : undefined}
              aria-invalid={Boolean(errors.caseType)}
              id="caseType"
              name="caseType"
              onChange={updateField}
              value={form.caseType}
            >
              <option value="">Pick your villain</option>
              {CASE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field id="sideA" label="Side A">
            <input
              id="sideA"
              name="sideA"
              onChange={updateField}
              placeholder="Example: Jelly Shoes"
              value={form.sideA}
            />
          </Field>

          <Field id="sideB" label="Side B">
            <input
              id="sideB"
              name="sideB"
              onChange={updateField}
              placeholder="Example: Designer Sandals"
              value={form.sideB}
            />
          </Field>

          <Field
            className="form-field-wide"
            error={errors.whyRelatable}
            id="whyRelatable"
            label="Why is this painfully relatable?"
            required
          >
            <textarea
              aria-describedby={errors.whyRelatable ? "whyRelatable-error" : undefined}
              aria-invalid={Boolean(errors.whyRelatable)}
              id="whyRelatable"
              name="whyRelatable"
              onChange={updateField}
              placeholder="Tell us the memory, pain, smell, embarrassment, or trauma."
              rows="5"
              value={form.whyRelatable}
            />
          </Field>

          <Field className="form-field-wide" id="burnLine" label="Suggested joke or burn line">
            <input
              id="burnLine"
              name="burnLine"
              onChange={updateField}
              placeholder="Optional: 'You're anxiety with a charger.'"
              value={form.burnLine}
            />
          </Field>

          <fieldset className="credit-field">
            <legend>Can we credit you?</legend>
            {["Yes, use my TikTok handle", "No, keep me anonymous"].map((option) => (
              <label key={option} className="radio-option">
                <input
                  checked={form.creditPermission === option}
                  name="creditPermission"
                  onChange={updateField}
                  type="radio"
                  value={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>

          <Field id="tiktokHandle" label="TikTok handle">
            <input
              id="tiktokHandle"
              name="tiktokHandle"
              onChange={updateField}
              placeholder="Optional: @yourhandle"
              value={form.tiktokHandle}
            />
          </Field>

          <Field error={errors.email} id="email" label="Email">
            <input
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              id="email"
              inputMode="email"
              name="email"
              onChange={updateField}
              placeholder="Optional"
              type="email"
              value={form.email}
            />
          </Field>
        </div>

        <button className="button button-primary submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Entering Evidence..." : "Enter Into Evidence"}
        </button>

        {message ? (
          <p
            className={`form-message ${status === "success" ? "form-message-success" : "form-message-error"}`}
            role={status === "success" ? "status" : "alert"}
          >
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}

function Field({ children, className = "", error, id, label, required = false }) {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
