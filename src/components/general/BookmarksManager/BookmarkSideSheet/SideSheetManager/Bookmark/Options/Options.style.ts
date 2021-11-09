import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        menuContainer: {
            pointerEvents: 'all',
            minHeight: 'calc(var(--grid-unit) * 2px)',
            paddingTop: 'calc(var(--grid-unit) * 1px)',
            display: 'flex',
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
