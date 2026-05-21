import ActionButtons from "./ActionButtons.jsx";
import { siteConfig } from "../../config/siteConfig.js";

const heroImage = `${import.meta.env.BASE_URL}assets/real-life-court-hero.png`;

const quickActions = [
  { label: "Submit a Case", href: "#submit", tone: "primary" },
  { label: "Which Was Worse?", href: "#which-was-worse" },
  { label: "Watch on TikTok", href: siteConfig.socialLinks.tiktok, external: true },
  { label: "Follow on Lemon8", href: siteConfig.socialLinks.lemon8, external: true },
  { label: "Latest Docket", href: "#docket" },
];

export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-visual" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>

      <div className="hero-content">
        <h1>Real Life Court</h1>
        <p className="hero-tagline">
          {siteConfig.tagline} <span aria-hidden="true">&#9878;</span>
        </p>
        <p className="hero-intro">{siteConfig.description}</p>

        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#submit">
            Submit a Case
          </a>
          <a className="button button-secondary" href="#which-was-worse">
            Suggest a Which Was Worse Battle
          </a>
        </div>

        <ActionButtons actions={quickActions} />
      </div>

      <div className="hero-evidence-strip" aria-hidden="true">
        <span>Evidence accepted</span>
        <span>Middle school remembers</span>
        <span>Case dismissed</span>
      </div>
    </section>
  );
}
