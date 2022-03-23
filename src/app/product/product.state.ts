import ErrorModel from "../shared/models/error.model";
import Product from "./product.model";

export default class ProductState {
  products: Array<Product>;
  error: ErrorModel;
  errorCount: number;
}

export const initializeState = (): ProductState => {
  return { products: Array<Product>(), error: null, errorCount: 0 };
};
