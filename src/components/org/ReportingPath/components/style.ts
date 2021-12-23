import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
export const useStyles = makeStyles(
    createStyles({
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
        linkedIndicator: {
            fill: 'none',
        },
    }),
    { name: 'fusion-components-ReportingPath' }
);
export default useStyles;
