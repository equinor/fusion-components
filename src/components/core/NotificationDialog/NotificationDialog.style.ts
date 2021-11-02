import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.32)',
            backdropFilter: 'blur(2px)',
            pointerEvents: 'all',
            display: 'flex',

            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
        },
    })
);
export default useStyles;
