export default function About() {
  const notes = [
    "Created by LivHealthy",
    "AI-assisted cartoon comedy",
    "TikTok-first format",
    "Viewers become the writing room first",
  ];

  return (
    <section className="about-section section-shell" id="about">
      <div className="about-copy">
        <p className="section-stamp">Court is in session</p>
        <h2>What is Real Life Court?</h2>
        <p>
          Real Life Court puts nostalgia, wellness gimmicks, girlhood trauma, and
          modern bad ideas on trial. If it made middle school weird, adulthood
          expensive, or self-care suspicious, it belongs here. The audience is
          the writing room before anything gets sold.
        </p>
      </div>

      <div className="about-notes" aria-label="About Real Life Court">
        {notes.map((note) => (
          <span key={note}>{note}</span>
        ))}
      </div>

      <a className="section-return-cta" href="#submit">
        Join the writing room
      </a>
    </section>
  );
}
