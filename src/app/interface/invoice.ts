import { Customer } from "./customer";
import {Product} from "./product";

export interface Invoice {
  id: string;
  customer: Customer;
  products:Product[];
  invoiceNumber:string;
  dateAdded:Date;
  lastDateModified:Date;
}
