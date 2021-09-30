import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: (props: { isRotation: boolean }) => ({
            top: 'calc(var(--grid-unit) * 1px)',
            position: 'absolute',
            height: 'calc(var(--grid-unit) * 5px)',
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            boxSizing: 'border-box',
            padding: '0 calc(var(--grid-unit) * 1px)',
            borderRadius: '4px',
            marginRight: '1px',
            overflow: 'hidden',
            borderWidth: props.isRotation ? '5px' : '2px',
            borderStyle: props.isRotation ? 'double' : 'solid',
            borderColor: theme.colors.infographic.primary__moss_green_100.getVariable('color'),
        }),
        content: {
            boxSizing: 'border-box',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '2rem auto 2rem',
            overflow: 'hidden',
            fontSize: '12px',
        },
        slot: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        highlighted: (props: { isRotation: boolean }) => ({
            background: theme.colors.interactive.success__highlight.getVariable('color'),
        }),
        disabled: {
            background: `${theme.colors.interactive.disabled__fill.getVariable(
                'color'
            )} !important`,
            borderColor: `${theme.colors.interactive.disabled__border.getVariable(
                'color'
            )} !important`,
            cursor: 'auto',
            opacity: 0.7,
            pointerEvents: 'none',
        },
        clickable: {
            '&:hover': {
                background: theme.colors.interactive.primary__selected_hover.getVariable('color'),
                borderColor: theme.colors.interactive.primary__hover.getVariable('color'),
                cursor: 'pointer',
            },
        },
    })
);
