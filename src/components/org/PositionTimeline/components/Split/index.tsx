import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext } from 'react';
import { TimelineSplit } from '../../model';
import { timelineContext } from '../../TimelineProvider';
import { actions } from '../../TimelineProvider/actions';
import { useStyles } from './styles';

type SplitProps = {
    /**
     * The unique id of a position split.
     */
    id: string;
    /**
     * The unique id representing a rotation group. Splits in the same rotation group has
     * the same rotation id. This property is provided by backend.
     */
    rotationId?: string;
    /**
     * An object containing all relevant metadata about the split.
     */
    split: TimelineSplit;
    /**
     * All splits for current rotation group.
     */
    hasOverlap: boolean;
};

export const Split: FC<SplitProps> = ({ id, rotationId, split, hasOverlap }) => {
    const styles = useStyles({ isRotation: !!rotationId, hasOverlap });
    const {
        state: {
            position,
            selected,
            highlighted,
            disabled,
            mode,
            PersonSlot,
            InfoSlot,
            ActionSlot,
            computePosition,
        },
        dispatch,
    } = useContext(timelineContext);
    const isDisabled = disabled.includes(id);
    const isSelected = selected.includes(id);

    const handleClick = (e) => {
        if (isDisabled) {
            return;
        }
        e.stopPropagation();
        if (mode === 'slider') return;
        dispatch(actions.selectSplit(id));
    };
    if (!computePosition) return null;

    const thisLeft = computePosition(split.appliesFrom.getTime(), 'start');
    const thisRight = computePosition(split.appliesTo.getTime(), 'end');

    return (
        <div
            className={clsx(styles.container, {
                [styles.highlighted]: [...selected, ...highlighted].includes(id),
                [styles.disabled]: isDisabled,
                [styles.clickable]: mode !== 'slider' && !isDisabled,
            })}
            style={{
                left: `${thisLeft}%`,
                right: `${thisRight}%`,
            }}
            onClick={handleClick}
        >
            <div className={styles.content}>
                <div className={clsx(styles.slot, styles.maxWidth)}>
                    {PersonSlot && (
                        <PersonSlot
                            split={split}
                            position={position}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                        />
                    )}
                </div>
                <div style={{ justifyContent: 'flex-start' }} className={styles.slot}>
                    {InfoSlot && (
                        <InfoSlot
                            split={split}
                            position={position}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                        />
                    )}
                </div>
                <div className={clsx(styles.slot, styles.maxWidth)}>
                    {ActionSlot && (
                        <ActionSlot
                            split={split}
                            position={position}
                            isSelected={isSelected}
                            isDisabled={isDisabled}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Split;
