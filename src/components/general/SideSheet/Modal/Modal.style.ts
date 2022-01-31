import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        modalSideSheet: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: 0,
            width: 'var(--modal-size)',
            transform: 'translateX(640px)',
            background: 'var(--color-white)',
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'all',
            transition: 'transform 0.2s ease',
            maxWidth: 'calc(100vw - (var(--grid-unit) * 4px))',

            '@media (max-width: 767px)': {
                width: '100% !important',
                maxWidth: '100%',
                left: '0',
                transition: 'transform 0.1s ease-out',

                '& $resizeHandle': {
                    display: 'none',
                },
            },
        },

        fullscreen: {
            '--modal-size': 'calc(100vw - (var(--grid-unit) * 4px))',
        },

        xxlarge: {
            '--modal-size': 'calc(var(--grid-unit) * 180px)',
        },

        xlarge: {
            '--modal-size': 'calc(var(--grid-unit) * 120px)',
        },

        large: {
            '--modal-size': 'calc(var(--grid-unit) * 80px)',
        },

        medium: {
            '--modal-size': 'calc(var(--grid-unit) * 60px)',
        },

        small: {
            '--modal-size': 'calc(var(--grid-unit) * 40px)',
        },

        content: {
            height: '100%',
            width: '100%',
            maxHeight: '100%',
            overflow: 'auto',
            flexGrow: 1,
            position: 'relative',
        },
        header: {
            padding: 'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 3px)',
            background: 'var(--color-white)',
            display: 'flex',
        },
        closeButton: {
            margin: 0,
        },
        headerContent: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'wrap',
        },
        headerTitle: {
            fontSize: 'var(--header-font-size)',
            lineHeight: 'var(--header-line-height)',
            paddingLeft: 'calc(var(--grid-unit) * 1px)',
        },
        headerIcons: {
            marginLeft: 'auto',
            display: 'flex',
        },

        show: {
            transform: 'translateX(0)',
        },
        comfortable: {
            '--header-font-size': 'calc(var(--grid-unit) * 3px)',
            '--header-line-height': 'calc(var(--grid-unit) * 6px)',
        },
        compact: {
            '--header-font-size': 'calc(var(--grid-unit) * 2.5px)',
            '--header-line-height': 'calc(var(--grid-unit) * 4px)',
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
    }),
    { name: 'fusion-component-modal-sideSheet' }
);

export default useStyles;
