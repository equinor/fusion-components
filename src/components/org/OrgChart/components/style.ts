import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
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
            stroke: '#dcdcdc', // EDS Design Token Interactive/Disabled/Border 🎨 Grey 20
            strokeWidth: '2px',
            fill: 'none',
            shapeRendering: 'crispEdges',
        },

        isLinked: {
            strokeDasharray: 5,
            stroke: '#bebebe', // EDS Design Token Interactive/Disabled/Text 🎨 Grey 30
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
