import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        popoverContainer: {
            '--arrow-width': '12px',
            '--arrow-height': '8px',

            padding: 'calc(var(--grid-unit) * 2px)',
            background: 'white',
            border: '1px solid var(--color-black-alt4)',
            borderRadius: '4px',
            position: 'absolute',
            pointerEvents: 'all',

            [['&$start$below', '&$start$above'].join(',')]: {
                left: 0,

                '& $arrow': {
                    left: 'calc(var(--grid-unit) * 1px)',
                },

                '&$isCentered': {
                    left: 'calc(50% - (var(--grid-unit) * 1px) - (var(--arrow-width) / 2))',
                },
            },

            [['&$center$below', '&$center$above'].join(',')]: {
                left: '50%',
                transform: 'translateX(-50%)',

                '& $arrow': {
                    left: '50%',
                    transform: 'translateX(-50%)',
                },

                '& $above $arrow': {
                    transform: 'translateX(-50%) rotate(180deg)',
                },
            },

            [['&$end$below', '&$end$above'].join(',')]: {
                right: 0,

                '& $arrow': {
                    right: 'calc(var(--grid-unit) * 1px)',
                },

                '&$isCentered ': {
                    right: 'calc(50% - (var(--grid-unit) * 1px) - (var(--arrow-width) / 2))',
                },
            },
        },
        fillWithContent: {
            padding: 0,
        },
        arrow: {
            position: 'absolute',
        },
        below: {
            top: '100%',
            marginTop: 'calc(var(--grid-unit) * 1px)',
            '& $arrow': {
                bottom: '100%',
            },
        },
        above: {
            bottom: '100%',
            marginBottom: 'calc(var(--grid-unit) * 1px)',

            '& $arrow': {
                top: '100%',
                transform: 'rotate(180deg)',
            },
        },
        left: {
            right: '100%',
            marginRight: 'calc(var(--grid-unit) * 1px)',

            '& $arrow': {
                transform: 'rotate(90deg)',

                left: '100%',
                marginLeft: '-2px',
            },
        },
        right: {
            left: '100%',
            marginLeft: 'calc(var(--grid-unit) * 1px)',

            '& $arrow': {
                transform: 'rotate(-90deg)',

                right: '100%',
                marginRight: '-2px',
            },
        },
        isCentered: {},
    })
);

export default useStyles;
