import { Address } from "./address";
import {Contact} from "./contact";

export interface Customer {
  id:string;
  active:boolean;
  company:boolean;
  name:string;
  number:string;
  description:string;
  contactList:Contact[] | null;
  addressList:Address[] | null;
  dateAdded:Date;
  lastDateModified:Date;
}
