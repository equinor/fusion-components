import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        scrim: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'fixed',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
        },
        show: {
            opacity: 1,
            pointerEvents: 'all',
        },
    })
);
export default useStyles;
