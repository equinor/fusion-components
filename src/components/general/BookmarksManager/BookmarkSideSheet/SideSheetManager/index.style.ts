import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 'calc(var(--grid-unit) * 1px)',
        },
    }),
    {
        name: 'fusion-components-bookmark-sidesheet',
    }
);

export default useStyles;
