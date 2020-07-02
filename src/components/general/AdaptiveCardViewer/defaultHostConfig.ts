import styling from 'styles/styling';

const getDefaultHostConfig = () => ({
    spacing: {
        small: styling.numericalGrid(0.5),
        default: styling.numericalGrid(1),
        medium: styling.numericalGrid(2),
        large: styling.numericalGrid(3),
        extraLarge: styling.numericalGrid(4),
        padding: styling.numericalGrid(2),
    },
    separator: {
        lineThickness: 1,
        lineColor: styling.colors.blackAlt2,
    },
    supportsInteractivity: true,
    fontTypes: {
        default: {
            fontSizes: {
                small: 12,
                default: 14,
                medium: 16,
                large: 16,
                extraLarge: 20,
            },
            fontWeights: {
                lighter: 200,
                default: 400,
                bolder: 600,
            },
        },
        monospace: {
            fontSizes: {
                small: 12,
                default: 14,
                medium: 16,
                large: 16,
                extraLarge: 20,
            },
            fontWeights: {
                lighter: 200,
                default: 400,
                bolder: 600,
            },
        },
    },
    containerStyles: {
        default: {
            backgroundColor: styling.colors.white,
            foregroundColors: {
                default: {
                    default: styling.colors.black,
                    subtle: styling.colors.blackAlt2,
                },
                accent: {
                    default: styling.colors.primary,
                    subtle: styling.colors.primary,
                },
                attention: {
                    default: styling.colors.secondaryAlt1,
                    subtle: styling.colors.secondaryAlt2,
                },
                good: {
                    default: styling.colors.green,
                    subtle: styling.colors.green,
                },
                warning: {
                    default: styling.colors.secondary,
                    subtle: styling.colors.secondaryAccent,
                },
            },
        },
        emphasis: {
            backgroundColor: styling.colors.primaryAlt3,
            foregroundColors: {
                default: {
                    default: styling.colors.black,
                    subtle: styling.colors.blackAlt2,
                },
                accent: {
                    default: styling.colors.primary,
                    subtle: styling.colors.primary,
                },
                attention: {
                    default: styling.colors.secondaryAlt1,
                    subtle: styling.colors.secondaryAlt2,
                },
                good: {
                    default: styling.colors.green,
                    subtle: styling.colors.green,
                },
                warning: {
                    default: styling.colors.secondary,
                    subtle: styling.colors.secondaryAccent,
                },
            },
        },
        accent: {
            backgroundColor: styling.colors.primaryAlt1,
            foregroundColors: {
                default: {
                    default: styling.colors.black,
                    subtle: styling.colors.blackAlt2,
                },
                accent: {
                    default: styling.colors.primary,
                    subtle: styling.colors.primary,
                },
                attention: {
                    default: styling.colors.secondaryAlt1,
                    subtle: styling.colors.secondaryAlt2,
                },
                good: {
                    default: styling.colors.green,
                    subtle: styling.colors.green,
                },
                warning: {
                    default: styling.colors.secondary,
                    subtle: styling.colors.secondaryAccent,
                },
            },
        },
        good: {
            backgroundColor: styling.colors.primaryHoverAlt1,
            foregroundColors: {
                default: {
                    default: styling.colors.black,
                    subtle: styling.colors.blackAlt2,
                },
                accent: {
                    default: styling.colors.primary,
                    subtle: styling.colors.primary,
                },
                attention: {
                    default: styling.colors.secondaryAlt1,
                    subtle: styling.colors.secondaryAlt2,
                },
                good: {
                    default: styling.colors.green,
                    subtle: styling.colors.green,
                },
                warning: {
                    default: styling.colors.secondary,
                    subtle: styling.colors.secondaryAccent,
                },
            },
        },
        attention: {
            backgroundColor: styling.colors.secondaryAlt1,
            foregroundColors: {
                default: {
                    default: styling.colors.black,
                    subtle: styling.colors.blackAlt2,
                },
                accent: {
                    default: styling.colors.primary,
                    subtle: styling.colors.primary,
                },
                attention: {
                    default: styling.colors.secondaryAlt1,
                    subtle: styling.colors.secondaryAlt2,
                },
                good: {
                    default: styling.colors.green,
                    subtle: styling.colors.green,
                },
                warning: {
                    default: styling.colors.secondary,
                    subtle: styling.colors.secondaryAccent,
                },
            },
        },
        warning: {
            backgroundColor: styling.colors.secondaryAlt2,
            foregroundColors: {
                default: {
                    default: styling.colors.black,
                    subtle: styling.colors.blackAlt2,
                },
                accent: {
                    default: styling.colors.primary,
                    subtle: styling.colors.primary,
                },
                attention: {
                    default: styling.colors.secondaryAlt1,
                    subtle: styling.colors.secondaryAlt2,
                },
                good: {
                    default: styling.colors.green,
                    subtle: styling.colors.green,
                },
                warning: {
                    default: styling.colors.secondary,
                    subtle: styling.colors.secondaryAccent,
                },
            },
        },
    },
    imageSizes: {
        small: 24,
        medium: 32,
        large: 40,
    },
    actions: {
        maxActions: 5,
        spacing: 'default',
        buttonSpacing: styling.numericalGrid(2),
        showCard: {
            actionMode: 'inline',
            inlineTopMargin: styling.numericalGrid(1),
        },
        actionsOrientation: 'horizontal',
    },
    adaptiveCard: {
        allowCustomStyle: false,
    },
    imageSet: {
        imageSize: 'medium',
        maxImageHeight: styling.numericalGrid(13),
    },
    factSet: {
        title: {
            color: 'default',
            size: 'default',
            isSubtle: false,
            weight: 'bolder',
            wrap: true,
            maxWidth: styling.numericalGrid(18),
        },
        value: {
            color: 'default',
            size: 'default',
            isSubtle: false,
            weight: 'default',
            wrap: true,
        },
        spacing: styling.numericalGrid(1),
    },
});
export default getDefaultHostConfig;
