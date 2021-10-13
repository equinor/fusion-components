import { createContext, PropsWithChildren, useEffect, useReducer } from 'react';
import { actions } from './actions';
import { reducer } from './reducer';
import { TimelineState, TimelineContext, TimelineProviderProps } from './types';

const initialContext = (partial: Partial<TimelineState>): TimelineState => ({
    position: null,
    splits: [],
    rotationGroups: {},
    selected: [],
    highlighted: [],
    disabled: [],
    mode: 'single',
    previewDates: false,
    selectedDate: new Date(),
    topSliderMarkers: [],
    bottomSliderMarkers: [],
    ...partial,
});

export const timelineContext = createContext<TimelineContext>({
    state: initialContext({}),
    dispatch: () => undefined,
});

export const TimelineProvider = (props: PropsWithChildren<TimelineProviderProps>) => {
    const {
        selectedPosition,
        mode,
        initialSplit,
        initialDate,
        previewDates,
        onDateChange,
        onSingleSelect,
        onMultiSelect,
        highlighted,
        disabled,
        PersonSlot,
        InfoSlot,
        ActionSlot,
        children,
    } = props;

    const [state, dispatch] = useReducer(
        reducer(initialContext({ mode, previewDates, selected: [initialSplit.id] })),
        initialContext({ mode, previewDates, selected: [initialSplit.id] })
    );

    useEffect(() => {
        dispatch(actions.setPosition({ position: selectedPosition, initialDate }));
        return () => dispatch(actions.reset());
    }, [selectedPosition, initialDate]);

    useEffect(() => {
        if (!onDateChange) return;
        onDateChange(state.selectedDate);
    }, [state.selectedDate]);

    useEffect(() => {
        if (!onSingleSelect) return;
        state.selected.map((id) => onSingleSelect(id));
    }, [state.selected]);

    useEffect(() => {
        if (!onMultiSelect) return;
        onMultiSelect(state.selected);
    }, [state.selected]);

    useEffect(() => {
        if (!highlighted) return;
        dispatch(actions.setHighlighted(highlighted));
    }, [highlighted]);

    useEffect(() => {
        if (!disabled) return;
        dispatch(actions.setDisabled(disabled));
    }, [disabled]);

    useEffect(() => {
        dispatch(actions.setCustomSlots({ PersonSlot, InfoSlot, ActionSlot }));
    }, [PersonSlot, ActionSlot, InfoSlot]);

    return (
        <timelineContext.Provider value={{ state, dispatch }}>{children}</timelineContext.Provider>
    );
};

export default TimelineProvider;
