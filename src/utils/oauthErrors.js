/**
 * Shared helpers for the Google OAuth flow:
 * - Friendly error messages for every error code the server
 *   can redirect back with.
 * - A guard for validating internal redirect paths so an
 *   OAuth flow can never be turned into an open redirect.
 */
export const OAUTH_ERROR_MESSAGES = {
  google_code_missing:
    "Google authentication failed: missing authorization code.",

  google_not_configured:
    "Google authentication is not configured on the server.",

  google_email_missing:
    "Google authentication failed: email not provided by Google.",

  google_access_denied:
    "Google sign-in was cancelled. Please try again and approve the requested permissions.",

  google_invalid_state:
    "Your Google sign-in session expired or is invalid. Please start again.",

  google_auth_failed:
    "Google authentication failed. Please try again.",
};

export const getOAuthErrorMessage = (code) =>
  OAUTH_ERROR_MESSAGES[code] ||
  "Google authentication failed. Please try again.";

/**
 * Only allow relative in-app paths (e.g. "/services").
 * Blocks protocol-relative ("//evil.com") and absolute URLs.
 */
export const isSafeInternalPath = (path) =>
  typeof path === "string" &&
  path.startsWith("/") &&
  !path.startsWith("//") &&
  !path.includes("://");
