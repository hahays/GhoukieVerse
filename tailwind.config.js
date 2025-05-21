/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#C4E3B2',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    1000: '#6BA567',
                    1100: '#4D7A40',
                },
                'ghoukie-purple': '#7E22CE',
                'ghoukie-pink': '#EC4899',
                'ghoukie-black': '#1C1D1F',
                'ghoukie-green': '#A0CF7E',
                'ghoukie-dark-green': '#4D7A40',
                'ghoukie-white': '#ECFAEB',
                'ghoukie-gray': '#5C5C5C',
            },
        },
        fontFamily: {
            vina: ['var(--font-vina)'],
            victor: ['var(--font-victor)'],
            alef: ['var(--font-alef)'],
        },
        letterSpacing: {
            'wide-18': '0.18em',
            'absolute-18': '14px',
        },
        fontWeight: {
            blacker: '900',
            heavy: '950',
            customBold: '1000'
        },
        boxShadow: {
            'figma': '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        },
        textShadow: {
            'figma': '0 4px 4px rgba(0, 0, 0, 0.25)',
        }
    },
    plugins: [
        require('tailwindcss-textshadow')
    ],
};