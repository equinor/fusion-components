import { createStyles, makeStyles, theme } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(() =>
    createStyles({
        container: (props: { isRotation: boolean; hasOverlap: boolean }) => ({
            top: 'calc(var(--grid-unit) * 1px)',
            position: 'absolute',
            height: 'calc(var(--grid-unit) * 5px)',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: '0 calc(var(--grid-unit) * 1px)',
            borderRadius: '4px',
            marginRight: '1px',
            overflow: 'hidden',
            borderWidth: props.isRotation ? '5px' : '2px',
            borderStyle: props.isRotation ? 'double' : 'solid',
            borderColor: props.hasOverlap
                ? theme.colors.interactive.danger__text.getVariable('color')
                : theme.colors.infographic.primary__moss_green_100.getVariable('color'),
        }),
        content: {
            boxSizing: 'border-box',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'min-content auto min-content',
            overflow: 'hidden',
            fontSize: '12px',
        },
        maxWidth: {
            maxWidth: '2rem',
        },
        slot: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        highlighted: (props: { isRotation: boolean; hasOverlap: boolean }) => ({
            background: props.hasOverlap
                ? theme.colors.interactive.danger__highlight.getVariable('color')
                : theme.colors.interactive.success__highlight.getVariable('color'),
        }),
        disabled: {
            background: `${theme.colors.interactive.disabled__fill.getVariable(
                'color'
            )} !important`,
            borderColor: `${theme.colors.interactive.disabled__border.getVariable(
                'color'
            )} !important`,
            cursor: 'default',
            opacity: 0.7,
            '&:hover': {
                cursor: 'default',
            },
        },
        clickable: (props: { isRotation: boolean; hasOverlap: boolean }) => ({
            '&:hover': {
                background: props.hasOverlap
                    ? theme.colors.interactive.danger__highlight.getVariable('color')
                    : theme.colors.interactive.success__highlight.getVariable('color'),
                borderColor: props.hasOverlap
                    ? theme.colors.interactive.danger__text.getVariable('color')
                    : theme.colors.interactive.primary__hover.getVariable('color'),
                cursor: 'pointer',
                opacity: 0.7,
            },
        }),
    })
);
