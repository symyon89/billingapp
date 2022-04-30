import { Customer } from "./customer";
import {InvoiceQuantity} from "./invoice-quantity";

export interface Invoice {
  id: string;
  customer: Customer;
  invoiceQuantities:InvoiceQuantity[];
  invoiceNumber:number;
  dateAdded:Date;
  lastDateModified:Date;
}
