import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SubmitCaseForm from "./components/SubmitCaseForm.jsx";
import WhichWasWorse from "./components/WhichWasWorse.jsx";
import Docket from "./components/Docket.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import cases from "./data/cases.json";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SubmitCaseForm />
        <WhichWasWorse cases={cases.whichWasWorse} />
        <Docket cases={cases.docket} />
        <About />
      </main>
      <Footer />
    </>
  );
}
