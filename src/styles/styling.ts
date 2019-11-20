export default {
    grid: (value: number) => `calc(var(--grid-unit) * ${value}px)`,

    mobileWidth: () =>
        getComputedStyle(document.documentElement).getPropertyValue('--mobile-max-width'),

    // Colors
    cssColors: {
        // Primary color and alternatives
        primary: 'var(--color-primary)', // Moss green
        primaryAlt1: 'var(--color-primary-alt1)',
        primaryAlt2: 'var(--color-primary-alt2)',
        primaryAlt3: 'var(--color-primary-alt3)',
        primaryAlt4: 'var(--color-primary-alt4)',
        primaryAccent: 'var(--color-primary-accent)',
        primaryHover: 'var(--color-primaryHover)',
        primaryHoverAlt1: 'var(--color-primaryHover-alt1)',

        // Secondary color and alternatives
        secondary: 'var(--color-secondary)', // Energy Red
        secondaryAlt1: 'var(--color-secondary-alt1)',
        secondaryAlt2: 'var(--color-secondary-alt2)',
        secondaryAlt3: 'var(--color-secondary-alt3)',
        secondaryAlt4: 'var(--color-secondary-alt4)',
        secondaryAccent: 'var(--color-secondary-accent)',

        // Black and white color and alternatives
        black: 'var(--color-black)',
        blackAlt1: 'var(--color-black-alt1)',
        blackAlt2: 'var(--color-black-alt2)',
        blackAlt3: 'var(--color-black-alt3)',
        blackAlt4: 'var(--color-black-alt4)',
        blackAlt5: 'var(--color-black-alt5)',
        white: 'var(--color-white)',

        // Supplementary colors
        supplementary: 'var(--color-supplementary)', // Mist blue
        supplementaryAlt1: 'var(--color-supplementary-alt1)', // Soft mint
        supplementaryAlt2: 'var(--color-supplementary-alt2)', // Spruce Wood

        // Non-brand colors
        yellow: 'var(--color-yellow)',
        orange: 'var(--color-orange)',
        red: 'var(--color-red)',
        green: 'var(--color-green)',
        purple: 'var(--color-purple)',
        blue: 'var(--color-blue)',
        turquoise: 'var(--color-turquoise)',
    },

    colors: {
        // Primary color and alternatives
        primary: '#007079', // Moss green
        primaryAlt1: '#73B1B5',
        primaryAlt2: '#A8CED1',
        primaryAlt3: '#C9E0E2',
        primaryAlt4: '#DEEDEE',
        primaryAccent: '#243746',
        primaryHover: '#004E55',
        primaryHoverAlt1: '#F2F8F8',

        // Secondary color and alternatives
        secondary: '#FF1243', // Energy Red
        secondaryAlt1: '#FF7D98',
        secondaryAlt2: '#FFAEBF',
        secondaryAlt3: '#FFCDD7',
        secondaryAlt4: '#FFE0E7',
        secondaryAccent: '#990025',

        // Black and white color and alternatives
        black: '#000000',
        blackAlt1: '#333333',
        blackAlt2: '#666666',
        blackAlt3: '#BFBFBF',
        blackAlt4: '#E6E6E6',
        blackAlt5: '#F7F7F7',
        white: '#FFFFFF', // White

        // Supplementary colors
        supplementary: '#D5EAF4', // Mist blue
        supplementaryAlt1: '#DEFAEB', // Soft mint
        supplementaryAlt2: '#FBE5D5', // Spruce Wood

        // Non-brand colors
        yellow: '#FBCA36',
        orange: '#FF9200',
        red: '#FF3B3B',
        green: '#4BB748',
        purple: '#771FDD',
        blue: '#1273DD',
        turquoise: '#1DB7A6',
    },
};
