import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

type StyleProps = {
    isSelected: boolean;
    isAssigned: boolean;
    isRotation: boolean;
};

export const useStyles = makeStyles((theme) =>
    createStyles({
        split: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            width: '100%',
        },
        line: (props: StyleProps) => ({
            borderBottomColor: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.interactive.disabled__text.getVariable('color'),
            borderBottomWidth: '2px',
            borderBottomStyle: props.isAssigned ? 'solid' : 'dashed',
            position: 'absolute',
            display: 'flex',
            overflow: 'hidden',
        }),
    })
);
