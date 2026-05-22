import { siteConfig } from "../../config/siteConfig.js";

const navItems = [
  { label: "Starter Pack", href: "#writing-room" },
  { label: "Docket", href: "#docket" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#submit" aria-label="Real Life Court home">
        <span className="brand-mark" aria-hidden="true">
          RLC
        </span>
        <span>
          <span className="brand-name">{siteConfig.title}</span>
          <span className="brand-subline">by {siteConfig.creator}</span>
        </span>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#submit" aria-label="Submit an Idea">
        Submit Idea
      </a>
    </header>
  );
}
