
/**
 * Application route definitions
 */
export const ROUTES = {
  HOME: '/',
  DOCUMENTATION: '/documentation',
  ECOSYSTEM: '/ecosystem',
  WIDGET_STORE: '/widget-store',
  DASHBOARD: '/dashboard',
  WORKSHOP: '/workshop',
  NOT_FOUND: '*'
};

// Sub-routes for documentation
export const DOC_ROUTES = {
  OVERVIEW: '/documentation/overview',
  INTEGRATION: '/documentation/integration',
  WIDGET_DEVELOPMENT: '/documentation/widget-development',
  SECURITY: '/documentation/security',
  API_REFERENCE: '/documentation/api'
};

// Sub-routes for ecosystem
export const ECOSYSTEM_ROUTES = {
  WIDGETS: '/ecosystem/widgets',
  EXTENSIONS: '/ecosystem/extensions',
  PLUGINS: '/ecosystem/plugins',
  THEMES: '/ecosystem/themes'
};

// Sub-routes for workshop
export const WORKSHOP_ROUTES = {
  MARKETING: '/workshop/marketing',
  DEVELOPER: '/workshop/developer',
  DASHBOARD: '/workshop/dashboard'
};
