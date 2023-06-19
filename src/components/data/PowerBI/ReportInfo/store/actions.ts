import { createAsyncAction, ActionType } from 'typesafe-actions';

import { HttpClientRequestFailedError } from '@equinor/fusion';
import { Report } from '@equinor/fusion/lib/http/apiClients/models/report';
import { ActionError } from '@equinor/fusion/lib/epic';

export type ApiError = ActionError<HttpClientRequestFailedError<any>>;
type AbortSignal = string | void;

export const fetchReport = createAsyncAction(
    '@PBI/FETCH_REPORT_REQUEST',
    '@PBI/FETCH_REPORT_SUCCESS',
    '@PBI/FETCH_REPORT_FAILURE',
    '@PBI/FETCH_REPORT_CANCEL'
)<string, Report, ApiError, AbortSignal>();

export const fetchReportDescription = createAsyncAction(
    '@PBI/FETCH_REPORT_DESCRIPTION_REQUEST',
    '@PBI/FETCH_REPORT_DESCRIPTION_SUCCESS',
    '@PBI/FETCH_REPORT_DESCRIPTION_FAILURE',
    '@PBI/FETCH_REPORT_DESCRIPTION_CANCEL'
)<string, string, ApiError, AbortSignal>();

export const fetchReportAccessDescription = createAsyncAction(
    '@PBI/FETCH_REPORT_ACCESS_DESCRIPTION_REQUEST',
    '@PBI/FETCH_REPORT_ACCESS_DESCRIPTION_SUCCESS',
    '@PBI/FETCH_REPORT_ACCESS_DESCRIPTION_FAILURE',
    '@PBI/FETCH_REPORT_ACCESS_DESCRIPTION_CANCEL'
)<string, string, ApiError, AbortSignal>();

export const fetchReportRequirements = createAsyncAction(
    '@PBI/FETCH_REPORT_REQUIRMENTS_REQUEST',
    '@PBI/FETCH_REPORT_REQUIRMENTS_SUCCESS',
    '@PBI/FETCH_REPORT_REQUIRMENTS_FAILURE',
    '@PBI/FETCH_REPORT_REQUIRMENTS_CANCEL'
)<string, string, ApiError, AbortSignal>();

export const initialize = createAsyncAction(
    '@PBI/INFO_INITIALIZE_REQUEST',
    '@PBI/INFO_INITIALIZE_SUCCESS',
    '@PBI/INFO_INITIALIZE_FAILURE',
    '@PBI/INFO_INITIALIZE_CANCEL'
)<string, void, void, AbortSignal>();

export const actions = {
    initialize,
    fetchReport,
    fetchReportDescription,
    fetchReportAccessDescription,
    fetchReportRequirements,
};

export type Actions = ActionType<typeof actions>;

export default actions;
