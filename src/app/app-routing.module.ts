import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./component/customer/customer.component";
import {CustomerDetailsComponent} from "./component/customer-details/customer-details.component";


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
