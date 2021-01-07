import {accessToken} from './access-token';
import {checkContextAccess} from './check-context-access';
import {fecthEmbedInfo} from './fetch-embed-info';

import { combineEpics } from '@equinor/fusion/lib/epic';

import { Actions } from '../actions';
import { State } from '../state';

export const epics = {
  accessToken,
  checkContextAccess,
  fecthEmbedInfo,
}

export const epic = combineEpics<Actions, Actions, State>(...Object.values(epics));

export default epic;