import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
    (theme) =>
        createStyles({
            context: {
                width: 'var(--container-width)',
                padding: 'var(--container-padding)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '4px',
                position: 'relative',
                transition: 'box-shadow 0.15s',
            },
            isClickable: {
                cursor: 'pointer',
            },
            isSelected: {
                boxShadow:
                    '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
                backgroundColor: 'var(--color-primary-alt4)',
                borderColor: 'var(--color-primary-alt4)',
            },

            multipleAssignments: {
                '&::before': {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '-2px',
                    backgroundColor: 'var(--color-primary-alt4)',
                    zIndex: '-1',
                    borderRadius: '4px',
                    borderColor: 'white',
                },
            },
            photoContainer: {
                cursor: 'pointer',
            },
            isLinked: {
                border: theme.colors.interactive.disabled__text.getVariable('color'),
            },

            rotationInstances: {
                borderTop: '1px solid var(--color-black-alt4)',
                marginTop: 'calc(var(--grid-unit) * 1px)',
            },
            assignee: {
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                paddingTop: 'calc(var(--grid-unit) * 1px)',
            },
            assigneeInfo: {
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 'calc(var(--grid-unit) * 2px)',
            },
            name: {
                fontSize: 'var(--big-section-font-size)',
            },
            externalId: {
                fontSize: 'var(--small-section-font-size)',
            },

            container: {
                display: 'flex',
                flexDirection: 'row',
            },
            photoIconContainer: {
                userSelect: 'none',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
            },
            personIconContainer: {
                width: 'calc(var(--grid-unit) * 5px)',
                height: 'calc(var(--grid-unit) * 5px)',
                borderRadius: '50%',
                color: 'var(--color-black-alt2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            },
            instanceCount: {
                position: 'absolute',
                width: 'calc(var(--grid-unit) * 2.5px)',
                height: 'calc(var(--grid-unit) * 2.5px)',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'var(--color-white)',
                backgroundColor: 'var(--color-red)',
                top: 'calc(var(--grid-unit) * 0.25px)',
                right: '0',
                transform: 'translateX(50%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            stateIcons: {
                paddingTop: 'calc(var(--grid-unit) * 1px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            edsIcon: {
                height: '16px',
                width: '16px',
                color: 'var(--color-black-alt2)',
            },

            positionInstance: {
                position: 'relative',
                flexGrow: 1,
                marginLeft: 'var(--photo-and-details-spacing)',
                width: '1px',
                minHeight: 'calc(var(--grid-unit) * 7px)',

                '&$cropPositionName': {
                    '& $positionName': {
                        '& span': {
                            marginRight: 'calc(var(--grid-unit) * 6px)',
                        },
                    },
                },

                '& $externalId': {
                    paddingLeft: 'calc(var(--grid-unit) * 0.5px)',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 'var(--small-section-font-size)',
                    lineHeight: 'var(--small-section-line-height)',
                },
            },

            assignedPersonName: {
                fontSize: 'var(--big-section-font-size)',
                lineHeight: 'var(--big-section-line-height)',
                marginRight: 'calc(var(--grid-unit) * 6px)',
                display: 'flex',

                '& span': {
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                },
            },
            basePositionName: {
                fontSize: 'var(--small-section-font-size)',
                lineHeight: 'var(--small-section-line-height)',
                display: 'flex',
                marginRight: 'calc(var(--grid-unit) * 6px)',

                '& span': {
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                },
            },
            positionName: {
                fontSize: 'var(--big-section-font-size)',
                marginBottom: 'var(--position-name-spacing)',
                lineHeight: 'var(--big-section-line-height)',
                color: 'var(--color-primary)',
                display: 'flex',

                '& span': {
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    textDecoration: 'underline',
                },
            },
            location: {
                fontSize: 'var(--small-section-font-size)',
                lineHeight: 'var(--small-section-line-height)',
            },
            period: {
                fontSize: 'var(--small-section-font-size)',
                lineHeight: 'var(--small-section-line-height)',
            },
            childPositionCount: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--small-section-font-size)',
                letterSpacing: '1px',
                fontFeatureSettings: "'tnum' on, 'lnum' on'",
            },
            expandButton: {
                height: 'var(--child-position-height)',
                position: 'absolute',
                right: '0',
                bottom: '0',
            },
            positionTimeline: {
                display: 'flex',
                width: '75%',
                height: '0.5rem',
            },
            instancePopover: {
                pointerEvents: 'all',
                position: 'absolute',
                left: 'calc(100% + (var(--grid-unit) * 2px))',
                background: 'white',
                border: '1px solid var(--color-black-alt4)',
                borderRadius: '4px',
                overflow: 'visible',
            },
            instanceWrapper: {
                width: 'var(--container-width)',
                borderBottom: '1px solid var(--color-black-alt4)',
                padding: 'var(--container-padding)',
                boxSizing: 'border-box',
                transition: 'box-shadow 0.15s',

                '&:hover': {
                    boxShadow:
                        '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
                },

                '&:first-child': {
                    borderRadius: '4px 4px 0 0',
                },

                '&:last-child': {
                    border: 'none',
                    borderRadius: '0 0 4px 4px',
                },
            },
            comfortable: {
                '--container-width': 'calc(var(--grid-unit) * 40px)',
                '--container-height': 'calc(var(--grid-unit) * 14px)',
                '--container-padding': 'calc(var(--grid-unit) * 1px)',
                '--photo-and-details-spacing': 'calc(var(--grid-unit) * 2px)',
                '--position-name-spacing': 'calc(var(--grid-unit) * 1px)',

                '--child-position-padding': 'calc(var(--grid-unit) * 1px)',
                '--child-position-height': 'calc(var(--grid-unit) * 6px - 2px)',

                '--small-section-font-size': '11px',
                '--small-section-line-height': '16px',

                '--big-section-line-height': '16px',
                '--big-section-font-size': '16px',
            },

            compact: {
                '--container-width': 'calc(var(--grid-unit) * 35px)',
                '--container-height': 'calc(var(--grid-unit) * 12px)',
                '--container-padding': 'calc(var(--grid-unit) * 1px)',
                '--photo-and-details-spacing': 'calc(var(--grid-unit) * 1px)',
                '--position-name-spacing': 'calc(var(--grid-unit) * 0.5px);',

                '--child-position-padding': 'calc(var(--grid-unit) * 0.5px)',
                '--child-position-height': 'calc(var(--grid-unit) * 4px)',

                '--small-section-font-size': '10px',
                '--small-section-line-height': '12px',

                '--big-section-line-height': '16px',
                '--big-section-font-size': '14px',
            },
            cropPositionName: {},
        }),
    { name: 'fusion-components-PositionCard' }
);

export default useStyles;
