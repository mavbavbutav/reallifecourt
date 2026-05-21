export default function ActionButtons({ actions }) {
  return (
    <div className="quick-actions">
      {actions.map((action) => (
        <a
          className={`quick-action ${action.tone === "primary" ? "quick-action-primary" : ""}`}
          href={action.href}
          key={action.label}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noreferrer" : undefined}
        >
          <span className="quick-action-icon" aria-hidden="true">
            {action.tone === "primary" ? "+" : "#"}
          </span>
          {action.label}
        </a>
      ))}
    </div>
  );
}
