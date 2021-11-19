import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
export const useStyles = makeStyles(
    createStyles({
        container: {
            boxSizing: 'border-box',
            height: '100%',
            borderLeft: '2px solid var(--color-black-alt4)',
            transition: 'width 0.1s',
            overflow: 'auto',
            color: 'var(--color-primary-accent)',
            width: 'var(--filter-pane-width)',
            flexShrink: 0,

            '& section': {
                borderBottom: '1px solid var(--color-black-alt4)',

                '&:last-child': {
                    borderBottom: 'none',
                },

                '& header': {
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',

                    '& h3': {
                        flexGrow: 1,
                        margin: 0,
                        lineHeight: '16px',
                    },

                    '& button': {
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                    },
                },

                '& $filter': {
                    borderBottom: '1px solid var(--color-black-alt4)',

                    '&:last-child': {
                        borderBottom: 'none',
                    },

                    '& header': {
                        '& h4': {
                            flexGrow: 1,
                            margin: 0,
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '16px',

                            '& span': {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                        },
                    },

                    '& ul': {
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',

                        '& li': {
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderRadius: '4px',

                            '&:hover': {
                                background: 'var(-color-primary-alt4)',
                            },

                            '> label': {
                                cursor: 'pointer',
                            },
                        },
                    },
                },
            },

            '& $isCollapsed': {
                width: 'auto',
                '&$compact, &$comfortable': {
                    '& $content': {
                        '& $section': {
                            '& $filter': {
                                marginLeft: 0,
                            },
                        },
                    },
                },
            },
        },
        screenPlacementLeft: {
            borderLeft: 'none',
            borderRight: '2px solid var(--color-black-alt4)',

            '& $header': {
                flexDirection: 'row-reverse',
            },
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            flexShrink: 0,
            padding: 0,
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-black-alt4)',
            zIndex: 10,
            justifyContent: 'space-between',
        },

        compact: {
            width: 'calc(var(--grid-unit) * 37px)',

            '&$isCollapsed': {
                '& $content': {
                    padding: 0,
                },
            },
            '& $collapseExpandButtonContainer': {
                width: 'calc(var(--grid-unit) * 4px)',
                height: 'calc(var(--grid-unit) * 4px)',
            },
            '& $content': {
                padding: 'calc(var(--grid-unit) * 1px)',

                '& $resetButton': {
                    textAlign: 'right',
                },

                '& section': {
                    paddingBottom: 'calc(var(--grid-unit) * 1px)',
                    marginBottom: 'calc(var(--grid-unit) * 2px)',

                    '&:first-of-type': {
                        marginTop: 'calc(var(--grid-unit) * 1px)',
                    },

                    '&$isCollapsed': {
                        paddingBottom: 0,
                    },

                    '&$hasTitle': {
                        '& $filter': {
                            marginLeft: 'calc(var(--grid-unit) * 1px)',
                        },
                    },

                    '& header': {
                        '& h3': {
                            fontSize: '12px',
                        },
                    },

                    '& $filter': {
                        paddingBottom: 'calc(var(--grid-unit) * 1px)',
                        marginBottom: 'calc(var(--grid-unit) * 2px)',

                        '&:last-child': {
                            paddingBottom: 0,
                            marginBottom: 0,
                        },

                        '&$isCollapsed': {
                            paddingBottom: 0,
                        },

                        '& header': {
                            '& h4': {
                                fontSize: '11px',
                                fontWeight: '400',
                            },
                        },

                        '& ul': {
                            '& li': {
                                '> label': {
                                    marginLeft: 'calc(var(--grid-unit) * 1px)',
                                    fontSize: '11px',
                                },
                            },
                        },
                    },
                },
            },
        },
        collapseExpandButtonContainer: {
            width: 'calc(var(--grid-unit) * 6px)',
            height: 'calc(var(--grid-unit) * 6px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        resetButton: {
            textAlign: 'right',
        },

        comfortable: {
            width: 'calc(var(--grid-unit) * 39px)',

            '&$isCollapsed': {
                '& $content': {
                    padding: 0,
                },
            },

            '& $content': {
                padding: 'calc(var(--grid-unit) * 2px)',

                '& $resetButton': {
                    textAlign: 'right',
                },

                '& section': {
                    paddingBottom: 'calc(var(--grid-unit) * 2px)',
                    marginBottom: 'calc(var(--grid-unit) * 4px)',

                    '&:first-of-type': {
                        marginTop: 'calc(var(--grid-unit) * 1px)',
                    },

                    '&$isCollapsed': {
                        paddingBottom: 0,
                    },

                    '&$hasTitle': {
                        '& $filter': {
                            marginLeft: 'calc(var(--grid-unit) * 2px)',
                        },
                    },

                    '& header': {
                        '& h3': {
                            fontSize: '14px',
                        },
                    },

                    '& $filter': {
                        paddingBottom: 'calc(var(--grid-unit) * 2px)',
                        marginBottom: 'calc(var(--grid-unit) * 4px)',

                        '&:last-child': {
                            paddingBottom: 0,
                            marginBottom: 0,
                        },

                        '&$isCollapsed': {
                            paddingBottom: 0,
                        },

                        '& header': {
                            '& h4': {
                                fontSize: '12px',
                                fontWeight: '400',
                            },
                        },

                        '& ul': {
                            '& li': {
                                '> label': {
                                    marginLeft: 'calc(var(--grid-unit) * 1px)',
                                    fontSize: '12px',
                                },
                            },
                        },
                    },
                },
            },
        },
        hasTitle: {},
        isCollapsed: {},
        isExpanded: {},
        filter: {},
        content: {},
    }),
    { name: 'fusion-component-filterPane' }
);

export default useStyles;
