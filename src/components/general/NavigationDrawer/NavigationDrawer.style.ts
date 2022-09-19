import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            boxSizing: 'border-box',
            height: '100%',
            borderRight: '2px solid var(--color-black-alt4)',
            transition: 'width 0.1s',
            overflowY: 'auto',
            overflowX: 'hidden',
            color: 'var(--color-primary-accent)',
            // width: 'calc(var(--grid-unit) * 40px + 2px)',
            flexShrink: 0,
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
            width: 'calc(var(--grid-unit) * 6px)',
        },
        comfortable: {},
        compact: {},
    }),
    { name: 'fusion-compoents-NavigationDrawer' }
);
export default useStyles;
