export interface Address {
  id:string;
  primaryBilling: boolean;
  primaryDelivery: boolean;
  country:string;
  county:string;
  city:string;
  street:string;
  number:string;
  otherDetails:string;
  postalCode:string;
}
