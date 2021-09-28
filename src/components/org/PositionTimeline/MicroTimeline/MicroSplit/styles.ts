import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

type StyleProps = {
    isSelected: boolean;
    isAssigned: boolean;
    isRotation: boolean;
};

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            width: '100%',
        },
        split: (props: StyleProps) => ({
            borderBottomColor: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.interactive.disabled__text.getVariable('color'),
            borderBottomWidth: '2px',
            borderBottomStyle: props.isAssigned ? 'solid' : 'dashed',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden',
        }),
        indicator: (props: StyleProps) => ({
            display: 'flex',
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '4px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.interactive.disabled__text.getVariable('color'),
            background: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.interactive.disabled__text.getVariable('color'),
            top: '-2px',
        }),
    })
);
