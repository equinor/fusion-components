import { createReducer, ActionType } from 'typesafe-actions';

import { State, Status, removeStatus } from './state';
import { Actions, actions } from './actions';

export const fetchReport = (initial: State) =>
    createReducer<State, ActionType<typeof actions.fetchReport>>(initial).handleAction(
        actions.fetchReport.success,
        (state, action) => ({
            ...state,
            report: action.payload,
            status: removeStatus(state, Status.LoadingReport),
        })
    );

export const fetchReportDescription = (initial: State) =>
    createReducer<State, ActionType<typeof actions.fetchReportDescription>>(initial).handleAction(
        actions.fetchReportDescription.success,
        (state, action) => ({
            ...state,
            description: action.payload,
            status: removeStatus(state, Status.LoadingDescription),
        })
    );

export const fetchReportAccessDescription = (initial: State) =>
    createReducer<State, ActionType<typeof actions.fetchReportAccessDescription>>(
        initial
    ).handleAction(actions.fetchReportAccessDescription.success, (state, action) => ({
        ...state,
        accessDescription: action.payload,
        status: removeStatus(state, Status.LoadingAccessDescription),
    }));

export const fetchReportRequirements = (initial: State) =>
    createReducer<State, ActionType<typeof actions.fetchReportRequirements>>(initial).handleAction(
        actions.fetchReportRequirements.success,
        (state, action) => ({
            ...state,
            requirements: action.payload,
            status: removeStatus(state, Status.LoadingRequirements),
        })
    );

export const initialize = (initial: State) =>
    createReducer<State, ActionType<typeof actions.initialize>>(initial)
        .handleAction(actions.initialize.request, (state, action) => ({
            id: action.payload,
            errors: [],
            status: [
                Status.LoadingReport,
                Status.LoadingDescription,
                Status.LoadingAccessDescription,
                Status.LoadingRequirements,
            ],
        }))
        .handleAction(actions.initialize.success, (state, action) => ({
            ...state,
            status: [],
            initialized: true,
        }));

export const reducer = (initial: State) =>
    createReducer<State, Actions>(initial, {
        ...fetchReport(initial).handlers,
        ...fetchReportDescription(initial).handlers,
        ...fetchReportAccessDescription(initial).handlers,
        ...fetchReportRequirements(initial).handlers,
        ...initialize(initial).handlers,
    });

export default reducer;
