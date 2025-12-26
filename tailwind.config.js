module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    // Scan all remote micro frontends
    "../user-management/src/**/*.{js,ts,jsx,tsx}",
    "../e-auction-management/src/**/*.{js,ts,jsx,tsx}",
    "../license-management/src/**/*.{js,ts,jsx,tsx}",
    "../post-clearance-audit/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
