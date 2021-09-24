import { createReducer } from 'typesafe-actions';
import { actions } from './actions';
import { Actions, TimelineState } from './types';
import {
    createPositionEstimator,
    generateSliderMarkers,
    getEndDate,
    getRotationGroups,
    getSelectedSplits,
    getStartDate,
    initialSelectedDate,
} from './utils';

export const reducer = (initial: TimelineState) =>
    createReducer<TimelineState, Actions>(initial)
        .handleAction(actions.reset, (state) => ({
            ...state,
            position: null,
            splits: [],
            rotationGroups: {},
            startDate: undefined,
            endDate: undefined,
            computePosition: undefined,
            selectedDate: new Date(),
            topSliderMarkers: [],
            bottomSliderMarkers: [],
        }))
        .handleAction(actions.setPosition, (state, action) => {
            const splits = action.payload.position.instances;
            const start = getStartDate(splits);
            const end = getEndDate(splits);
            const selectedDate = initialSelectedDate(
                action.payload.initialDate ?? state.selectedDate,
                start,
                end
            );
            const { topSliderMarkers, bottomSliderMarkers } = generateSliderMarkers(
                splits,
                start,
                end
            );
            return {
                ...state,
                position: action.payload.position,
                splits: splits,
                selected:
                    state.mode === 'slider'
                        ? getSelectedSplits(splits, selectedDate)
                        : state.selected,
                rotationGroups: getRotationGroups(splits),
                startDate: start,
                endDate: end,
                selectedDate,
                computePosition: createPositionEstimator(start, end),
                topSliderMarkers,
                bottomSliderMarkers,
            };
        })
        .handleAction(actions.selectSplit, (state, action) => {
            if (state.mode === 'multi') {
                return {
                    ...state,
                    selected: state.selected.includes(action.payload)
                        ? state.selected.filter((e) => e !== action.payload)
                        : [...state.selected, action.payload],
                };
            }
            return {
                ...state,
                selected: [action.payload],
            };
        })
        .handleAction(actions.setSelectedDate, (state, action) => ({
            ...state,
            selectedDate: action.payload,
            selected: getSelectedSplits(state.splits, action.payload),
        }))
        .handleAction(actions.setHighlighted, (state, action) => ({
            ...state,
            highlighted: action.payload,
        }))
        .handleAction(actions.setDisabled, (state, action) => ({
            ...state,
            disabled: action.payload,
        }));
