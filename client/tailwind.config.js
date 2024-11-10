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
      keyframes: {
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceOnHover: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        fadeInDown: 'fadeInDown 1s ease-out forwards',
        scaleUp: 'scaleUp 1s ease-in-out forwards',
        fadeInRight: 'fadeInRight 1.5s ease-in-out forwards',
        bounceOnHover: 'bounceOnHover 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
