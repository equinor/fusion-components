import { createAction } from 'typesafe-actions';
import { SetPosition } from './types';
export const actions = {
    reset: createAction('@TIMELINE/RESET')<void>(),
    setPosition: createAction('@TIMELINE/SET_POSITION')<SetPosition>(),
    selectSplit: createAction('@TIMELINE/SELECT_SPLIT')<string>(),
    setSelectedDate: createAction('@TIMELINE/SET_SELECTED_DATE')<Date>(),
    setHighlighted: createAction('@TIMELINE/SET_HIGHLIGHTED')<string[]>(),
    setDisabled: createAction('@TIMELINE/SET_DISABLED')<string[]>(),
};
