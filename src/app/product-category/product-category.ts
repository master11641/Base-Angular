import { AppProduct } from "../simple-grid/app-product";
export class ProductCategory {
  constructor(public ID: number,public CategoryName: string,public Products: AppProduct) {}
}
