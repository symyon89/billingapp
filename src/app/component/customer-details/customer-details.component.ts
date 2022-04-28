import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../interface/customer";
import {CustomerService} from "../../service/customer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerForm!: FormGroup;
  customerId: any;
  customer: Customer = {
    id: "",
    active: true,
    company: false,
    name: "",
    number: "",
    description: "",
    contactList: [],
    addressList: [],
    dateAdded: new Date(),
    lastDateModified: new Date()
  };
  formMessage: string = '';

  constructor(public customerService: CustomerService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['customerId'];
    if (this.customerId != undefined) {
      this.customerService.getByID(this.customerId).subscribe({
          next: customer => this.customer = customer,
          error: error => console.log(error)
        }
      );
    }

    this.customerForm = new FormGroup({
      active: new FormControl(),
      company: new FormControl(),
      name: new FormControl("", [Validators.required]),
      number: new FormControl(),
      description: new FormControl(),
      dateAdded: new FormControl("", [Validators.required]),
      lastDateModified: new FormControl("", [Validators.required])
    });

  }

  submitCustomer() {
    if (this.customerForm.valid) {
      if (this.customer.id === "") {
        this.customerService.save(this.customer).subscribe({
          next: data => {
            this.customer = data;
            this.formMessage = "Success"
          },
          error: error => {
            this.formMessage = "Save error";
            console.log(error);
          }
        });
      } else {
        this.customerService.update(this.customer).subscribe({
          next: data => {
            this.customer = data;
            this.formMessage = "Success"
          },
          error: error => {
            this.formMessage = "Update error";
            console.log(error);
          }
        });
      }
    }else {
      this.formMessage = "Please complete all fields"
    }

  }
}
