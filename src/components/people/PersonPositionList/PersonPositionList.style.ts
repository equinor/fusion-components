import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            background: 'var(--color-black-alt5)',
            height: '100%',
            overflow: 'auto',
        },
        orgChartLink: {
            textDecoration: 'none',
        },
        noPositions: {
            textAlign: 'center',
            paddingTop: 'calc(var(--grid-unit) * 2px)',
        },
        personPositionsContainer: {
            padding: 'calc(var(--grid-unit) * 2px)',
        },

        positionCards: {
            paddingBottom: 'calc(var(--grid-unit) * 2px)',
        },
    }),
    { name: 'fusion-components-PersonPositionList' }
);

export default useStyles;
