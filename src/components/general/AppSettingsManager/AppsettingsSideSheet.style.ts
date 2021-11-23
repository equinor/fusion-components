import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            padding: 'calc(var(--grid-unit) * 2px)',
        },
        newItem: {
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 'calc(var(--grid-unit) * 3px)',
            width: '100%',
        },
        itemLabel: {
            fontSize: '12px',
            color: 'var(--color-black-alt2)',
            paddingBottom: 'calc(var(--grid-unit) * 1px)',
        },
        itemContent: {
            fontSize: '16px',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
        },
        newItemAction: {
            display: 'flex',
            paddingTop: 'calc(var(--grid-unit) * 2px)',
            justifyContent: 'center',
        },
        save: {
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
        },
        cancel: {
            paddingRight: 'calc(var(--grid-unit) * 1px)',
        },
        bookmarkContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        menuContainer: {
            pointerEvents: 'all',
            minHeight: 'calc(var(--grid-unit) * 2px)',
            paddingTop: 'calc(var(--grid-unit) * 1px)',
            display: 'flex',
            flexDirection: 'column',
        },
        menuItem: {
            display: 'flex',
            height: 'calc(var(--grid-unit) * 6px)',
            width: 'calc(var(--grid-unit) * 23px)',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: 'var(--color-black-alt4)',
            },
        },
        icon: {
            color: 'var(--color-primary)',
            height: 'calc(var(--grid-unit) * 6px)',
            width: 'calc(var(--grid-unit) * 6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            display: 'flex',
            alignItems: 'center',
        },
    })
);

export default useStyles;
