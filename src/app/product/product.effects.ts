import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductHttpService } from './product.httpservice';
import * as ProductAction from './product.action';
import ErrorModel from '../shared/models/error.model';

@Injectable()
export class ProductEffects {
  constructor(private service: ProductHttpService, private action$: Actions) { }

  getProducts$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.BeginGetProductAction),
      mergeMap(action =>
        this.service.get().pipe(
          map(data => data.data),
          map((data: any) => {
            return ProductAction.SuccessGetProductAction({ payload: data });
          }),
          catchError((error: ErrorModel) => {
            return of(ProductAction.ErrorProductAction(error));
          })
        )
      )
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.BeginCreateProductAction),
      mergeMap(action =>
        this.service.create(action.payload).pipe(
          map((data: any) => {
            return ProductAction.BeginGetProductAction();
          }),
          catchError((error: ErrorModel) => {
            return of(ProductAction.ErrorProductAction(error));
          })
        )
      )
    )
  );


  updateProduct$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.BeginUpdateProductAction),
      mergeMap(action =>
        this.service.update(action.payload).pipe(
          map((data: any) => {
            return ProductAction.BeginGetProductAction();
          }),
          catchError((error: ErrorModel) => {
            return of(ProductAction.ErrorProductAction(error));
          })
        )
      )
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ProductAction.BeginDeleteProductAction),
      mergeMap(action =>
        this.service.delete(action.payload.id).pipe(
          map((data: any) => {
            return ProductAction.BeginGetProductAction();
          }),
          catchError((error: ErrorModel) => {
            return of(ProductAction.ErrorProductAction(error));
          })
        )
      )
    )
  );
}
