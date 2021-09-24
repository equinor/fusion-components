import { clsx, theme } from '@equinor/fusion-react-styles';
import { FC, useContext, useMemo } from 'react';
import SplitSequence from '../SplitSequence';
import { timelineContext } from '../../TimelineProvider';
import { useStyles } from './styles';
import { getSortedRotationKeys } from './utils';
import TimelineSlider from '../../TimelineSlider';

export const RotationSequence: FC = () => {
    const styles = useStyles(theme);
    const {
        state: { rotationGroups, computePosition, selectedDate, mode, previewDates },
    } = useContext(timelineContext);

    const extendIndicator = mode === 'slider' || !!previewDates;

    const rotationKeys = getSortedRotationKeys(rotationGroups);

    const indicatorPosition = useMemo(() => {
        if (!computePosition) return 0;
        const position = computePosition(selectedDate.getTime(), 'start');
        return `calc(${position}% - 1px + ${
            rotationKeys.length > 1 ? (1 - position / 100) * 56 : 0
        }px)`;
    }, [computePosition, selectedDate, rotationKeys]);

    if (!computePosition) return null;
    return (
        <div className={styles.root}>
            <TimelineSlider>
                <div className={styles.container}>
                    <div
                        className={clsx(styles.indicator, {
                            [styles.extendIndicator]: extendIndicator,
                            [styles.compressIndicator]: !extendIndicator,
                        })}
                        style={{ left: indicatorPosition }}
                    />
                    {rotationKeys.map((key, index) => (
                        <SplitSequence key={key + index + 'split-sequence'} rotationKey={key} />
                    ))}
                </div>
            </TimelineSlider>
        </div>
    );
};

export default RotationSequence;
