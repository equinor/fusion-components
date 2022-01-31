import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        menuComponentContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },

        header: {
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-primary)',
            fontWeight: 500,
            height: 'calc(var(--grid-unit) * 7px)',
            borderTop: '1px solid var(--color-black-alt4)',
            borderBottom: '2px solid var(--color-black-alt4)',
        },

        itemHeader: {
            display: 'flex',
            alignItems: 'center',
        },
        title: {
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
        },

        backButton: {
            padding: '0 calc(var(--grid-unit) * 1px)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        },
    }),

    { name: 'fusion-component-AccountManagerSideSheet-MenuComponents' }
);

export default useStyles;
