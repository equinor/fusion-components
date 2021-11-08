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
                backgroundColor: '"var(--color-black-alt5"',
            },
            '&$rightAction': {
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
            },
            '&$disabled': {
                cursor: 'not-allowed',

                '.label': {
                    color: 'var(--color-black-alt2)',
                },

                '.collapseIcon': {
                    color: 'var(--color-black-alt4)',
                },
            },
            '&$compact': {
                '--header-height': '.grid-unit(4px) []',
                '--icon-width': '.grid-unit(4px) []',
                '--header-font-size': '14px',
            },
            '&$comfortable': {
                '--header-height': '.grid-unit(6px) []',
                '--icon-width': '.grid-unit(6px) []',
                '--header-font-size': '.grid-unit(2px) []',
            },
        },
        label: {
            fontSize: 'var(--header-font-size)',
            lineHeight: '".grid-unit(3px)" "[]"',
            padding: '"0" ".grid-unit(2px)" "[]"',
        },
        collapseIcon: {
            height: 'var(--header-height)',
            width: 'var(--icon-width)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--color-primary)',
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
            padding: '.grid-unit(2px) []',
        },
        isOpen: {},
        disabled: {},
        rightAction: {},
        compact: {},
        comfortable: {},

        '.grid-unit(@px)': {
            value: 'calc(var(--grid-unit) * @px)',
        },
    })
);
export default useStyles;
