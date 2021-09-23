import { FC } from 'react';
import {
    SelectMode,
    TimelineSplit,
    TimelinePosition,
    PersonSlotProps,
    InfoSlotProps,
    ActionSlotProps,
} from './model';
import RotationSequence from './components/RotationSequence';
import TimelineProvider from './TimelineProvider';
import { PersonSlot } from './components/PersonSlot';
import { InfoSlot } from './components/InfoSlot';
import { ActionSlot } from './components/ActionSlot';

type PositionTimelineProps = {
    selectedPosition: TimelinePosition;
    selectMode: SelectMode;
    initialSplit?: TimelineSplit;
    initialDate?: Date;
    previewDates?: boolean;
    onDateChange?: (date: Date) => void;
    onSingleSelect?: (split: string) => void;
    onMultiSelect?: (splits: string[]) => void;
    highlighted?: string[];
    disabled?: string[];
    CustomPersonSlot?: FC<PersonSlotProps<TimelineSplit>>;
    CustomInfoSlot?: FC<InfoSlotProps<TimelineSplit>>;
    CustomActionSlot?: FC<ActionSlotProps<boolean>>;
};

export const PositionTimeline: FC<PositionTimelineProps> = ({
    selectedPosition,
    selectMode,
    initialSplit,
    initialDate,
    previewDates,
    onDateChange,
    onSingleSelect,
    onMultiSelect,
    highlighted,
    disabled,
    CustomPersonSlot,
    CustomInfoSlot,
    CustomActionSlot,
}) => {
    return (
        <TimelineProvider
            selectedPosition={selectedPosition}
            mode={selectMode}
            initialSplit={initialSplit}
            initialDate={initialDate}
            previewDates={previewDates}
            onDateChange={onDateChange}
            onSingleSelect={onSingleSelect}
            onMultiSelect={onMultiSelect}
            highlighted={highlighted}
            disabled={disabled}
            PersonSlot={CustomPersonSlot ?? PersonSlot}
            InfoSlot={CustomInfoSlot ?? InfoSlot}
            ActionSlot={CustomActionSlot ?? selectMode === 'multi' ? ActionSlot : undefined}
        >
            <RotationSequence />
        </TimelineProvider>
    );
};

export default PositionTimeline;
