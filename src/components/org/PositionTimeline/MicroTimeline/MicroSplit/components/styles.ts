import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TimelineSize } from '../../../model';

type StyleProps = {
    isSelected: boolean;
    isAssigned: boolean;
    size: TimelineSize;
};

export const useStyles = makeStyles((theme) =>
    createStyles({
        line: (props: StyleProps) => ({
            borderBottomColor: props.isSelected
                ? theme.colors.interactive.primary__resting.getVariable('color')
                : theme.colors.interactive.disabled__text.getVariable('color'),
            borderBottomWidth: props.size === 'small' ? '2px' : '3px',
            borderBottomStyle: props.isAssigned ? 'solid' : 'dashed',
            position: 'absolute',
            display: 'flex',
            overflow: 'hidden',
        }),
    })
);
