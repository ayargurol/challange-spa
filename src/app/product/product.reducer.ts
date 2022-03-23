import { Action, createReducer, on } from '@ngrx/store';
import ErrorModel from '../shared/models/error.model';
import * as ProductActions from './product.action';
import Product from './product.model';
import ProductState, { initializeState } from './Product.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ProductActions.GetProductAction, state => state),
  on(ProductActions.CreateProductAction, (state: ProductState, product: Product) => {
    return { ...state, products: [...state.products, product], error: null };
  }),

  on(ProductActions.SuccessGetProductAction, (state: ProductState, { payload }) => {
    return { ...state, products: payload, error: null };
  }),
  on(ProductActions.SuccessCreateProductAction, (state: ProductState, { payload }) => {
    return { ...state, products: [...state.products, payload], error: null };
  }),
  on(ProductActions.SuccessUpdateProductAction, (state: ProductState, { payload }) => {
    return { ...state, products: [...state.products, payload], error: null };
  }),
  on(ProductActions.SuccessDeleteProductAction, (state: ProductState, { payload }) => {
    return { ...state, products: [...state.products, payload], error: null };
  }),
  on(ProductActions.ErrorProductAction, (state: ProductState, error: ErrorModel) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, error: error, errorCount: state.errorCount + 1 };
  })
);

export function ProductReducer(
  state: ProductState | undefined,
  action: Action
): ProductState {
  return reducer(state, action);
}
