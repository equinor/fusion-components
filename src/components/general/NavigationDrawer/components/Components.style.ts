import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    createStyles({
        container: {
            width: '100%',
            height: 'calc(var(--grid-unit) * 6px)',
            backgroundColor: 'var(--color-white)',
            display: 'flex',
            cursor: 'pointer',
            color: 'var(--color-primary-accent)',
            justifyContent: 'flex-end',
            position: 'relative',
            fontSize: '12px',

            '&:hover': {
                backgroundColor: 'var(--color-primary-hover-alt1)',
                color: 'var(--color-primary-hover)',
            },

            '&:active': {
                backgroundColor: 'var(--color-white)',

                '& $visualOnClickContainer': {
                    opacity: 1,
                },
            },
        },
        navigationIcon: {
            height: 'calc(var(--grid-unit) * 6px)',
            minWidth: 'calc(var(--grid-unit) * 6px)',
            maxWidth: 'calc(var(--grid-unit) * 6px)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        isOpen: {
            paddingRight: 'calc(var(--grid-unit) * 1px)',
        },
        linkContainer: {
            display: 'flex',
            color: 'inherit',
            width: 'calc(var(--grid-unit) * 34px)',
            alignSelf: 'flex-end',
            height: '100%',
            alignItems: 'center',
            zIndex: 1,
            justifyContent: 'space-between',
            letterSpacing: 0.7,
            fontWeight: 600,
            textDecoration: 'none',

            'a&': {
                color: 'inherit',
            },
        },
        linkText: {
            width: 'calc(var(--grid-unit) * 27px)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        asideContainer: {
            padding: '0 calc(var(--grid-unit) * 1px)',
        },
        toggleOpenContainer: {
            minWidth: 'calc(var(--grid-unit) * 6px)',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        visualOnClickContainer: {
            position: 'absolute',
            zIndex: 0,
            top: '50%',
            right: 'calc(var(--grid-unit) * 0.5px)',
            transform: 'translateY(-50%)',
            width: 'calc(var(--grid-unit) * 39px)',
            height: 'calc(var(--grid-unit) * 5px)',
            backgroundColor: 'var(--color-primary-alt4)',
            borderRadius: '4px',
            opacity: 0,
            alignSelf: 'center',
        },
        groupingContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
        },
        isActive: {
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-primary-alt4)',
        },
        isDisabled: {
            backgroundColor: 'var(--color-white)',

            '& $linkContainer': {
                color: 'var(--color-black-alt3)',
                cursor: 'not-allowed',
            },

            '& $visualOnClickContainer': {
                opacity: 0,
            },
        },
        menuChild: {
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
        menuSection: {
            '& $linkContainer': {
                letterSpacing: '0.8px',
                fontWeight: 500,
                width: 'calc(100% - (var(--grid-unit) * 13px))',
                display: 'flex',

                '& $linkText': {
                    flex: 1,
                },
                '& $asideContainer': {
                    flex: 0,
                },
            },
        },
        sectionContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
        },
        isCollapsed: {
            '& $visualOnClickContainer': {
                width: 'calc(var(--grid-unit) * 5px)',
                height: 'calc(var(--grid-unit) * 5px)',
            },
        },
        label: {
            width: '100%',
            height: 'calc(var(--grid-unit) * 6px)',

            '&$isCollapsed': {
                '& $title': {
                    textAlign: 'center',
                },
            },
        },
        divider: {
            borderBottom: '1px solid var(--color-black-alt4)',
            paddingTop: 'calc(var(--grid-unit) * 2px)',
        },
        title: {
            position: 'relative',
            padding:
                '0 calc(var(--grid-unit) * 2px) calc(var(--grid-unit) * 1px) calc(var(--grid-unit) * 2px)',
            fontSize: '11px',
            lineHeight: 'calc(var(--grid-unit) * 3px)',
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
            paddingBottom: 'calc(var(--grid-unit) * 0.5px)',
        },
    }),
    { name: 'fusion-compoents-NavigationDrawer-component' }
);
export default useStyles;