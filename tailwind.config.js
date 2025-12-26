module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    // Scan all remote micro frontends (works locally)
    "../user-management/src/**/*.{js,ts,jsx,tsx}",
    "../e-auction-management/src/**/*.{js,ts,jsx,tsx}",
    "../license-management/src/**/*.{js,ts,jsx,tsx}",
    "../post-clearance-audit/src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    // Safelist classes used in remote projects (for Netlify builds)
    // Colors
    'bg-violet-200',
    'bg-orange-50', 'text-orange-600', 'text-orange-500',
    'bg-blue-50', 'text-blue-600', 'bg-blue-100',
    'bg-green-50', 'text-green-600', 'bg-green-100',
    'bg-yellow-50', 'text-yellow-600', 'bg-yellow-100',
    'bg-red-50', 'text-red-600', 'bg-red-100',
    'bg-purple-50', 'text-purple-600',
    'bg-emerald-50', 'text-emerald-600',
    'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    // Layout & spacing
    'min-h-screen', 'min-h-[60px]',
    'p-2', 'p-3', 'p-4', 'p-6', 'p-8', 'p-12',
    'py-1', 'py-2', 'py-3', 'py-8',
    'px-3', 'px-8',
    'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-6', 'mb-8', 'mb-12', 'mb-16',
    'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-6', 'mt-8', 'mt-16',
    'gap-4', 'gap-6', 'gap-8',
    'space-y-2', 'space-y-3', 'space-y-4',
    // Flexbox & Grid
    'flex', 'flex-1', 'flex-col', 'items-center', 'items-start', 'justify-between', 'justify-center', 'justify-items-center',
    'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5',
    'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5',
    'lg:grid-cols-3', 'lg:grid-cols-4',
    // Typography
    'text-xs', 'text-sm', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
    'font-medium', 'font-semibold', 'font-bold',
    'italic',
    'text-center', 'text-left',
    // Borders & Rounded
    'border', 'border-b', 'border-t', 'border-gray-200', 'border-yellow-200',
    'rounded', 'rounded-lg', 'rounded-full',
    // Effects
    'shadow-lg', 'shadow-xl', 'shadow-2xl',
    'hover:shadow-lg', 'hover:shadow-xl',
    'hover:bg-gray-50', 'hover:bg-gray-100',
    'hover:translate-x-2', 'hover:scale-x-100',
    'group-hover:translate-x-2', 'group-hover:scale-x-100',
    'transition-all', 'transition-shadow', 'transition-transform',
    'duration-200', 'duration-300',
    // Sizing
    'w-5', 'w-10', 'w-16', 'w-24', 'w-64', 'w-full',
    'h-2', 'h-5', 'h-10', 'h-16', 'h-screen',
    'max-w-3xl', 'max-w-7xl',
    // Positioning
    'relative', 'absolute',
    'overflow-hidden', 'overflow-x-auto', 'overflow-y-auto',
    // Display
    'block', 'inline-flex', 'hidden',
    // Background gradients
    'bg-gradient-to-br', 'bg-gradient-to-r',
    'from-gray-50', 'via-blue-50', 'to-purple-50',
    'from-blue-500', 'to-blue-600',
    'from-orange-500', 'to-orange-600',
    'from-purple-500', 'to-purple-600',
    'from-green-500', 'to-green-600',
    'from-blue-600', 'to-purple-600',
    // Table
    'table', 'w-full',
    'thead', 'tbody', 'tr', 'th', 'td',
    'last:border-b-0',
    // Misc
    'cursor-pointer',
    'opacity-75', 'opacity-90',
    'mx-auto',
    'transform', 'scale-x-0',
    'font-mono'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
