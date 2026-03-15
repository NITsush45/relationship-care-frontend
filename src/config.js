/**
 * Backend API base URL.
 * - In dev: empty string so create-react-app proxy (see package.json) forwards to backend.
 * - In production: set REACT_APP_API_URL in .env (e.g. https://api.yoursite.com).
 */
const rawApiUrl = process.env.REACT_APP_API_URL?.trim();
const looksLikeDashboardUrl = rawApiUrl?.includes("railway.com/project/");
const isValidApiUrl = rawApiUrl?.startsWith("http://") || rawApiUrl?.startsWith("https://");

const getOrigin = () =>
  typeof window !== "undefined" && window.location ? window.location.origin : "";

let apiBase = "";

if (rawApiUrl) {
  if (isValidApiUrl && !looksLikeDashboardUrl) {
    apiBase = rawApiUrl;
  } else {
    console.warn(
      "Invalid REACT_APP_API_URL. Use a public API URL (not a provider dashboard link). Falling back to same-origin."
    );
    apiBase = getOrigin();
  }
} else if (process.env.NODE_ENV === "development") {
  apiBase = "";
} else {
  // In production, default to same-origin so reverse proxies / rewrites work.
  apiBase = getOrigin();
}

export const API_BASE = apiBase;
