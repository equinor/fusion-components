import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TimelineSize } from '../../model';

const getBorderColor = (theme, isSelected: boolean, isSelectedDate: boolean) => {
    if (isSelectedDate) {
        return theme.colors.interactive.primary__resting.getVariable('color');
    }
    if (isSelected) {
        return theme.colors.interactive.primary__resting.getVariable('color');
    }
    return theme.colors.text.static_icons__tertiary.getVariable('color');
};

const getBackgroundColor = (theme, isSelected: boolean, isSelectedDate: boolean) => {
    if (isSelectedDate) {
        return theme.colors.interactive.link_on_interactive_colors.getVariable('color');
    }
    if (isSelected) {
        return theme.colors.interactive.primary__resting.getVariable('color');
    }
    return theme.colors.text.static_icons__tertiary.getVariable('color');
};

export const useStyles = makeStyles((theme) =>
    createStyles({
        marker: (props: { isSelected: boolean; size: TimelineSize; isSelectedDate: boolean }) => ({
            display: 'flex',
            position: 'absolute',
            width: props.size === 'small' ? '2px' : '4px',
            height: props.size === 'small' ? '2px' : '4px',
            borderRadius: props.size === 'small' ? '4px' : '8px',
            borderWidth: props.size === 'small' ? '1px' : '2px',
            borderStyle: 'solid',
            borderColor: getBorderColor(theme, props.isSelected, props.isSelectedDate),
            background: getBackgroundColor(theme, props.isSelected, props.isSelectedDate),
        }),
    })
);
