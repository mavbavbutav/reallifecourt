import CaseCard from "./CaseCard.jsx";

export default function WhichWasWorse({ cases, onChooseStarter }) {
  return (
    <section className="section-shell which-section" id="which-was-worse">
      <div className="section-heading">
        <p className="section-stamp">The comments will decide</p>
        <h2>Which Was Worse?</h2>
        <p>Two middle-school disasters enter. One gets declared emotionally worse.</p>
      </div>

      <div className="card-grid card-grid-tight">
        {cases.map((caseItem) => (
          <CaseCard
            caseItem={caseItem}
            ctaLabel="Submit a Worse One"
            href="#submit"
            key={caseItem.title}
            onChooseCase={onChooseStarter}
            variant="which"
          />
        ))}
      </div>
    </section>
  );
}
