import { deleteBookmark, fetchBookmarks } from './bookmarks';

import { Actions } from '../actions';
import { State } from '../state';
import { combineEpics } from '@equinor/fusion/lib/epic';

const epics = combineEpics<Actions, Actions, State>(deleteBookmark, fetchBookmarks);
export default epics;
