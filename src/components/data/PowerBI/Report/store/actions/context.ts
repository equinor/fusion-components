import { createAsyncAction, ActionType, createAction } from 'typesafe-actions';

import { ContextTypes, HttpClientRequestFailedError } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

export type ContextActions = ActionType<typeof actions>;

export type CheckContextAccessRequest = {
    reportId: string;
    externalId: string;
    type: ContextTypes;
    silent?: boolean;
};

export const checkContextAccess = createAsyncAction(
    '@PBI/CHECK_CONTEXT_ACCESS_REQUEST',
    '@PBI/CHECK_CONTEXT_ACCESS_SUCCESS',
    '@PBI/CHECK_CONTEXT_ACCESS_FAILURE',
    '@PBI/CHECK_CONTEXT_ACCESS_CANCEL'
)<CheckContextAccessRequest, void, ActionError<HttpClientRequestFailedError<any>>, string | void>();

export const setContextAccess = createAction('@PBI/SET_CONTEXT_ACCESS')<boolean>();

const actions = { checkContextAccess, setContextAccess };

export default actions;
