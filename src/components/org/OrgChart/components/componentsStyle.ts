import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        labelObject: {
            height: '100%',
            display: 'flex',
            flexDirection: 'row-reverse',
            letterSpacing: '1.5px',
            fontSize: '12px',
        },

        oneCardRow: {
            flexDirection: 'row',
        },

        link: {
            stroke: theme.colors.interactive.disabled__border.getVariable('color'),
            strokeWidth: '2px',
            fill: 'none',
            shapeRendering: 'crispEdges',
        },

        isLinked: {
            strokeDasharray: 5,
            stroke: theme.colors.interactive.disabled__text.getVariable('color'),
        },

        card: {
            fill: 'none',
        },
        labelRect: {
            fill: 'none',
        },
        breadCrumbRect: {
            fill: 'none',
        },
        linkedIndicator: {
            fill: 'none',
        },
    })
);

export default useStyles;
