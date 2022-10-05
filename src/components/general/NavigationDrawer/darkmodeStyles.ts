import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
const useDarkmodeStyles = makeStyles(
    createStyles({
        sidebarDarkmode: {
            '--sidebar-backgroundColor': '#132634',
            '--sidebar-fontColor': '#DEE5E7',
            '--sidebar-pressedColor': '#364855',
            '--sidebar-pressedCollapseIconBackgroundColor': '#132634',
            '--sidebar-pressedCollapseIconTextColor': '#97CACE',
            '--sidebar-hoverTextColor': '#ffffff',
            '--sidebar-hoverBackgroundColor': '#364855',
            '--sidebar-isActiveTextColor': '#97CACE',
            '--sidebar-isActiveBackgroundColor': '#364855',
            '--sidebar-isDisabledTextColor': '#637583',
            '--sidebar-isDisabledBackgroundColor': '#132634',
            '--sidebar-activeBackgroundColor': '#132634',
            //'--sidebar-navigationIconColor': '#E5E5E5',
            '--sidebar-isActiveMenuChildBar': '#97CACE',
            '--sidebar-isActiveMenuChildBackgroundBar': '#9CA6AC',
            '--sidebar-collapseButtonColor': '#ADE2E6',
            '--sidebar-collapseButtonHoverTextColor': '#ADE2E6',
            '--sidebar-collapseButtonHoverBackgroundColor': '#364855',
            '--sidebar-collapseButtonBackgroundColor': '#132634',
            '--sidebar-collapseButtonTextColor': '#97CACE',
            '--sidebar-chipBackgroundColor': '#FFC1C1',
            '--sidebar-chipTextColor': '#000000',
            '--sidebar-chipHoverTextColor': 'E5E5E5',
            //'--sidebar-toggleArrowColor': 'red',
            '--sidebar-textIconColor': '#97CACE',
            '--sidebar-popoverBackgroundColor': '#132634',
        },
    }),
    { name: 'darkmode' }
);
export default useDarkmodeStyles;
