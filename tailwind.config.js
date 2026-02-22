/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    bg: '#E6E1DD',
                    text: '#1A1A1A',
                },
                dark: {
                    bg: '#1A1A1A',
                    text: '#E6E1DD',
                },
                warm: '#FCF8F5',
                accent: {
                    DEFAULT: '#C6BBB2',
                    violet: '#A199FF',
                },
                grid: {
                    line: 'rgba(0, 0, 0, 0.06)',
                }
            },
            fontFamily: {
                display: ['Anton', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            transitionTimingFunction: {
                'custom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            },
        },
    },
    plugins: [],
}
