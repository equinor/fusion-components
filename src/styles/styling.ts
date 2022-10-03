const computedStyle = (variableName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName);
};

export default {
    grid: (value: number) => `calc(var(--grid-unit) * ${value}px)`,

    numericalGrid: (value: number) => {
        return +getComputedStyle(document.documentElement).getPropertyValue('--grid-unit') * value;
    },

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
        primaryHover: 'var(--color-primary-hover)',
        primaryHoverAlt1: 'var(--color-primary-hover-alt1)',

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

        // Danger colors

        danger: 'var(--color-danger)',
        dangerHover: 'var(--color-danger-hover)',
        dangerHighlight: 'var(--color-danger-highlight)',
    },

    colors: {
        // Primary color and alternatives
        get primary() {
            return computedStyle('--color-primary');
        },
        get primaryAlt1() {
            return computedStyle('--color-primary-alt1');
        },
        get primaryAlt2() {
            return computedStyle('--color-primary-alt2');
        },
        get primaryAlt3() {
            return computedStyle('--color-primary-alt3');
        },
        get primaryAlt4() {
            return computedStyle('--color-primary-alt4');
        },
        get primaryAccent() {
            return computedStyle('--color-primary-accent');
        },
        get primaryHover() {
            return computedStyle('--color-primary-hover');
        },
        get primaryHoverAlt1() {
            return computedStyle('--color-primary-hover-alt1');
        },

        // Secondary color and alternatives
        get secondary() {
            return computedStyle('--color-secondary');
        }, // Energy Red
        get secondaryAlt1() {
            return computedStyle('--color-secondary-alt1');
        },
        get secondaryAlt2() {
            return computedStyle('--color-secondary-alt2');
        },
        get secondaryAlt3() {
            return computedStyle('--color-secondary-alt3');
        },
        get secondaryAlt4() {
            return computedStyle('--color-secondary-alt4');
        },
        get secondaryAccent() {
            return computedStyle('--color-secondary-accent');
        },

        // Black and white color and alternatives
        get black() {
            return computedStyle('--color-black');
        },
        get blackAlt1() {
            return computedStyle('--color-black-alt1');
        },
        get blackAlt2() {
            return computedStyle('--color-black-alt2');
        },
        get blackAlt3() {
            return computedStyle('--color-black-alt3');
        },
        get blackAlt4() {
            return computedStyle('--color-black-alt4');
        },
        get blackAlt5() {
            return computedStyle('--color-black-alt5');
        },
        get white() {
            return computedStyle('--color-white');
        }, // White

        // Supplementary colors
        get supplementary() {
            return computedStyle('--color-supplementary');
        }, // Mist blue
        get supplementaryAlt1() {
            return computedStyle('--color-supplementary-alt1');
        }, // Soft mint
        get supplementaryAlt2() {
            return computedStyle('--color-supplementary-alt2');
        }, // Spruce Wood

        // Non-brand colors
        get yellow() {
            return computedStyle('--color-yellow');
        },
        get orange() {
            return computedStyle('--color-orange');
        },
        get red() {
            return computedStyle('--color-red');
        },
        get green() {
            return computedStyle('--color-green');
        },
        get purple() {
            return computedStyle('--color-purple');
        },
        get blue() {
            return computedStyle('--color-blue');
        },
        get turquoise() {
            return computedStyle('--color-turquoise');
        },

        // Danger colors
        get danger() {
            return computedStyle('--color-danger');
        },
        get dangerHover() {
            return computedStyle('--color-danger-hover');
        },
        get dangerHighlight() {
            return computedStyle('--color-danger-highlight');
        },
    },
};
