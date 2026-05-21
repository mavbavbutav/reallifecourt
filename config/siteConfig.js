export const CASE_FORM_ENDPOINT = import.meta.env.VITE_CASE_FORM_ENDPOINT || "";

export const siteConfig = {
  title: "Real Life Court",
  creator: "LivHealthy",
  tagline: "Nostalgia, wellness, and bad ideas on trial.",
  description:
    "Submit the middle school memory, wellness gimmick, or modern nonsense that deserves to go on trial next.",
  socialLinks: {
    // TODO: Replace placeholder URLs before launch.
    tiktok: "https://www.tiktok.com/@livhealthy",
    lemon8: "https://www.lemon8-app.com/",
    youtube: "#youtube-shorts-placeholder",
    instagram: "#instagram-placeholder",
    email: "mailto:hello@example.com",
  },
  formEndpoint: CASE_FORM_ENDPOINT,
  analytics: {
    // Add IDs later only when you are ready to load analytics scripts.
    googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
    plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || "",
    tiktokPixelId: import.meta.env.VITE_TIKTOK_PIXEL_ID || "",
  },
};
