import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        '@keyframes skeletonSlide': {
            '0%': {
                backgroundPosition: '0% 0%',
            },

            '50%': {
                backgroundPosition: '-100% 0%',
            },

            '100%': {
                backgroundPosition: '-200% 0%',
            },
        },
        skeleton: {
            display: 'inline-block',
            backgroundImage:
                'linear-gradient(90deg, var(--color-black-alt4), var(--color-black-alt5), var(--color-black-alt4))',
            backgroundSize: '200% calc(var(--grid-unit) * 2px)',
            animation: '$skeletonSlide 2s infinite forwards linear',
            borderRadius: '4px',
        },
        bar: {
            height: 'calc(var(--grid-unit) * 2px)',
        },
        button: {
            height: 'calc(var(--grid-unit) * 4px)',
        },
        disc: {
            borderRadius: '50%',
            display: 'flex',
            position: 'relative',
            width: 'var(--disc-size)',
            height: 'var(--disc-size)',
        },
        xlarge: {
            // 56x56
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 7px)',
            },
            // 48x48
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 6px)',
            },
        },
        large: {
            // 40x40
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 5px=',
            },
            // 32x32
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 4px)',
            },
        },
        medium: {
            // 32x32
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 4px)',
            },
            // 24x24
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 3px)',
            },
        },
        small: {
            // 24x24
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 3px)',
            },
            // 16x16
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 2px)',
            },
        },
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-components-skeleton' }
);
export default useStyles;
