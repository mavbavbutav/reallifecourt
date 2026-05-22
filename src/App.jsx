import { useState } from "react";
import Header from "./components/Header.jsx";
import WritingRoom from "./components/WritingRoom.jsx";
import SubmitCaseForm from "./components/SubmitCaseForm.jsx";
import WhichWasWorse from "./components/WhichWasWorse.jsx";
import Docket from "./components/Docket.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import cases from "./data/cases.json";

export default function App() {
  const [caseDraft, setCaseDraft] = useState(null);

  function handleChooseStarter(starter) {
    setCaseDraft({
      draftId: `${starter.title}-${Date.now()}`,
      caseIdea: starter.title,
    });
  }

  return (
    <>
      <Header />
      <main>
        <SubmitCaseForm draft={caseDraft} />
        <WritingRoom cases={cases.fanStarters} onChooseStarter={handleChooseStarter} />
        <WhichWasWorse cases={cases.whichWasWorse} onChooseStarter={handleChooseStarter} />
        <Docket cases={cases.docket} />
        <About />
      </main>
      <Footer />
    </>
  );
}
