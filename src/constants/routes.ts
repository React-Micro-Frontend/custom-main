export const ROUTES = {
  LANDING: '/',
  HOME: '/dashboard',
  LOGIN: '/login',
  USER_MANAGEMENT: '/user-management',
  POST_CLEARANCE_AUDIT: '/post-clearance-audit',
  LICENSE_MANAGEMENT: '/license-management',
  E_AUCTION_MANAGEMENT: '/e-auction-management',
} as const;

export const MENU_ITEMS = [
  { name: 'Dashboard', icon: '🏠', path: ROUTES.HOME },
  { name: 'User Management', icon: '👥', path: ROUTES.USER_MANAGEMENT },
  { name: 'Post Clearance Audit', icon: '📋', path: ROUTES.POST_CLEARANCE_AUDIT },
  { name: 'License Management', icon: '📜', path: ROUTES.LICENSE_MANAGEMENT },
  { name: 'E Auction Management', icon: '🔨', path: ROUTES.E_AUCTION_MANAGEMENT },
] as const;
