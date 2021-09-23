import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext } from 'react';
import { ActionSlotProps } from '../model';
import { timelineContext } from '../TimelineProvider';
import { actions } from '../TimelineProvider/actions';
import { useStyles } from './styles';

type SplitProps = {
    id: string;
    rotationId?: string;
    startPosition: number;
    endPosition: number;
    personSlot: JSX.Element;
    infoSlot?: JSX.Element;
    ActionSlot?: FC<ActionSlotProps<boolean>>;
};

export const Split: FC<SplitProps> = ({
    id,
    rotationId,
    startPosition,
    endPosition,
    personSlot,
    infoSlot,
    ActionSlot,
}) => {
    const styles = useStyles({ isRotation: !!rotationId });
    const {
        state: { selected, highlighted, disabled, mode },
        dispatch,
    } = useContext(timelineContext);
    return (
        <div
            className={clsx(styles.container, {
                [styles.highlighted]: [...selected, ...highlighted].includes(id),
                [styles.disabled]: disabled.includes(id),
                [styles.clickable]: mode !== 'slider',
            })}
            style={{ left: `${startPosition}%`, right: `${endPosition}%` }}
            onClick={() => mode !== 'slider' && dispatch(actions.selectSplit(id))}
        >
            <div className={styles.content}>
                <div className={styles.slot}>{personSlot}</div>
                <div style={{ justifyContent: 'flex-start' }} className={styles.slot}>
                    {infoSlot}
                </div>
                <div className={styles.slot}>
                    {ActionSlot && <ActionSlot value={selected.includes(id)} />}
                </div>
            </div>
        </div>
    );
};

export default Split;
