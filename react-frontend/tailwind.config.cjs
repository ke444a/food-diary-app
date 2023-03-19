/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    "0%": { opacity: .2 },
                    "25%": { opacity: .4 },
                    "50%": { opacity: .6 },
                    "75%": { opacity: .8 },
                    "100%": { opacity: 1.0 },
                }
            },
            animation: {
                "fade-in": "fade-in 0.25s ease-in-out",
            },
            colors: {
                "white-new": "#F9F4F4",
                "dark": "#141010",
                "table-header": "#3A3335", 
                "background": "#ECE7E1",
                "form": "#EEC643",
                "custom-green": "#13620C",
                "custom-red": "#E94F37",
                "custom-gray": "#93A8AC",
            },
            fontFamily: {
                body: ["Nunito", "sans-serif"],
                heading: ["Montserrat", "sans-serif"],
            },
        },
    },
    plugins: [],
};
