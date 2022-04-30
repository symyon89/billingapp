import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './component/navbar/navbar.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {CustomerComponent} from './component/customer/customer.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { ManufacturerComponent } from './component/manufacturer/manufacturer.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ProductComponent } from './component/product/product.component';
import { ManufacturerDetailsComponent } from './component/manufacturer-details/manufacturer-details.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { InvoiceDetailsComponent } from './component/invoice-details/invoice-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    ManufacturerComponent,
    InvoiceComponent,
    ProductComponent,
    ManufacturerDetailsComponent,
    ProductDetailsComponent,
    InvoiceDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
