import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        // sidebarDarkMode: {
        //     '--sidebar-collapseButtonBackgroundColor': '#132634',
        //     '--sidebar-collapseButtonTextColor': '#E5E5E5',
        // },
        container: {
            boxSizing: 'border-box',
            height: '100%',
            borderRight: '2px solid var(--color-black-alt4)',
            transition: 'max-width 0.1s',
            overflowY: 'auto',
            overflowX: 'hidden',
            color: 'var(--sidebar-collapseButtonTextColor, --color-primary-accent)',
            maxWidth: 'calc(var(--grid-unit) * 40px + 19px)',
            flexShrink: 0,
            backgroundColor: 'var(--sidebar-collapseButtonBackgroundColor, none)',
        },
        collapseButtonContainer: {
            width: 'calc(var(--grid-unit) * 6px)',
            height: 'calc(var(--grid-unit) * 6px)',
            borderBottom: '1px solid var(--color-black-alt4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        isCollapsed: {
            maxWidth: 'calc(var(--grid-unit) * 6px)',
        },
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-compoents-NavigationDrawer' }
);
export default useStyles;
