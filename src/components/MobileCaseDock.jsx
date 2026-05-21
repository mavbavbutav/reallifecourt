import { useEffect, useState } from "react";

export default function MobileCaseDock() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("#submit, .starter-grid"));
    const visibleTargets = new Set();

    if (!targets.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleTargets.add(entry.target);
          } else {
            visibleTargets.delete(entry.target);
          }
        });

        setIsHidden(visibleTargets.size > 0);
      },
      {
        rootMargin: "-12% 0px -16% 0px",
        threshold: 0.08,
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`mobile-case-dock ${isHidden ? "mobile-case-dock-hidden" : ""}`}
      aria-label="Mobile case shortcuts"
    >
      <a className="mobile-dock-primary" href="#submit">
        <span>Submit</span>
        <strong>File a case</strong>
      </a>
      <a className="mobile-dock-secondary" href="#writing-room">
        Starter pack
      </a>
    </nav>
  );
}
