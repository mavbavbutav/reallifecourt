import CaseCard from "./CaseCard.jsx";

export default function Docket({ cases }) {
  return (
    <section className="section-shell docket-section" id="docket">
      <div className="section-heading section-heading-row">
        <div>
          <p className="section-stamp">Latest docket</p>
          <h2>Current Docket</h2>
        </div>
        <p>No healing allowed. Just testimony, glitter, and a mildly hostile group chat.</p>
      </div>

      <div className="docket-list">
        {cases.map((caseItem) => (
          <CaseCard caseItem={caseItem} key={caseItem.title} variant="docket" />
        ))}
      </div>
    </section>
  );
}
