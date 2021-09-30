import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            margin: '0 1rem 0 .5rem',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        indicator: {
            position: 'absolute',
            borderRight: '2px solid var(--color-black-alt3)',
        },
        compressIndicator: {
            height: '100%',
        },
        extendIndicator: {
            top: '-25px',
            bottom: '-25px',
        },
    })
);
