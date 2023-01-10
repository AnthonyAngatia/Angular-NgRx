import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: string;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null
};

// Feature selector
export const getUserFeatureState = createFeatureSelector<UserState>('users');

// State selector
export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUser, state => {
    console.log('original state ' + JSON.stringify(state));
    return {...state, maskUserName: !state.maskUserName};
  }));
