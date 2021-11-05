import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        skeleton: {
            display: 'inline-block',
            backgroundImage:
                'linear-gradient(90deg,var(--color-black-alt4),var(--color-black-alt5),var(--color-black-alt4))',
            backgroundSize: '200% calc(var(--grid-unit) * 2px)',
            animation: 'skeleton-slide 2s infinite forwards linear',
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
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 7px',
            },
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 6px)',
            },
        },
        large: {
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 5px',
            },
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 4px)',
            },
        },
        medium: {
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 4px',
            },
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 3px)',
            },
        },
        small: {
            '&$comfortable': {
                '--disc-size': 'calc(var(--grid-unit) * 3px',
            },
            '&$compact': {
                '--disc-size': 'calc(var(--grid-unit) * 2px)',
            },
        },
        compact: {},
        comfortable: {},
        '@keyframe skeleton-slide': {
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
    })
);
export default useStyles;
