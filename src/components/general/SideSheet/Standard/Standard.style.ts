import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            position: 'relative',
            zIndex: 1,
            boxSizing: 'border-box',
            height: '100%',
            borderLeft: '2px solid var(--color-black-alt4)',
            transition: 'width 0.1s',
            overflow: 'visible',
            color: 'var(--color-primary-accent)',
            width: 'var(--sidesheet-size)',
            flexShrink: 0,
            background: 'var(--color-white)',
            display: 'flex',
            flexDirection: 'column',

            '@media (max-width: 767px)': {
                width: '100%',
                height: '100%',
                transition: 'transform 0.1s ease-out',

                '&:not($isCollapsed)': {
                    width: '100% !important',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    position: 'fixed',
                    pointerEvents: 'all',
                },

                '& $resizeHandle': {
                    display: 'none',
                },
            },
        },
        screenPlacementLeft: {
            borderLeft: 'none',
            borderRight: '2px solid var(--color-black-alt4)',

            '& $header': {
                flexDirection: 'row-reverse',
            },

            '& $resizeHandle': {
                right: 'calc(var(--grid-unit) * -2px)',
                left: 'auto',
            },
        },
        xlarge: {
            '--sidesheet-size': 'calc(var(--grid-unit) * 80px)',
        },

        large: {
            '--sidesheet-size': 'calc(var(--grid-unit) * 60px)',
        },

        medium: {
            '--sidesheet-size': 'calc(var(--grid-unit) * 40px)',
        },

        small: {
            '--sidesheet-size': 'calc(var(--grid-unit) * 30px)',
        },

        content: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            flexShrink: 0,
        },
        collapseButtonContainer: {
            width: 'calc(var(--grid-unit) * 6px)',
            height: 'calc(var(--grid-unit) * 6px)',
            //border-bottom: 1px solid var(--color-black-alt4);
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 'calc(var(--grid-unit) * 3px)',
            paddingLeft: 'calc(var(--grid-unit) * 2px)',
            flexGrow: 1,
        },
        headerContent: {
            marginRight: 'calc(var(--grid-unit) * 3px)',
        },
        isCollapsed: {
            width: 'calc(var(--grid-unit) * 6px)',

            '& $resizeHandle': {
                display: 'none',
            },
        },
        resizeHandle: {
            width: 'calc(var(--grid-unit) * 4px)',
            position: 'absolute',
            zIndex: 2,
            top: 0,
            bottom: 0,
            left: 'calc(var(--grid-unit) * -2px)',
            cursor: 'col-resize',

            '&:hover': {
                '& $bar': {
                    background: 'rgba(0, 0, 0, 0.1)',
                },

                '& $indicator': {
                    opacity: 1,
                },
            },
        },
        bar: {
            width: 'calc(var(--grid-unit) * 1px)',
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        },
        indicator: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'calc(var(--grid-unit) * 3px)',
            height: 'calc(var(--grid-unit) * 3px)',
            background: 'var(--color-white)',
            borderRadius: '4px',
            transform: 'translateY(-50%) translateX(-50%)',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 0.2s',
            zIndex: 2,
        },
        isResizing: {
            userSelect: 'none',
            transition: 'none',

            '& $resizeHandle': {
                '& $bar': {
                    background: 'rgba(0, 0, 0, 0.1)',
                },

                '& $indicator': {
                    opacity: 1,
                },
            },
        },
        compact: {},
        comfortable: {},
    }),
    { name: 'fusion-component-standard-sideSheet' }
);

export default useStyles;
