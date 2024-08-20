/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        // You can uncomment and customize these if needed
        // sm: "2rem",
        // lg: "4rem",
        // xl: "5rem",
        // "2xl": "6rem",
      },
      // screens: {
      //   xs: "100%",   // For very small screens (up to 430px)
      //   lg: "800px",  // Set container width to 800px for screens below 1000px
      //   lg10: "950px",// Slightly larger for screens at 1024px
      //   xl: "1170px", // Increase container width for larger screens
      //   '2xl': "1280px",
      // },
    },
    extend: {
      screens: {
        xs: "100%",
        lg: "840px",
        lg10: "1024px",
        xl: "1150px",
        "2xl": "1320px"  // Corrected to include 'px'
      },
    },
  },
  plugins: [],
};



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     container: {
//       center: true,
//       padding: {
//         DEFAULT: "1rem",
     
//       },
  
//     },
//     extend: {
//       screens: {
//         xs: "430px",
//         lg: "992px",
//         lg10: "1024px",
//         xl: "1280px",
//         "2xl": "1360px",  
//       },
//     },
//   },
//   plugins: [],
// };