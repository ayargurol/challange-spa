import { createAction, props } from '@ngrx/store';
import ErrorModel from '../shared/models/error.model';
import Login from './models/login.model';
import Register from './models/register.model';
import User from './models/user.model';

export const BeginLoginAction = createAction('[Auth] - Begin Login', props<{ payload: Login }>());

export const SuccessLoginAction = createAction('[Login] - Success Login', props<{ payload: User }>());

export const BeginRegisterAction = createAction('[Auth] - Begin Register', props<{ payload: Register }>());

export const SuccessRegisterAction = createAction('[Auth] - Success Register');

export const ErrorRegisterAction = createAction('[Auth] - Error Register', props<ErrorModel>());
export const ErrorLoginAction = createAction('[Auth] - Error Login', props<ErrorModel>());
