/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          'xs': '480px',      // Extra small devices
          'sm': '640px',      // Small devices (default)
          'md': '768px',      // Medium devices (default)
          'lg': '1024px',     // Large devices (default)
          'xl': '1280px',     // Extra large devices (default)
          '2xl': '1536px',    // 2x large devices (default)
          '3xl': '1920px',    // 3x large devices (for very large screens)
        },
      },
    },
    plugins: [],
  }