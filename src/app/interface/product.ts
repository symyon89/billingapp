import { Manufacturer } from "./manufacturer";
import { Vat } from "./vat";

export interface Product {
  id: string;
  name: string;
  sku: string;
  ean: string;
  description: string;
  price: number;
  priceWithVat:number;
  quantity: number;
  manufacturer:Manufacturer;
  vat:Vat;
  dateAdded:Date;
  lastDateModified: Date;
}
