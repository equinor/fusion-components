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
    }),
    { name: 'fusion-component-BookmarkForm' }
);

export default useStyles;
