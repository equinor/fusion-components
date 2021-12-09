import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        presenceContainer: {
            borderRadius: '50%',
            width: 'var(--presenceContainerSize)',
            height: 'var(--presenceContainerSize)',
            color: 'var(--color-white)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        available: {
            background: 'var(--color-green)',
        },
        availableidle: {
            background: 'var(--color-green)',
        },
        berightback: {
            background: 'var(--color-yellow)',
        },
        away: {
            background: 'var(--color-yellow)',
        },
        donotdisturb: {
            background: 'var(--color-danger)',
        },
        busy: {
            background: 'var(--color-danger)',
        },
        busyidle: {
            background: 'var(--color-danger)',
        },
        offline: {
            background: 'var(--color-black-alt3)',
        },
        xlarge: {
            '&$comfortable': {
                // 24x24
                '--presenceContainerSize': 'calc(var(--grid-unit) * 2px)',
            },
            '&$compact': {
                // 24x24
                '--presenceContainerSize': 'calc(var(--grid-unit) * 2px)',
            },
        },

        large: {
            '&$comfortable': {
                // 16x16
                '--presenceContainerSize': 'calc(var(--grid-unit) * 1.5px)',
            },
            '&$compact': {
                // 16x16
                '--presenceContainerSize': 'calc(var(--grid-unit) * 1.5px)',
            },
        },

        medium: {
            '&$comfortable': {
                // 16x16
                '--presenceContainerSize': 'calc(var(--grid-unit) * 1.5px)',
            },

            '&$compact': {
                // 12x12
                '--presenceContainerSize': 'calc(var(--grid-unit) * 1.25px)',
            },
        },

        small: {
            '&$comfortable': {
                // 12x12
                '--presenceContainerSize': 'calc(var(--grid-unit) * 1.25px)',
            },

            '&$compact': {
                // 8x8
                '--presenceContainerSize': 'calc(var(--grid-unit) * 1px)',
            },
        },
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-components-PersonPresenceIcon' }
);

export default useStyles;
