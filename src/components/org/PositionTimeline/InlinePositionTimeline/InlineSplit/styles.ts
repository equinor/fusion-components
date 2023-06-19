import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        split: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            width: '100%',
        },
        tooltipContainer: {
            display: 'flex',
            position: 'absolute',
            overflow: 'hidden',
            height: '.5rem',
            top: '-5px',
        },
    })
);
