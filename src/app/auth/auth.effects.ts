import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthHttpService } from './auth.httpservice';
import * as AuthAction from './auth.action'
import ErrorModel from '../shared/models/error.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(private service: AuthHttpService, private action$: Actions, private router: Router) { }

    register$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(AuthAction.BeginRegisterAction),
            mergeMap(action =>
                this.service.register(action.payload).pipe(
                    map((data: any) => {
                        this.router.navigateByUrl('/login')
                        return AuthAction.SuccessRegisterAction();
                    }),
                    catchError((error: ErrorModel) => {
                        return of(AuthAction.ErrorRegisterAction(error));
                    })
                )
            )
        )
    );

    login$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(AuthAction.BeginLoginAction),
            mergeMap(action =>
                this.service.login(action.payload).pipe(
                    map(data => data.data),
                    map((data: any) => {
                        return AuthAction.SuccessLoginAction({ payload: data });
                    }),
                    catchError((error: ErrorModel) => {
                        return of(AuthAction.ErrorLoginAction(error));
                    })
                )
            )
        )
    );
}
