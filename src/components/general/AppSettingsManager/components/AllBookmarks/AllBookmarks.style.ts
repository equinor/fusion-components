import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        bookmarkContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        editInput: {
            width: 'calc(100% - var(--grid-unit) * 12px)',
        },
        bookmarkLink: {
            cursor: 'pointer',
            color: 'var(--color-primary)',
            width: '100%',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',

            '&:hover': {
                textDecoration: 'underline',
            },
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
        contextBookmarks: {},
    })
);

export default useStyles;
