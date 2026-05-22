import { useEffect, useRef, useState } from "react";
import { CASE_FORM_ENDPOINT } from "../../config/siteConfig.js";

const INITIAL_FORM = {
  caseIdea: "",
};

function buildCloudflarePayload(form) {
  return {
    "Form type": "Real Life Court Case",
    "Your case idea": form.caseIdea.trim(),
    "Case type": "Fan suggestion",
    "Side A": "",
    "Side B": "",
    "Why relatable": form.caseIdea.trim(),
    "Suggested joke or burn line": "",
    "Credit permission": "Not requested",
    "TikTok handle": "",
    Email: "",
    Source: "real-life-court-link-in-bio",
    "Submitted at": new Date().toISOString(),
  };
}

export default function SubmitCaseForm({ draft }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const caseIdeaRef = useRef(null);

  useEffect(() => {
    if (!draft) return;

    setForm((current) => ({
      ...current,
      caseIdea: draft.caseIdea || "",
    }));
    setErrors({});
    setStatus("idle");
    setMessage("");

    window.requestAnimationFrame(() => {
      document.getElementById("submit")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.setTimeout(() => caseIdeaRef.current?.focus(), 350);
    });
  }, [draft]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.caseIdea.trim()) {
      nextErrors.caseIdea = "Type the idea first. Court cannot read minds yet.";
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
    <section className="submit-section submit-landing section-shell" id="submit">
      <div className="section-heading">
        <p className="section-stamp">Court is in session</p>
        <h1>Real Life Court</h1>
        <h2>Submit an idea</h2>
        <p>
          Type the nostalgic trauma, wellness gimmick, or modern nonsense that
          should go on trial next.
        </p>
        <p className="submit-note">
          No categories. No homework. Just drop the thought.
        </p>
      </div>

      <form className="case-form" onSubmit={handleSubmit} noValidate>
        <Field error={errors.caseIdea} id="caseIdea" label="Your idea" required>
          <textarea
            aria-describedby={errors.caseIdea ? "caseIdea-error" : undefined}
            aria-invalid={Boolean(errors.caseIdea)}
            autoFocus
            id="caseIdea"
            name="caseIdea"
            onChange={updateField}
            placeholder="Example: Lip Gloss in Wind vs Wet Hair on the Bus"
            ref={caseIdeaRef}
            rows="7"
            value={form.caseIdea}
          />
        </Field>

        <button className="button button-primary submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit Idea"}
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
