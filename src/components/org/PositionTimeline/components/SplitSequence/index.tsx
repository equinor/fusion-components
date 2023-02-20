import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext } from 'react';
import Split from '../Split';
import { timelineContext } from '../../TimelineProvider';
import { useStyles } from './styles';
import { isWithinInterval } from 'date-fns';
import { TimelineSplit } from '../../model';

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

    const doesSplitOverlap = (split: TimelineSplit, splits: TimelineSplit[]): boolean => {
				try {
        const intervalA = { start: new Date(split.appliesFrom), end: new Date(split.appliesTo) };
        const hasOverlap = splits
            .filter((s) => s.id !== split.id)
            .some((s) => {
                const aOverlapsB =
                    isWithinInterval(s.appliesFrom, intervalA) ||
                    isWithinInterval(s.appliesTo, intervalA);
                const intervalB = { start: new Date(s.appliesFrom), end: new Date(s.appliesTo) };
                const bOverlapsA =
                    isWithinInterval(split.appliesFrom, intervalB) ||
                    isWithinInterval(split.appliesTo, intervalB);
                return aOverlapsB || bOverlapsA;
            });
        return hasOverlap;
		} catch {
				// invalid date interval (toDate before fromDate) == self overlap
				return true;
		}
    };

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
                        hasOverlap={doesSplitOverlap(split, rotationGroups[rotationKey])}
                    />
                ))}
            </div>
        </div>
    );
};

export default SplitSequence;
