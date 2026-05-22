export default function WritingRoom({ cases, onChooseStarter }) {
  return (
    <section className="writing-room-section section-shell" id="writing-room">
      <div className="writing-room-copy">
        <p className="section-stamp">Need a starter?</p>
        <h2>Tap one if your brain went blank.</h2>
        <p>
          Starter cases drop straight into the idea box. Change the details,
          keep the pain, and submit it.
        </p>
      </div>

      <div className="writing-room-brief" aria-label="Case submission cues">
        <span>One sentence is enough.</span>
        <span>Specific beats perfect.</span>
        <span>The weird detail wins.</span>
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
            <small>Use this idea</small>
          </button>
        ))}
      </div>
    </section>
  );
}
