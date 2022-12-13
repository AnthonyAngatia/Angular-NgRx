import {createAction, createReducer, on} from '@ngrx/store';

export const userReducer = createReducer(
  {maskUser: false}, on(createAction('Mask user', state => {
    console.log('original state ' + JSON.stringify(state));
    return {...state, maskUser: !state.maskUser};
  })));
