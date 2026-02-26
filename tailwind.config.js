/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    bg: 'rgb(var(--color-primary-bg) / <alpha-value>)',
                    text: 'rgb(var(--color-primary-text) / <alpha-value>)',
                },
                dark: {
                    bg: 'rgb(var(--color-dark-bg) / <alpha-value>)',
                    text: 'rgb(var(--color-dark-text) / <alpha-value>)',
                },
                warm: 'rgb(var(--color-warm) / <alpha-value>)',
                accent: {
                    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
                    violet: 'rgb(var(--color-accent-violet) / <alpha-value>)',
                },
                grid: {
                    line: 'var(--color-grid-line)',
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
