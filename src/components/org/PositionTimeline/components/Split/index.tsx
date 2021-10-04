import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext } from 'react';
import { TimelineSplit } from '../../model';
import { timelineContext } from '../../TimelineProvider';
import { actions } from '../../TimelineProvider/actions';
import { useStyles } from './styles';

type SplitProps = {
    id: string;
    rotationId?: string;
    split: TimelineSplit;
};

export const Split: FC<SplitProps> = ({ id, rotationId, split }) => {
    const styles = useStyles({ isRotation: !!rotationId });
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

    return (
        <div
            className={clsx(styles.container, {
                [styles.highlighted]: [...selected, ...highlighted].includes(id),
                [styles.disabled]: isDisabled,
                [styles.clickable]: mode !== 'slider',
            })}
            style={{
                left: `${computePosition(split.appliesFrom.getTime(), 'start')}%`,
                right: `${computePosition(split.appliesTo.getTime(), 'end')}%`,
            }}
            onClick={handleClick}
        >
            <div className={styles.content}>
                <div className={styles.slot}>
                    {PersonSlot && (
                        <PersonSlot split={split} position={position} isSelected={isSelected} />
                    )}
                </div>
                <div style={{ justifyContent: 'flex-start' }} className={styles.slot}>
                    {InfoSlot && (
                        <InfoSlot split={split} position={position} isSelected={isSelected} />
                    )}
                </div>
                <div className={styles.slot}>
                    {ActionSlot && !isDisabled && (
                        <ActionSlot split={split} position={position} isSelected={isSelected} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Split;
