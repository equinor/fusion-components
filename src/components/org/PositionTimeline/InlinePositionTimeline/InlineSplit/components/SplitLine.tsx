import { FC, useMemo } from 'react';
import { useStyles } from './styles';
import { addLineMargin } from '../utils';
import { TimelineSize } from '../../../model';

type SplitLineProps = {
    isRotation: boolean;
    isSelected: boolean;
    isAssigned: boolean;
    startPosition: number;
    endPosition: number;
    verticalPosition: 'top' | 'bottom';
    size: TimelineSize;
};

export const SplitLine: FC<SplitLineProps> = ({
    isRotation,
    isSelected,
    isAssigned,
    startPosition,
    endPosition,
    verticalPosition,
    size,
}) => {
    const styles = useStyles({ isSelected, isAssigned, size });
    const vertical = useMemo(() => {
        if (verticalPosition === 'top') {
            return { top: isRotation ? (size === 'small' ? '-3.5px' : '-4.5px') : '-1px' };
        }
        return { bottom: size === 'small' ? '-2.5px' : '-3.5px' };
    }, [verticalPosition, isRotation]);
    return (
        <div
            className={styles.line}
            style={{
                ...vertical,
                left: addLineMargin(startPosition, isRotation, 'start'),
                right: addLineMargin(endPosition, isRotation, 'end'),
            }}
        ></div>
    );
};
