import { SliderMarker } from '@equinor/fusion-components';
import { Dispatch, FC } from 'react';
import { ActionType } from 'typesafe-actions';
import {
    RotationGroups,
    SelectMode,
    TimelineSplit,
    TimelinePosition,
    PersonSlotProps,
    InfoSlotProps,
    ActionSlotProps,
} from '../model';
import { actions } from './actions';

export type PositionMark = 'start' | 'end';

export type Actions = ActionType<typeof actions>;
export type TimelineState = {
    position: TimelinePosition | null;
    mode: SelectMode;
    splits: TimelineSplit[];
    rotationGroups: RotationGroups;
    selected: string[];
    highlighted: string[];
    disabled: string[];
    startDate?: number;
    endDate?: number;
    computePosition?: (time: number, mark: PositionMark) => number;
    previewDates?: boolean;
    selectedDate: Date;
    topSliderMarkers: SliderMarker[];
    bottomSliderMarkers: SliderMarker[];
    PersonSlot?: FC<PersonSlotProps>;
    InfoSlot?: FC<InfoSlotProps>;
    ActionSlot?: FC<ActionSlotProps<boolean>>;
};
export type TimelineContext = {
    state: TimelineState;
    dispatch: Dispatch<Actions>;
};

export type TimelineProviderProps = {
    selectedPosition: TimelinePosition;
    mode: SelectMode;
    initialSplit?: TimelineSplit;
    initialDate?: Date;
    previewDates?: boolean;
    onDateChange?: (date: Date) => void;
    onSingleSelect?: (split: string) => void;
    onMultiSelect?: (splits: string[]) => void;
    highlighted?: string[];
    disabled?: string[];
    PersonSlot?: FC<PersonSlotProps>;
    InfoSlot?: FC<InfoSlotProps>;
    ActionSlot?: FC<ActionSlotProps<boolean>>;
};

export type SetPosition = {
    position: TimelinePosition;
    initialDate?: Date;
};
