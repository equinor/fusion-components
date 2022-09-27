import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        // sidebarDarkmode: {
        //     '--sidebar-backgroundColor': '#132634', //background for whole sidebar
        //     '--sidebar-fontColor': '#E5E5E5', //background text color for unselected tab
        //     '--sidebar-pressedColor': '#637583',

        //     '--sidebar-hoverTextColor': '#E5E5E5',
        //     '--sidebar-hoverBackgroundColor': '#637583',

        //     '--sidebar-isActiveTextColor': '#97CACE',
        //     '--sidebar-isActiveBackgroundColor': '#132634',

        //     '--sidebar-activeBackgroundColor': '#637583',

        //     '--sidebar-isDisabledTextColor': '#637583',
        //     '--sidebar-isDisabledBackgroundColor': '#132634',

        //     '--sidebar-navigationIconColor': '#9CA6AC',

        //     '--sidebar-isActiveMenuChildBar': '#9CA6AC',
        // },

        container: {
            width: '100%',
            height: 'calc(var(--grid-unit) * 6px)',
            backgroundColor: 'var(--sidebar-backgroundColor, --color-white)', //background for everything
            display: 'flex',
            cursor: 'pointer',
            color: 'var(--sidebar-fontColor, --color-primary-accent)', //color of unselected text
            justifyContent: 'flex-end',
            position: 'relative',
            fontSize: '12px',

            '& $navigationIcon': {
                height: 'calc(var(--grid-unit) * 6px)',
                minWidth: 'calc(var(--grid-unit) * 6px)',
                maxWidth: 'calc(var(--grid-unit) * 6px)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                color: 'var(--sidebar-navigationIconColor, none)',

                '&$isOpen': {
                    paddingRight: 'calc(var(--grid-unit) * 1px)',
                },
            },

            '& $linkContainer': {
                display: 'flex',
                color: 'inherit',
                width: 'calc(var(--grid-unit) * 34px)',
                alignSelf: 'flex-end',
                height: '100%',
                alignItems: 'center',
                zIndex: 1,
                justifyContent: 'space-between',
                letterSpacing: '0.7',
                fontWeight: 600,
                textDecoration: 'none',

                '& $linkText': {
                    width: 'calc(var(--grid-unit) * 27px)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
                '& $asideContainer': {
                    padding: '0 calc(var(--grid-unit) * 1px)',
                },
            },
            '& $toggleOpenContainer': {
                minWidth: 'calc(var(--grid-unit) * 6px)',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
            },
            '& $visualOnClickContainer': {
                position: 'absolute',
                zIndex: 0,
                top: '50%',
                right: 'calc(var(--grid-unit) * 0.5px)',
                transform: 'translateY(-50%)',
                width: 'calc(var(--grid-unit) * 39px)',
                height: 'calc(var(--grid-unit) * 5px)',
                backgroundColor: 'var(--sidebar-pressedColor, --color-primary-alt4)',
                borderRadius: '4px',
                opacity: 0,
                alignSelf: 'center',
            },

            '& $groupingContainer': {
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
            },

            '&:hover': {
                backgroundColor: 'var(--sidebar-hoverBackgroundColor, --color-primary-hover-alt1)',
                color: 'var(--sidebar-hoverTextColor, --color-primary-hover)',
            },

            '&$isActive': {
                color: 'var(--sidebar-isActiveTextColor, --color-primary)', //active text color
                backgroundColor: 'var(--sidebar-isActiveBackgroundColor, --color-primary-alt4)', //active background color
            },

            '&:active': {
                backgroundColor: 'var(--sidebar-activeBackgroundColor, --color-white)',

                '& $visualOnClickContainer': {
                    opacity: 1,
                },
            },

            '&$isDisabled': {
                backgroundColor: 'var(--sidebar-isDisabledBackgroundColor, --color-white)',

                '& $linkContainer': {
                    color: 'var(--sidebar-isDisabledTextColor, --color-black-alt3)',
                    cursor: 'not-allowed',
                },

                '& $visualOnClickContainer': {
                    opacity: 0,
                },
            },

            '&$menuChild': {
                '& $linkContainer': {
                    boxShadow: '-1px 0px 0px 0px var(--color-black-alt4)',
                    width: 'calc(var(--grid-unit) * 31px)',
                    paddingLeft: 'calc(var(--grid-unit) * 2px)',
                    letterSpacing: '0.9px',
                    fontWeight: 400,
                },
                '& $visualOnClickContainer': {
                    width: 'calc(var(--grid-unit) * 31px)',
                },

                '&$isActive': {
                    '& $linkContainer': {
                        boxShadow:
                            '-13px 0px 0px -12px var(--color-primary), -1px 0px 0px 0px var(--color-black-alt4)',
                    },
                },
            },

            '&$menuSection': {
                '& $linkContainer': {
                    letterSpacing: '0.8px',
                    fontWeight: 500,
                    width: 'calc(100% - (var(--grid-unit) * 13px))',
                    display: 'flex',

                    '& $linkText': {
                        flex: '1',
                    },
                    '& $asideContainer': {
                        flex: '0',
                    },
                },

                '& $sectionContainer': {
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                },
            },

            '&$isCollapsed': {
                '& $visualOnClickContainer': {
                    width: 'calc(var(--grid-unit) * 5px)',
                    height: 'calc(var(--grid-unit) * 5px)',
                },
            },
        },

        '& $label': {
            width: '100%',
            height: 'calc(var(--grid-unit) * 6px)',
            '& $divider': {
                borderBottom: '1px solid var(--color-black-alt4)',
                paddingTop: 'calc(var(--grid-unit) * 2px)',
            },
            '& $title': {
                position: 'relative',
                padding:
                    '0 calc(var(--grid-unit) * 2px) calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',
                fontSize: '11px',
                lineHeight: 'calc(var(--grid-unit) * 3px)',
            },

            '&$isCollapsed': {
                '& $title': {
                    textAlign: 'center',
                },
            },
        },

        popover: {
            position: 'absolute',
            left: '100%',
            minWidth: '100%',
            marginLeft: 'calc(var(--grid-unit) * 1px)',
            pointerEvents: 'all',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid var(--color-black-alt4)',
            width: 'calc(var(--grid-unit) * 40px + 1px)',
            paddingBottom: 'calc(var(--grid-unit) * 5px)',
        },
        linkContainer: {},
        toggleOpenContainer: {},
        asideContainer: {},
        sectionContainer: {},
        linkText: {},
        visualOnClickContainer: {},
        menuChild: {},
        menuSection: {},
        isDisabled: {},
        isActive: {},
        isCollapsed: {},
        title: {},
        divider: {},
        groupingContainer: {},
        label: {},
        navigationIcon: {},
        isOpen: {},
    }),
    { name: 'fusion-compoents-NavigationDrawer-component' }
);
export default useStyles;
