/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9F9F9",
        text: "#333333",
        myGreen: "#4CAF50",
        myYellow: "#FF9800",
        myRed: "#F44336",
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'], // Fallbacks included
      },
    },
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin" : {
           scrollBarWidth: "thin",
           scrollbarColor: "#1E3E62"
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar" : {
            width: "6px"
          },
          "&::-webkit-scrollbar-track" : {
            background: "#f3f6f4",
            marginTop: "6px",
            borderRadius: "20px",
          },
          "&::-webkit-scrollbar-thumb" : {
            background: "#bcbcbc",
            borderRadius: "20px",
            
            
          }
        }
      }
      addUtilities(newUtilities,["responsive", "hover"])
    }
  ],  
}