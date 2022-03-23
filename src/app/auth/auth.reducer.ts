import { Action, createReducer, on } from '@ngrx/store';
import ErrorModel from '../shared/models/error.model';
import * as AuthActions from './auth.action';
import AuthState, { initializeState } from './auth.state';

const initialState = initializeState();

const reducer = createReducer(
    initialState,
    on(AuthActions.SuccessLoginAction, (state: AuthState, { payload }) => {
        return { ...state, user: payload, error: null };
    }),

    on(AuthActions.SuccessRegisterAction, (state: AuthState) => {
        console.error('register succeed');
        return { ...state, error: null };
    }),
    on(AuthActions.ErrorLoginAction, (state: AuthState, error: ErrorModel) => {
        console.error(error);
        return { ...state, error: error };
    }),
    on(AuthActions.ErrorRegisterAction, (state: AuthState, error: ErrorModel) => {
        console.error(error);
        return { ...state, error: error };
    })
);

export function AuthReducer(
    state: AuthState | undefined,
    action: Action
): AuthState {
    return reducer(state, action);
}
