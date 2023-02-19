/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "slide-in": {
                    from: { transform: "translateX(100%)" },
                    to: { transform: "translateX(0)" },
                },
                "fade-in": {
                    "0%": { opacity: .2 },
                    "25%": { opacity: .4 },
                    "50%": { opacity: .6 },
                    "75%": { opacity: .8 },
                    "100%": { opacity: 1.0 },
                }
            },
            animation: {
                "slide-in": "slide-in 0.3s ease-in-out",
                "fade-in": "fade-in 0.25s ease-in-out",
            },
            colors: {
                "white-new": "#F9F4F4",
                "dark": "#141010",
                "table-header": "#CC5E3F",
                "background": "#F0E6EF",
                "form": "#FF0022",
            },
            fontFamily: {
                body: ["Nunito", "sans-serif"],
                heading: ["Montserrat", "sans-serif"],
            },
        },
    },
    plugins: [],
};
