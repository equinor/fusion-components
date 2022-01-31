import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            gridArea: 'content',
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
        },
    }),
    { name: 'fusion-components-content' }
);

export default useStyles;
