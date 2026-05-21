import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MobileCaseDock from "./components/MobileCaseDock.jsx";
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
    const [fallbackSideA = "", fallbackSideB = ""] = starter.title.split(" vs ");

    setCaseDraft({
      draftId: `${starter.title}-${Date.now()}`,
      caseIdea: starter.title,
      caseType: starter.category || "Which Was Worse?",
      sideA: starter.sideA || fallbackSideA.trim(),
      sideB: starter.sideB || fallbackSideB.trim(),
      whyRelatable: starter.whyRelatable || "",
      burnLine: starter.burnLine || "",
    });
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SubmitCaseForm draft={caseDraft} />
        <WritingRoom cases={cases.fanStarters} onChooseStarter={handleChooseStarter} />
        <WhichWasWorse cases={cases.whichWasWorse} onChooseStarter={handleChooseStarter} />
        <Docket cases={cases.docket} />
        <About />
      </main>
      <MobileCaseDock />
      <Footer />
    </>
  );
}
