import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        adaptiveCard: {
            '&:focus': {
                boxShadow: 'none',
                outline: 'none',
            },
        },
        button: {
            display: 'flex',
            boxSizing: 'border-box',
            border: '1px solid',
            borderRadius: '4px',
            position: 'relative',
            zIndex: 1,
            //minWidth: 0,
            verticalAlign: 'middle',
            overflow: 'hidden',
            alignItems: 'center',
            backgroundColor: 'var(--color-primary)',
            height: 'calc(var(--grid-unit) * 4.5px)',
            minWidth: 'calc(var(--grid-unit) * 9.5px)',
            maxWidth: 'calc(var(--grid-unit) * 20px)',
            color: 'var(--color-white)',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: 'var(--color-primary-hover)',
            },
            '&:active': {
                outline: 'none',
                backgroundColor: 'var(--color-primary)',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: 'var(--color-primary)',
            },
        },
    }),
    { name: 'fusion-components-AdaptiveCardViewer' }
);

export default useStyles;
