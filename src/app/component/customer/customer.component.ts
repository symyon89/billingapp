import {Component, OnInit, Type} from '@angular/core';
import {CustomerService} from 'src/app/service/customer.service';
import {Customer} from "../../interface/customer";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  customerList: Customer[] = [];
  formMessage:string = "Empty list";

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: customers => this.customerList = customers,
      error: err => console.error(err)
    });
  }

  deleteCustomer(id: string) {
    this.customerService.deleteById(id).subscribe(() => {
      window.location.reload();
      console.log("Customer deleted");
    });
  }

}
