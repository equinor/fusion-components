import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext } from 'react';
import Split from '../Split';
import { timelineContext } from '../../TimelineProvider';
import { useStyles } from './styles';

type SplitSequenceProps = {
    /**
     * The unqiue id representing a rotation group. The rotation key is computed internally 
     * by the frontend, and could in theory be identical to the rotation id assigned by backend.
     */
    rotationKey: string;
};

export const SplitSequence: FC<SplitSequenceProps> = ({ rotationKey }) => {
    const {
        state: { rotationGroups },
    } = useContext(timelineContext);

    const hasRotationGroups = Object.keys(rotationGroups).length > 1;
    const styles = useStyles({ hasRotationGroups });

    return (
        <div
            className={clsx(styles.container, {
                [styles['&$multipleSequences']]: hasRotationGroups,
            })}
        >
            {hasRotationGroups && <div className={styles.label}>{rotationKey}</div>}
            <div className={styles.sequence}>
                {rotationGroups[rotationKey].map((split, index) => (
                    <Split
                        id={split.id}
                        rotationId={split?.rotationId ?? undefined}
                        key={split.id + index}
                        split={split}
                    />
                ))}
            </div>
        </div>
    );
};

export default SplitSequence;
