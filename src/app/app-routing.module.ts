import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./component/customer/customer.component";
import {CustomerDetailsComponent} from "./component/customer-details/customer-details.component";
import { ManufacturerComponent } from './component/manufacturer/manufacturer.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import {ProductComponent} from "./component/product/product.component";
import { ManufacturerDetailsComponent } from './component/manufacturer-details/manufacturer-details.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import {InvoiceDetailsComponent} from "./component/invoice-details/invoice-details.component";
import {VatComponent} from "./component/vat/vat.component";
import {VatDetailsComponent} from "./component/vat-details/vat-details.component";


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'customer/:customerId',
    component: CustomerDetailsComponent
  },
  {
    path: 'customer-new',
    component: CustomerDetailsComponent
  },
  {
    path: 'manufacturer',
    component: ManufacturerComponent
  },
  {
    path: 'manufacturer/:manufacturerId',
    component: ManufacturerDetailsComponent
  },
  {
    path: 'manufacturer-new',
    component: ManufacturerDetailsComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'invoice/:invoiceId',
    component: InvoiceDetailsComponent
  },
  {
    path: 'invoice-new',
    component: InvoiceDetailsComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'product-new',
    component: ProductDetailsComponent
  },
  {
    path: 'vat',
    component: VatComponent
  },
  {
    path: 'vat-new',
    component: VatDetailsComponent
  },
  {
    path: 'vat/:vatId',
    component: VatDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
