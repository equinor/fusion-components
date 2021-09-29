import { FC } from 'react';
import { PositionMark, TimelineSplit } from '../../model';
import { useStyles } from './styles';
import { addRotationMargin } from './utils';

type MicroSplitProps = {
    split: TimelineSplit;
    computePosition?: (time: number, mark: PositionMark) => number;
};

export const MicroSplit: FC<MicroSplitProps> = ({ split, computePosition }) => {
    const isRotation = !!split.rotationId;
    const isAssigned = !!split.assignedPerson;
    const styles = useStyles({ isSelected: true, isAssigned, isRotation });
    if (!computePosition) return null;

    const startPosition = computePosition(split.appliesFrom.getTime(), 'start');
    const endPosition = computePosition(split.appliesTo.getTime(), 'end');

    return (
        <div className={styles.split}>
            <div
                className={styles.line}
                style={{
                    top: isRotation ? '-3.5px' : '-1px',
                    left: addRotationMargin(startPosition, isRotation),
                    right: addRotationMargin(endPosition, false),
                }}
            ></div>
            {isRotation && (
                <div
                    className={styles.line}
                    style={{
                        bottom: '-2.5px',
                        left: addRotationMargin(startPosition, isRotation),
                        right: addRotationMargin(endPosition, false),
                    }}
                ></div>
            )}
        </div>
    );
};

export default MicroSplit;
