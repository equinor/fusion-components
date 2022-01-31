import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        selectContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        selectContent: {
            backgroundColor: 'var(--color-black-alt5)',
            borderBottom: '1px solid var(--color-black-alt2)',
            display: 'flex',
            justifyContent: 'space-between',
            maxHeight: 'calc(var(--grid-unit) * 7px)',
            minHeight: 'calc(var(--grid-unit) * 5px)',
            alignItems: 'center',
            padding: '0 1rem 0 1rem',
            justifyItems: 'center',

            '& label': {
                color: 'var(--color-black-alt3)',
            },

            '&:hover': {
                cursor: 'pointer',
                '&$disabled': {
                    cursor: 'not-allowed',
                },
            },
        },
        focus: {
            borderBottom: '2px solid var(--color-primary)',
            boxShadow: '2px var(--color-primary)',
        },
        disabled: {
            color: 'var(--color-black-alt3)',
            borderColor: 'var(--color-black-alt3)',
        },
    }),
    { name: 'fusion-components-select' }
);

export default useStyles;
