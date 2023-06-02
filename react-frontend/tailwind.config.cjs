/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    "0%": { opacity: 0.2 },
                    "25%": { opacity: 0.4 },
                    "50%": { opacity: 0.6 },
                    "75%": { opacity: 0.8 },
                    "100%": { opacity: 1.0 },
                },
            },
            animation: {
                "fade-in": "fade-in 0.25s ease-in-out",
            },
            colors: {
                "white-new": "#F9F4F4",
                dark: "#141010",
                background: "#ECE7E1",
                form: "#917BA9",
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
