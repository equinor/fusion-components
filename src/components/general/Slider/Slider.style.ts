import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            position: 'relative',
            width: '100%',
            height: 'calc(var(--grid-unit) * 6px)',

            '--track-z-index': '1',
            '--slider-z-index': 'calc(var(--track-z-index) + 1)',
            '--marker-z-index': 'calc(var(--slider-z-index) + 1)',
            '--handle-z-index': 'calc(var(--marker-z-index) + 1)',

            '& button': {
                margin: 0,
                padding: 0,
                outline: 'none',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                '&:active': {
                    '& $dot': {
                        borderColor: 'var(--color-primary)',
                        boxShadow:
                            '0 0 0 calc(var(--grid-unit) * 1px) var(--color-primary-hover-alt1)',
                    },
                },
            },
        },
        isLowered: {},
        track: {
            position: 'absolute',
            //zIndex: 'var(--track-z-index)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            width: '100%',
            background: 'var(--color-black-alt3)',
            height: 'calc(var(--grid-unit) * 0.5px)',
            borderRadius: '4px',
        },
        slider: {
            position: 'absolute',
            //zIndex: 'var(--slider-z-index)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            height: 'calc(var(--grid-unit) * 0.5px)',
            borderRadius: '4px',
        },
        active: {
            backgroundColor: 'var(--color-primary)',
        },
        dot: {
            background: 'var(--color-white)',
            border: '1px solid var(--color-primary)',
            borderRadius: '50%',
            boxSizing: 'border-box',
        },
        noTransition: {
            transition: 'none',
        },
        handle: {
            position: 'absolute',
            //@ts-ignore
            zIndex: 'var(--handle-z-index)',
            top: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            width: 'calc(var(--grid-unit) * 5px)',
            height: 'calc(var(--grid-unit) * 5px)',
            transition: 'left 0.2s',

            '& $noTransition': {
                transition: 'none',
            },

            '& $dot': {
                width: 'calc(var(--grid-unit) * 1.5px)',
                height: 'calc(var(--grid-unit) * 1.5px)',
                borderWidth: '2px',
            },

            '&:hover': {
                '& $dot': {
                    borderColor: 'var(--color-primary-hover)',
                },
            },
        },
        marker: {
            position: 'absolute',
            //@ts-ignore
            zIndex: 'var(--marker-z-index)',
            top: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            width: 'calc(var(--grid-unit) * 5px)',
            height: 'calc(var(--grid-unit) * 5px)',

            '& $dot': {
                width: 'calc(var(--grid-unit) * 1px)',
                height: 'calc(var(--grid-unit) * 1px)',
                borderColor: 'var(--color-black-alt3)',
            },

            '& label': {
                position: 'absolute',
                bottom: 0,
                whiteSpace: 'nowrap',
                fontSize: '11px',
                cursor: 'pointer',
            },

            '& $isLowered': {
                height: 'calc(var(--grid-unit) * 8px)',
            },

            '& $isElevated': {
                '& label': {
                    top: 0,
                    bottom: 'auto',
                },
            },
        },
        isElevated: {},

        mouseIsDown: {
            '& $slider, & $handle': {
                transition: 'none',
            },
        },
        isDisabled: {
            '& $dot': {
                borderColor: 'var(--color-black-alt3)',
            },

            '&:active': {
                '& $dot': {
                    borderColor: 'var(--color-black-alt3)',
                    boxShadow: 'none',
                },
            },

            '& $marker': {
                boxShadow: 'none',
            },

            '& $handle': {
                '& $dot': {
                    borderColor: 'var(--color-black-alt3)',
                },

                '& $hover': {
                    '& $dot': {
                        borderColor: 'var(--color-black-alt3)',
                    },
                },
            },
            '& $slider': {
                color: 'var(--color-primary)',
            },

            '& button': {
                cursor: 'default',
                pointerEvents: 'none',
            },
        },
        compact: {},
        comfortable: {},
    })
);

export default useStyles;
