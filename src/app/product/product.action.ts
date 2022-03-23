import { createAction, props } from '@ngrx/store';
import ErrorModel from '../shared/models/error.model';
import Product from './product.model';

export const GetProductAction = createAction('[Product] - Get Product');

export const CreateProductAction = createAction(
  '[Product] - Create Product',
  props<Product>()
);

export const BeginGetProductAction = createAction('[Product] - Begin Get Product');

export const SuccessGetProductAction = createAction(
  '[Product] - Success Get Product',
  props<{ payload: Product[] }>()
);

export const BeginCreateProductAction = createAction(
  '[Product] - Begin Create Product',
  props<{ payload: Product }>()
);

export const SuccessCreateProductAction = createAction(
  '[Product] - Success Create Product',
  props<{ payload: Product }>()
);


export const BeginUpdateProductAction = createAction(
  '[Product] - Begin Update Product',
  props<{ payload: Product }>()
);

export const SuccessUpdateProductAction = createAction(
  '[Product] - Success Update Product',
  props<{ payload: Product }>()
);


export const BeginDeleteProductAction = createAction(
  '[Product] - Begin Delete Product',
  props<{ payload: Product }>()
);

export const SuccessDeleteProductAction = createAction(
  '[Product] - Success Delete Product',
  props<{ payload: Product }>()
);

export const ErrorProductAction = createAction('[Product] - Error', props<ErrorModel>());
