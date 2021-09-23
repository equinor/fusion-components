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
        onSplitSelect,
        highlighted,
        disabled,
        children,
    } = props;

    const [state, dispatch] = useReducer(
        reducer(initialContext({ mode, previewDates })),
        initialContext({ mode, previewDates })
    );

    useEffect(() => {
        dispatch(actions.setPosition({ position: selectedPosition, initialDate }));
        return () => dispatch(actions.reset());
    }, [selectedPosition, initialDate]);

    useEffect(() => {
        if (!initialSplit) return;
        dispatch(actions.selectSplit(initialSplit.id));
    }, [initialSplit]);

    useEffect(() => {
        if (!onDateChange) return;
        onDateChange(state.selectedDate);
    }, [state.selectedDate]);

    useEffect(() => {
        if (!onSplitSelect) return;
        state.selected.map((id) => onSplitSelect(id));
    }, [state.selected]);

    useEffect(() => {
        if (!highlighted) return;
        dispatch(actions.setHighlighted(highlighted));
    }, [highlighted]);

    useEffect(() => {
        if (!disabled) return;
        dispatch(actions.setDisabled(disabled));
    }, [disabled]);

    return (
        <timelineContext.Provider value={{ state, dispatch }}>{children}</timelineContext.Provider>
    );
};

export default TimelineProvider;
