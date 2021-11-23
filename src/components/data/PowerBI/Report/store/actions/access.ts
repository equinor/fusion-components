import { createAsyncAction, ActionType, createAction } from 'typesafe-actions';

import { AccessToken } from '@equinor/fusion/lib/http/apiClients/models/report';
import { HttpClientRequestFailedError } from '@equinor/fusion/lib/http/HttpClient';
import { ActionError } from '@equinor/fusion/lib/epic';

export type AccessActions = ActionType<typeof actions>;
export type AccessRequest = {
    reportId: string;
    silent?: boolean;
};

export const fetchAccessToken = createAsyncAction(
    '@PBI/FETCH_REPORT_TOKEN_REQUEST',
    '@PBI/FETCH_REPORT_TOKEN_SUCCESS',
    '@PBI/FETCH_REPORT_TOKEN_FAILURE',
    '@PBI/FETCH_REPORT_TOKEN_CANCEL'
)<AccessRequest, AccessToken, ActionError<HttpClientRequestFailedError<any>>, string | void>();

export const refreshAccessToken = createAction('@PBI/FETCH_REPORT_TOKEN_REFRESH')<void>();

const actions = { fetchAccessToken, refreshAccessToken };

export default actions;
