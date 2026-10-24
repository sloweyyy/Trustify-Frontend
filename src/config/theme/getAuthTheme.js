import { getTrustifyThemeOptions } from './createTrustifyTheme';

// Auth's existing ThemeProviders consume the same tokens and overrides as the app.
export default function getAuthTheme(mode = 'light') {
  return getTrustifyThemeOptions(mode);
}
