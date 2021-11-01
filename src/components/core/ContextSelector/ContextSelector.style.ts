import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        searchInput: {
            minWidth: 'calc(var(--grid-unit) * 50px)',
            width: 'fit-content',
            border: 'none',
            borderBottom: '2px solid transparent',
            outline: 'none',
            color: 'var(--color-primary-accent)',
            background: 'none',
            boxSizing: 'border-box',
            padding: '0 calc(var(--grid-unit) * 1px)',
            lineHeight: 'calc(var(--grid-unit) * var(--height-multiplier))',
            height: 'calc(var(--grid-unit) * var(--height-multiplier))',
            marginLeft: 'calc(var(--grid-unit) * 1px)',
            fontSize: 'var(--font-size)',
            '&$overlay': {
                'user-select': 'none',
                cursor: 'pointer',
            },
        },
        component: {
            width: 'calc(var(--grid-unit) * 65px)',
            '&$comfortable': {
                '--height-multiplier': '6px',
                '--font-size': '16px',
            },
            '&$compact': {
                '--height-multiplier': '5px',
                '--font-size': '15px',
            },
            'input.searchInput:focus': {
                'boarder-bottom-color': 'var(--color-primary)',
            },
        },
        dropdownContainer: {
            maxHeight: 'calc(var(--grid-unit) * 60px)',
            overflowY: 'auto',
        },
        helperText: {
            display: 'flex',
            padding: '0 calc(var(--grid-unit) * 2px)',
            minHeight: 'calc(var(--grid-unit) * 8px)',
            alignItems: 'center',
        },
        overlay: {},
        compact: {},
        comfortable: {},
    })
    { name: 'fusion-components-contextSelector'}
);

export default useStyles;
