import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TimelineSize } from '../../model';

export const useStyles = makeStyles((theme) =>
    createStyles({
        marker: (props: { isSelected: boolean; size: TimelineSize }) => ({
            display: 'flex',
            position: 'absolute',
            width: props.size === 'small' ? '2px' : '4px',
            height: props.size === 'small' ? '2px' : '4px',
            borderRadius: props.size === 'small' ? '4px' : '8px',
            borderWidth: props.size === 'small' ? '1px' : '2px',
            borderStyle: 'solid',
            borderColor: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.text.static_icons__tertiary.getVariable('color'),
            background: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.text.static_icons__tertiary.getVariable('color'),
        }),
        selectedDate: {
            background: `${theme.colors.interactive.link_on_interactive_colors.getVariable(
                'color'
            )} !important`,
            borderColor: `${theme.colors.interactive.primary__resting.getVariable(
                'color'
            )} !important`,
        },
    })
);
