export default class Product {
  id: string;
  code: string;
  name: string;
  price?: number;
  description?: string;
  createdDate: any;
  updatedDate?: any;
  history?: ProductHistory[];
}

export class ProductHistory {
  code: string;
  name: string;
  price: number;
  description: string;
  createdDate: any;
}