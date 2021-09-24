import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext } from 'react';
import { TimelineSplit } from '../../model';
import { timelineContext } from '../../TimelineProvider';
import { actions } from '../../TimelineProvider/actions';
import { useStyles } from './styles';

type SplitProps = {
    id: string;
    rotationId?: string;
    startPosition: number;
    endPosition: number;
    split: TimelineSplit;
};

export const Split: FC<SplitProps> = ({ id, rotationId, startPosition, endPosition, split }) => {
    const styles = useStyles({ isRotation: !!rotationId });
    const {
        state: { selected, highlighted, disabled, mode, PersonSlot, InfoSlot, ActionSlot },
        dispatch,
    } = useContext(timelineContext);
    const isDisabled = disabled.includes(id);
    const isSelected = selected.includes(id);

    const handleClick = (e) => {
        e.stopPropagation();
        if (mode === 'slider') return;
        dispatch(actions.selectSplit(id));
    };

    return (
        <div
            className={clsx(styles.container, {
                [styles.highlighted]: [...selected, ...highlighted].includes(id),
                [styles.disabled]: isDisabled,
                [styles.clickable]: mode !== 'slider',
            })}
            style={{ left: `${startPosition}%`, right: `${endPosition}%` }}
            onClick={handleClick}
        >
            <div className={styles.content}>
                <div className={styles.slot}>
                    {PersonSlot && <PersonSlot split={split} isSelected={isSelected} />}
                </div>
                <div style={{ justifyContent: 'flex-start' }} className={styles.slot}>
                    {InfoSlot && <InfoSlot split={split} isSelected={isSelected} />}
                </div>
                <div className={styles.slot}>
                    {ActionSlot && !isDisabled && (
                        <ActionSlot split={split} isSelected={isSelected} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Split;
