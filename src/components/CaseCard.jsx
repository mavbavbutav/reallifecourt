const statusClass = {
  Filed: "status-filed",
  "Under Review": "status-review",
  "In Court": "status-court",
  "Case Dismissed": "status-dismissed",
};

export default function CaseCard({
  caseItem,
  ctaLabel,
  href,
  onChooseCase,
  variant = "default",
}) {
  return (
    <article className={`case-card case-card-${variant}`}>
      <div className="case-card-topline">
        <span>{caseItem.category || "Evidence"}</span>
        {caseItem.status ? (
          <span className={`case-status ${statusClass[caseItem.status] || ""}`}>
            {caseItem.status}
          </span>
        ) : null}
      </div>

      <h3>{caseItem.title}</h3>

      {caseItem.prompt ? <p>{caseItem.prompt}</p> : null}

      {ctaLabel && onChooseCase ? (
        <button
          className="case-card-link case-card-button"
          onClick={() => onChooseCase(caseItem)}
          type="button"
        >
          {ctaLabel}
        </button>
      ) : null}

      {ctaLabel && !onChooseCase ? (
        <a className="case-card-link" href={href}>
          {ctaLabel}
        </a>
      ) : null}
    </article>
  );
}
