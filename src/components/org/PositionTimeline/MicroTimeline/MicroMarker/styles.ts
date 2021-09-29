import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        marker: (props: {isSelected: boolean}) => ({
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
        }),
    })
);