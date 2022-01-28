import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
export const useStyles = makeStyles(
    (theme) =>
        createStyles({
            link: {
                stroke: theme.colors.interactive.disabled__border.getVariable('color'),
                //'#dcdcdc', // EDS Design Token Interactive/Disabled/Border 🎨 Grey 20
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
            linkedIndicator: {
                fill: 'none',
            },
        }),
    { name: 'fusion-components-ReportingPath' }
);
export default useStyles;
