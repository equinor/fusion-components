import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        detailsContainer: {
            display: 'flex',
            flexDirection: 'column',
        },

        personPhoto: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'calc(var(--grid-unit) * 2px) 0',
        },

        personDetails: {
            padding: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 3px)',
        },

        menuContainer: {
            borderTop: '1px solid var(--color-black-alt4)',
            margin: 'calc(var(--grid-unit) * 1px) 0',
        },

        itemComponent: {
            color: 'var(--color-black-alt2)',
            fontSize: '14px',
        },
    }),
    { name: 'fusion-component-AccountManagerSideSheet-AccountDetails' }
);

export default useStyles;
