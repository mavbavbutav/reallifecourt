import { siteConfig } from "../../config/siteConfig.js";

const socials = [
  { label: "TikTok", href: siteConfig.socialLinks.tiktok, mark: "TT", external: true },
  { label: "Lemon8", href: siteConfig.socialLinks.lemon8, mark: "L8", external: true },
  {
    label: "YouTube Shorts",
    href: siteConfig.socialLinks.youtube,
    mark: "YT",
    placeholder: true,
  },
  {
    label: "Instagram",
    href: siteConfig.socialLinks.instagram,
    mark: "IG",
    placeholder: true,
  },
  { label: "Email", href: siteConfig.socialLinks.email, mark: "@", placeholder: true },
];

const visibleSocials = socials.filter((social) => !social.placeholder);

export default function Footer() {
  return (
    <footer className="site-footer" id="social">
      <div className="section-shell footer-inner">
        <div>
          <p className="footer-title">Put your nostalgia on trial.</p>
          <p className="footer-copy">
            Submit your trauma. Pick your villain. Help write the next case.
          </p>
        </div>

        <nav className="social-links" aria-label="Social links">
          {visibleSocials.map((social) => (
            <a
              href={social.href}
              key={social.label}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noreferrer" : undefined}
            >
              <span aria-hidden="true">{social.mark}</span>
              {social.label}
              {social.placeholder ? <small>placeholder</small> : null}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
