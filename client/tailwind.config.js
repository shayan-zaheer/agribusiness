/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'field-image': "url('src/assets/images/FarmBackground.jpg')",
        'logo-image': "url('src/assets/images/nav-icon.jpg')",
      },
      height:{
        
      }

    },
    
  },
  plugins: [],
}

