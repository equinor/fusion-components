import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        slider: {},
        rotationGroupSlider: {
            width: 'calc(100% - 56px)',
            marginLeft: 'auto',
        },
    })
);
