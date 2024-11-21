import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        accordion: {
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            height: 'var(--header-height)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-black-alt4)',
            cursor: 'pointer',

            '&$isOpen': {
                border: 'none',
                color: 'var(--color-primary)',
            },
            '&:hover': {
                backgroundColor: 'var(--color-black-alt5)',
            },
            '&$rightAction': {
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
            },
            '&$disabled': {
                cursor: 'not-allowed',
            },
            '&$compact': {
                '--header-height': 'calc(var(--grid-unit) * 4px)',
                '--icon-width': 'calc(var(--grid-unit) * 4px)',
                '--header-font-size': '14px',
            },
            '&$comfortable': {
                '--header-height': 'calc(var(--grid-unit) * 6px)',
                '--icon-width': 'calc(var(--grid-unit) * 6px)',
                '--header-font-size': 'calc(var(--grid-unit) * 2px)',
            },
        },
        label: {
            fontSize: 'var(--header-font-size)',
            lineHeight: 'calc(var(--grid-unit) * 2.5px)',
            padding: '0 calc(var(--grid-unit) * 2px)',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            '&$disabled': {
                color: 'var(--color-black-alt2)',
            },
        },

        collapseIcon: {
            height: 'var(--header-height)',
            width: 'var(--icon-width)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--color-primary)',

            '&$disabled': {
                color: 'var(--color-black-alt4)',
            },
        },

        contentContainer: {
            border: 'none',
            overflow: 'hidden',
            display: 'none',

            '&$isOpen': {
                display: 'block',
            },
        },
        content: {
            height: '100%',
            borderBottom: '1px solid var(--color-black-alt4)',
            borderTop: 'none',
            padding: 'calc(var(--grid-unit) * 2px)',
        },
        isOpen: {},
        disabled: {},
        rightAction: {},
        compact: {},
        comfortable: {},
    }),
    { name: 'fusion-component-accordion' },
);
export default useStyles;
