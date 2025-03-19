import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        cardContainer: {
            marginLeft: 'calc(var(--grid-unit) * 1px)',
        },
        positionName: {
            fontSize: '14px',
            lineHeight: '24px',
        },
        personName: {
            fontSize: '14px',
            lineHeight: '24px',
        },
    }),
    { name: 'fusion-components-positionPicker' }
);
export default useStyles;
