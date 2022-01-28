import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        tabs: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
                display: 'none',
            },

            '& $tabsPane': {
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid var(--color-black-alt4)',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                flexShrink: 0,

                '& $gradientLeft': {
                    height: 'calc(var(--grid-unit) * 8px)',
                    width: 'calc(var(--grid-unit) * 8px)',
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                },
                '& $gradientRight': {
                    height: 'calc(var(--grid-unit) * 8px)',
                    width: 'calc(var(--grid-unit) * 8px)',
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                    right: 0,
                },

                '&::-webkit-scrollbar': {
                    display: 'none',
                },

                '&$showGradientLeft': {
                    '& $gradientLeft': {
                        opacity: 1,
                        background:
                            'linear-gradient(90deg, #fff 23.44%, rgba(255, 255, 255, 0) 100%)',
                    },
                },

                '&$showGradientRight': {
                    '& $gradientRight': {
                        opacity: 1,
                        background:
                            'linear-gradient(270deg, #fff 23.44%, rgba(255, 255, 255, 0) 100%)',
                    },
                },

                '& $tab': {
                    cursor: 'pointer',
                    height: 'calc(var(--grid-unit) * 6px)',
                    textDecoration: 'none',
                    background: 'none',
                    color: 'inherit',
                    border: 'none',
                    font: 'inherit',
                    minWidth: 0,
                    overflow: 'hidden',
                    padding: 'calc(var(--grid-unit) * 0.5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,

                    '& $title': {
                        fontSize: '16px',
                        padding: 'calc(var(--grid-unit) * 1px)',
                        userSelect: 'none',
                        overflow: 'hidden',
                        height: 'calc(var(--grid-unit) * 3px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',

                        '&$pressed': {
                            backgroundColor: 'var(--color-primary-alt4)',
                            borderRadius: 'calc(var(--grid-unit) * 0.5px)',
                            outline: 'none',
                        },
                    },

                    '&:focus': {
                        outline: 'none',
                        '& $title': {
                            //outline: '1px dashed var(--color-black-alt3)',
                        },
                    },

                    '&:hover': {
                        backgroundColor: 'var(--color-primary-hover-alt1)',
                    },
                    '&$pressed': {
                        outline: 'none',
                        backgroundColor: 'initial',
                        '& $title': {
                            outline: 'none',
                        },
                    },

                    '&$disabled': {
                        cursor: 'not-allowed',
                        color: 'var(--color-black-alt4) !important',
                        '&:hover': {
                            backgroundColor: 'initial',
                        },
                    },

                    '&$current': {
                        color: 'var(--color-primary)',
                        borderBottom: '2px solid var(--color-primary)',
                        paddingBottom: 'calc(var(--grid-unit) * 0.5px - 2px)',

                        '&:hover': {
                            backgroundColor: 'initial',
                            color: 'var(--color-primary-hover)',
                        },
                        '&$pressed': {
                            borderRadius:
                                'calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 1px) 0px 0px',
                        },
                        '& $title': {
                            outline: 'none',
                        },
                    },
                },
            },

            '& $tabContent': {
                width: '100%',
                flexGrow: 1,
                //height: '1px', // flexbox bug
            },
        },
        tabsPane: {},
        gradientLeft: {},
        gradientRight: {},
        showGradientRight: {},
        showGradientLeft: {},
        tab: {},
        title: {},
        pressed: {},
        disabled: {},
        current: {},
        tabContent: {},
        compact: {},
        comfortable: {},
    }),
    { name: 'fusion-components-tabs' }
);

export default useStyles;
