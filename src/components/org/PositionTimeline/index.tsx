import { FC } from 'react';
import { SelectMode, TimelineSplit, TimelinePosition, TimelineSlotProps } from './model';
import RotationSequence from './components/RotationSequence';
import TimelineProvider from './TimelineProvider';
import { PersonSlot } from './components/PersonSlot';
import { InfoSlot } from './components/InfoSlot';
import { ActionSlot } from './components/ActionSlot';

type PositionTimelineProps = {
    /**
     * An object containing all relevant metadata about the position, including the set of position splits.
     */
    selectedPosition: TimelinePosition;
    /**
     * The mode determining how splits are selected in the position timeline, which could be ‘single’, ‘multi’
     * or ‘slider’. In ‘single’ mode, only one split may be selected at any time, whereas ‘multi’ mode allows
     * to select multiple splits at any time. The ‘slider’ mode will enable the timeline slider wrapping the
     * position splits, allowing change the value of time on the slider. All splits that overlaps with the
     * selected value of time will be marked as selected.
     */
    selectMode: SelectMode;
    /**
     * Determines the split to be selected initially. This option is only relevant for the ‘single’ and ‘multi’
     * select modes.
     */
    initialSplit?: TimelineSplit;
    /**
     * Determines the initial value of the timeline slider.
     */
    initialDate?: Date;
    /**
     * Determines whether to display the timeline slider or not. If select mode is ‘slider’, this property will
     * be redundant. For select modes ‘single’ and ‘multi’, enabling this prop will display the timeline slider
     * as disabled.
     */
    previewDates?: boolean;
    /**
     * A callback function which is triggered when the timeline slider date changes. This callback will expose
     * the value of the selected date.
     */
    onDateChange?: (date: Date) => void;
    /**
     * A callback function which is triggered when a split is selected. This callback will expose the selected
     * split id, and should be used when using ‘single’ select mode.
     */
    onSingleSelect?: (split: string) => void;
    /**
     * A callback function which is triggered when a split is selected. This callback will expose the set of
     * selected split ids, and should be used when using ‘multi’ select mode.
     */
    onMultiSelect?: (splits: string[]) => void;
    /**
     * A set of split ids that are highlighted in the timeline, in addition to the selected splits. A typical
     * use case is to provide a set of split ids to be highlighted according to some custom business rule based
     * on the selected split.
     */
    highlighted?: string[];
    /**
     * A set of split ids that disables the corresponding splits in the timeline. A disabled split is not
     * selectable.
     */
    disabled?: string[];
    /**
     * A functional react component to be rendered in the person slot. If no custom slot is provided, the
     * default slot component will be rendered.
     */
    CustomPersonSlot?: FC<TimelineSlotProps>;
    /**
     * A functional react component to be rendered in the info slot. If no custom slot is provided, the
     * default slot component will be rendered.
     */
    CustomInfoSlot?: FC<TimelineSlotProps>;
    /**
     * A functional react component to be rendered in the action slot. If no custom slot is provided, the
     * default slot component will be rendered.
     */
    CustomActionSlot?: FC<TimelineSlotProps>;
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
            ActionSlot={selectMode === 'multi' ? ActionSlot : CustomActionSlot}
        >
            <RotationSequence />
        </TimelineProvider>
    );
};

export default PositionTimeline;
