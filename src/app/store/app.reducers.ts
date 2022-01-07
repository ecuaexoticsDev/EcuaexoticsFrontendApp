import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  calibrados: reducers.CalibradoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  calibrados: reducers.calibradoReducer,
};
