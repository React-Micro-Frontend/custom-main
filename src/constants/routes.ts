export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  USER_MANAGEMENT: '/user-management',
  POST_CLEARANCE_AUDIT: '/post-clearance-audit',
  LICENSE_MANAGEMENT: '/license-management',
  E_AUCTION_MANAGEMENT: '/e-auction-management',
} as const;

export const MENU_ITEMS = [
  { name: 'User Management', icon: '👥', path: ROUTES.USER_MANAGEMENT },
  { name: 'Post Clearance Audit', icon: '📋', path: ROUTES.POST_CLEARANCE_AUDIT },
  { name: 'License Management', icon: '📜', path: ROUTES.LICENSE_MANAGEMENT },
  { name: 'E Auction Management', icon: '🔨', path: ROUTES.E_AUCTION_MANAGEMENT },
] as const;
