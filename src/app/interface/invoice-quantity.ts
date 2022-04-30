import { Product } from "./product";

export interface InvoiceQuantity {
  id: string;
  product:Product;
  quantity:number;
}
