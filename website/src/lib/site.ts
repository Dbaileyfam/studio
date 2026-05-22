export const SITE_NAME = "801 Family Studios";
export const SITE_URL = "https://www.801familystudios.com";
export const SITE_LOCATION = "Salt Lake City, Utah";
export const SITE_EMAIL = "info@801familystudios.com";

/** Full public URL for hash-router paths (e.g. /services/websites). */
export const sitePath = (path: string) =>
  `${SITE_URL}/#${path.startsWith("/") ? path : `/${path}`}`;
