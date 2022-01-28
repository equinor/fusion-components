import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        photoContainer: {
            display: 'flex',
            position: 'relative',
            width: 'var(--photo-size)',
            height: 'var(--photo-size)',
            borderRadius: '50%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
        xlarge: {
            '&$comfortable': {
                // 56x56
                '--photo-size': 'calc(var(--grid-unit) * 7px)',
            },
            '&$compact': {
                // 48x48
                '--photo-size': 'calc(var(--grid-unit) * 6px)',
            },
        },

        large: {
            '&$comfortable': {
                // 40x40
                '--photo-size': 'calc(var(--grid-unit) * 5px)',
            },
            '&$compact': {
                // 32x32
                '--photo-size': 'calc(var(--grid-unit) * 4px)',
            },
        },

        medium: {
            '&$comfortable': {
                // 32x32
                '--photo-size': 'calc(var(--grid-unit) * 4px)',
            },

            '&$compact': {
                // 24x24
                '--photo-size': 'calc(var(--grid-unit) * 3px)',
            },
        },

        small: {
            '&$comfortable': {
                // 24x24
                '--photo-size': 'calc(var(--grid-unit) * 3px)',
            },

            '&$compact': {
                // 16x16
                '--photo-size': 'calc(var(--grid-unit) * 2px)',
            },
        },

        popoverDetails: {
            width: 'inherit',
        },
        iconContainer: {
            borderRadius: '50%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 'var(--iconContainerSize)',
            height: 'var(--iconContainerSize)',

            '&$xlarge': {
                '&$comfortable': {
                    // 24x24
                    '--iconContainerSize': 'calc(var(--grid-unit) * 3px)',
                },
                '&$compact': {
                    // 24x24
                    '--iconContainerSize': 'calc(var(--grid-unit) * 3px)',
                },
            },

            '&$large': {
                '&$comfortable': {
                    // 16x16
                    '--iconContainerSize': 'calc(var(--grid-unit) * 2px)',
                },
                '&$compact': {
                    // 16x16
                    '--iconContainerSize': 'calc(var(--grid-unit) * 2px)',
                },
            },

            '&$medium': {
                '&$comfortable': {
                    // 16x16
                    '--iconContainerSize': 'calc(var(--grid-unit) * 2px)',
                },

                '&$compact': {
                    // 12x12
                    '--iconContainerSize': 'calc(var(--grid-unit) * 1.5px)',
                },
            },

            '&$small': {
                '&$comfortable': {
                    // 12x12
                    '--iconContainerSize': 'calc(var(--grid-unit) * 1.5px)',
                },

                '&$compact': {
                    // 8x8
                    '--iconContainerSize': 'calc(var(--grid-unit) * 1px)',
                },
            },
        },
        affiliate: {
            background: '#ff93ee',
        },

        consultant: {
            background: 'var(--color-secondary)',
        },

        employee: {
            background: 'var(--color-purple)',
        },

        externalHire: {
            background: 'var(--color-primary-accent)',
        },

        local: {
            background: 'var(--color-black-alt3)',
        },
        hidePopover: {},
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-components-PersonPresenceIcon' }
);

export default useStyles;
