import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        dropdownContainer: {
            position: 'absolute',
            top: '100%',
            minWidth: '100%',
            marginTop: 'calc(var(--grid-unit) * 0.5px)',
            pointerEvents: 'all',
            background: 'white',
            borderRadius: '4px',
            overflow: 'auto',
            minHeight: 'calc(var(--grid-unit) * 8px)',
        },
        justifyLeft: {
            right: 0,
        },
        justifyRight: {
            left: 0,
        },
    })
);
export default useStyles;
