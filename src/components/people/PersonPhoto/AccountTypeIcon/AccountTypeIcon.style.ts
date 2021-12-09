import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        iconContainer: {},
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

        xlarge: {
            '&$comfortable, &$compact': {
                // 24x24
                '--iconContainerSize': 'calc(var(--grid-unit) * 3px)',
            },
        },

        large: {
            '&$comfortable, &$compact': {
                // 16x16
                '--iconContainerSize': 'calc(var(--grid-unit) * 2px)',
            },
        },

        medium: {
            '&$comfortable': {
                // 16x16
                '--iconContainerSize': 'calc(var(--grid-unit) * 2px)',
            },

            '&$compact': {
                // 12x12
                '--iconContainerSize': 'calc(var(--grid-unit) * 1.5px)',
            },
        },

        small: {
            '&$comfortable': {
                // 12x12
                '--iconContainerSize': 'calc(var(--grid-unit) * 1.5px)',
            },

            '&$compact': {
                // 8x8
                '--iconContainerSize': 'calc(var(--grid-unit) * 1px)',
            },
        },
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-components-AccountTypeIcon' }
);

export default useStyles;
