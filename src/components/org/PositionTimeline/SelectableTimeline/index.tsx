import { FC } from 'react';
import { SelectMode, TimelineSplit, TimelinePosition } from '../model';
import RotationSequence from '../RotationSequence';
import TimelineProvider from '../TimelineProvider';
import { ActionSlot } from './ActionSlot';
import { InfoSlot } from './InfoSlot';
import { PersonSlot } from './PersonSlot';

type SelectableTimelineProps = {
    selectedPosition: TimelinePosition;
    selectMode: SelectMode;
    initialSplit?: TimelineSplit;
    initialDate?: Date;
    previewDates?: boolean;
    onDateChange?: (date: Date) => void;
    onSplitSelect?: (split: string) => void;
    highlighted?: string[];
    disabled?: string[];
};

export const SelectableTimeline: FC<SelectableTimelineProps> = ({
    selectedPosition,
    selectMode,
    initialSplit,
    initialDate,
    previewDates,
    onDateChange,
    onSplitSelect,
    highlighted,
    disabled
}) => {
    return (
        <TimelineProvider
            selectedPosition={selectedPosition}
            mode={selectMode}
            initialSplit={initialSplit}
            initialDate={initialDate}
            previewDates={previewDates}
            onDateChange={onDateChange}
            onSplitSelect={onSplitSelect}
            highlighted={highlighted}
            disabled={disabled}
        >
            <RotationSequence
                PersonSlot={PersonSlot}
                InfoSlot={InfoSlot}
                ActionSlot={selectMode === 'multi' ? ActionSlot : undefined}
            />
        </TimelineProvider>
    );
};

export default SelectableTimeline;
