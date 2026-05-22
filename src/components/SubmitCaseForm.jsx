import { useEffect, useRef, useState } from "react";
import { CASE_FORM_ENDPOINT, siteConfig } from "../../config/siteConfig.js";

const INITIAL_FORM = {
  caseIdea: "",
  tiktokHandle: "",
};

const TIKTOK_HANDLE_PATTERN = /^@?[A-Za-z0-9._]{2,24}$/;

function generateCaseNumber() {
  return `RLC-${Date.now().toString(36).slice(-5).toUpperCase()}`;
}

function normalizeTikTokHandle(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

function buildCloudflarePayload(form, caseNumber) {
  const tiktokHandle = normalizeTikTokHandle(form.tiktokHandle);

  return {
    "Form type": "Real Life Court Case",
    "Case number": caseNumber,
    "Your case idea": form.caseIdea.trim(),
    "Case type": "Fan suggestion",
    "Side A": "",
    "Side B": "",
    "Why relatable": form.caseIdea.trim(),
    "Suggested joke or burn line": "",
    "Credit permission": tiktokHandle
      ? "Yes, use my TikTok handle"
      : "Anonymous / no handle provided",
    "TikTok handle": tiktokHandle,
    Email: "",
    Source: "real-life-court-link-in-bio",
    "Submitted at": new Date().toISOString(),
  };
}

export default function SubmitCaseForm({ draft, quickStarters = [] }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [lastCaseNumber, setLastCaseNumber] = useState("");
  const [starterCue, setStarterCue] = useState("");
  const caseIdeaRef = useRef(null);
  const tiktokHandleRef = useRef(null);

  useEffect(() => {
    if (!draft) return;

    setForm((current) => ({
      ...current,
      caseIdea: draft.caseIdea || "",
    }));
    setErrors({});
    setStatus("idle");
    setMessage("");
    setLastCaseNumber("");
    setStarterCue("Starter loaded. Change the details, keep the pain.");

    window.requestAnimationFrame(() => {
      window.history.replaceState(null, "", "#submit");
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
    if (name === "caseIdea" && starterCue) {
      setStarterCue("Edited by you. Emotionally admissible.");
    }
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function chooseQuickStarter(starter) {
    setForm((current) => ({ ...current, caseIdea: starter.title }));
    setErrors({});
    setStatus("idle");
    setMessage("");
    setLastCaseNumber("");
    setStarterCue("Starter loaded. Change the details, keep the pain.");
    window.requestAnimationFrame(() => caseIdeaRef.current?.focus());
  }

  function chooseRandomStarter() {
    if (!quickStarters.length) return;

    const starter = quickStarters[Math.floor(Math.random() * quickStarters.length)];
    chooseQuickStarter(starter);
  }

  function handleSubmitAnother() {
    setForm((current) => ({
      ...INITIAL_FORM,
      tiktokHandle: current.tiktokHandle,
    }));
    setErrors({});
    setStatus("idle");
    setMessage("");
    setLastCaseNumber("");
    setStarterCue("");
    window.requestAnimationFrame(() => caseIdeaRef.current?.focus());
  }

  function getValidationErrors() {
    const nextErrors = {};

    if (!form.caseIdea.trim()) {
      nextErrors.caseIdea = "Type the idea first. One sentence is enough.";
    }

    if (form.tiktokHandle.trim() && !TIKTOK_HANDLE_PATTERN.test(form.tiktokHandle.trim())) {
      nextErrors.tiktokHandle = "Use a handle like @realifecourt.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const nextErrors = getValidationErrors();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage(
        nextErrors.caseIdea
          ? "Type one idea first. The court accepts chaos, not blanks."
          : "That TikTok handle needs a tiny cleanup before it can testify.",
      );
      window.requestAnimationFrame(() => {
        if (nextErrors.caseIdea) {
          caseIdeaRef.current?.focus();
        } else {
          tiktokHandleRef.current?.focus();
        }
      });
      return;
    }

    const caseNumber = generateCaseNumber();
    const payload = buildCloudflarePayload(form, caseNumber);
    const tiktokHandle = normalizeTikTokHandle(form.tiktokHandle);
    const successMessage = tiktokHandle
      ? `Your idea is in the same-day docket. If selected, we'll credit ${tiktokHandle} and it can hit TikTok today. \u2696\uFE0F`
      : "Your idea is in the same-day docket. If selected, it can hit TikTok today. \u2696\uFE0F";

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

      setForm({
        ...INITIAL_FORM,
        tiktokHandle: form.tiktokHandle,
      });
      setErrors({});
      setStatus("success");
      setLastCaseNumber(caseNumber);
      setStarterCue("");
      setMessage(successMessage);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Could not submit yet. Your idea is still here. Try again in a minute.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section className="submit-section submit-landing section-shell" id="submit">
      <div className="section-heading">
        <p className="section-stamp">Court is in session</p>
        <h1>Real Life Court</h1>
        <h2>Drop the idea. That's it.</h2>
        <p>
          No login. No categories. Type the memory, gimmick, or modern
          nonsense and add your @ if you want credit.
        </p>
        <p className="submit-note">
          Selected ideas can hit TikTok the same day.
        </p>
      </div>

      <form className="case-form" onSubmit={handleSubmit} noValidate>
        <Field
          error={errors.caseIdea}
          hint="Best detail: smell, outfit, bus ride."
          id="caseIdea"
          label="Type it here"
          required
        >
          <textarea
            aria-describedby={errors.caseIdea ? "caseIdea-error" : "caseIdea-hint"}
            aria-invalid={Boolean(errors.caseIdea)}
            aria-required="true"
            id="caseIdea"
            name="caseIdea"
            onChange={updateField}
            placeholder={`Example: Locker panic vs password reset
Or: Body glitter vs highlighter drops`}
            ref={caseIdeaRef}
            rows="7"
            value={form.caseIdea}
          />
        </Field>

        {starterCue ? (
          <p className="starter-loaded-cue" aria-live="polite">
            {starterCue}
          </p>
        ) : null}

        {quickStarters.length && status !== "success" ? (
          <div className="quick-starters" aria-label="Quick idea starters">
            <p>
              Need a nudge?
              <span>Swipe for more</span>
            </p>
            <div className="quick-starter-list">
              {quickStarters.map((starter) => (
                <button
                  className="quick-starter-chip"
                  key={starter.title}
                  onClick={() => chooseQuickStarter(starter)}
                  type="button"
                >
                  {starter.chipLabel || starter.title}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {status !== "success" ? (
          <div className="credit-handle-field">
            <div>
              <label htmlFor="tiktokHandle">TikTok @ for credit</label>
              <p
                className={errors.tiktokHandle ? "credit-handle-error" : ""}
                id={errors.tiktokHandle ? "tiktokHandle-error" : "tiktokHandle-hint"}
              >
                {errors.tiktokHandle || "Optional. Leave blank to stay anonymous."}
              </p>
            </div>
            <input
              aria-describedby={errors.tiktokHandle ? "tiktokHandle-error" : "tiktokHandle-hint"}
              aria-invalid={Boolean(errors.tiktokHandle)}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              id="tiktokHandle"
              inputMode="text"
              maxLength="25"
              name="tiktokHandle"
              onChange={updateField}
              placeholder="@yourhandle"
              ref={tiktokHandleRef}
              spellCheck="false"
              type="text"
              value={form.tiktokHandle}
            />
          </div>
        ) : null}

        {status !== "success" ? (
          <button className="button button-primary submit-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit Idea"}
          </button>
        ) : null}

        {status === "success" ? (
          <div className="form-success-panel" role="status">
            <p className="success-kicker">Evidence accepted.</p>
            {lastCaseNumber ? (
              <p className="success-case-number">Case #{lastCaseNumber}</p>
            ) : null}
            <p>{message}</p>
            <p className="success-reprompt">Got another one? The court is still open.</p>
            <div className="success-actions">
              <button type="button" onClick={handleSubmitAnother}>
                Submit another idea
              </button>
              {quickStarters.length ? (
                <button type="button" onClick={chooseRandomStarter}>
                  Try a starter
                </button>
              ) : null}
              <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noreferrer">
                Watch on TikTok
              </a>
            </div>
          </div>
        ) : null}

        {message && status === "error" ? (
          <p
            className="form-message form-message-error"
            role="alert"
          >
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}

function Field({
  children,
  className = "",
  error,
  hint,
  id,
  label,
  required = false,
}) {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="sr-only"> required</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
