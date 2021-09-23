import { clsx, theme } from '@equinor/fusion-react-styles';
import { FC, useContext, useMemo } from 'react';
import { ActionSlotProps, InfoSlotProps, PersonSlotProps, TimelineSplit } from '../model';
import SplitSequence from '../SplitSequence';
import { timelineContext } from '../TimelineProvider';
import TimelineSlider from '../TimelineSlider';
import { useStyles } from './styles';
import { getSortedRotationKeys } from './utils';

type RotationSequenceProps = {
    PersonSlot: FC<PersonSlotProps<TimelineSplit>>;
    InfoSlot?: FC<InfoSlotProps<TimelineSplit>>;
    ActionSlot?: FC<ActionSlotProps<boolean>>;
};

export const RotationSequence: FC<RotationSequenceProps> = ({
    PersonSlot,
    InfoSlot,
    ActionSlot,
}) => {
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
                        <SplitSequence
                            key={key + index + 'split-sequence'}
                            rotationKey={key}
                            PersonSlot={PersonSlot}
                            InfoSlot={InfoSlot}
                            ActionSlot={ActionSlot}
                        />
                    ))}
                </div>
            </TimelineSlider>
        </div>
    );
};

export default RotationSequence;
