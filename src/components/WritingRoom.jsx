export default function WritingRoom({ cases, onChooseStarter }) {
  return (
    <section className="writing-room-section section-shell" id="writing-room">
      <div className="writing-room-copy">
        <p className="section-stamp">Fan writing room</p>
        <h2>Remix a case before the bell rings.</h2>
        <p>
          Tap a starter, add the weird little detail that makes everyone comment
          "wait, why do I remember this?", and send it straight to court.
        </p>
      </div>

      <div className="writing-room-brief" aria-label="Case submission cues">
        <span>The detail is the joke.</span>
        <span>Pick the villain.</span>
        <span>Middle school remembers.</span>
      </div>

      <div className="starter-grid" aria-label="Fan case starters">
        {cases.map((caseItem) => (
          <button
            className="starter-card"
            key={caseItem.title}
            onClick={() => onChooseStarter(caseItem)}
            type="button"
          >
            <span className="starter-category">{caseItem.category}</span>
            <strong>{caseItem.title}</strong>
            <span>{caseItem.prompt}</span>
            <small>Remix this case</small>
          </button>
        ))}
      </div>
    </section>
  );
}
