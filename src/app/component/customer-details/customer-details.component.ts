import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../interface/customer";
import {CustomerService} from "../../service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Contact} from "../../interface/contact";
import {Address} from "../../interface/address";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  editAddress: boolean = true;
  addressDeleteList: boolean = true;
  editList: boolean = true;
  deleteList: boolean = true;
  addContact: boolean = true;
  addAddress: boolean = true;
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
  contact: Contact = {id: "", name: "", email: "", phone: "", primary: true};
  address: Address = {
    id: "",
    street: "",
    number: "",
    otherDetails: "",
    city: "",
    county: "",
    country: "",
    postalCode: "",
    primaryBilling: true,
    primaryDelivery: true
  };

  constructor(public customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
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
      lastDateModified: new FormControl("", [Validators.required]),
      primary: new FormControl(),
      nameContact: new FormControl(),
      emailContact: new FormControl(),
      phoneContact: new FormControl(),
      addressStreet: new FormControl(),
      addressNumber: new FormControl(),
      otherDetails: new FormControl(),
      primaryBilling: new FormControl(),
      primaryDelivery: new FormControl(),
      city: new FormControl(),
      county: new FormControl(),
      country: new FormControl(),
      postalCode: new FormControl()
    });

  }

  submitCustomer() {
    if (this.customerForm.valid) {
      if (this.customer.id === "") {
        this.customerService.save(this.customer).subscribe({
          next: data => {
            this.customer = data;
            this.router.navigate(["/customer/" + data.id]);
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
    } else {
      this.formMessage = "Please complete all fields"
    }
  }

  showFormContact() {
    this.addContact = !this.addContact;
  }

  showFormAddress() {
    this.addAddress = !this.addAddress;
  }

  saveContact() {
    if (this.contact.name.length != 0) {

        if (this.contact.primary) {
          this.customer.contactList?.forEach(c => c.primary = false)
        }
        if (this.customer.contactList?.indexOf(this.contact) == -1) {
          this.customer.contactList?.push(this.contact);
        }
        this.contact = {id: "", name: "", email: "", phone: "", primary: true};
        this.formMessage = "Success";
        this.showFormContact();

    } else {
      this.formMessage = "Please complete name field";
    }

  }

  saveAddress() {
    if (this.address.city.length != 0) {
      if (this.address.primaryBilling) {
        this.customer.addressList?.forEach(a => a.primaryBilling = false);
      }
      if (this.address.primaryDelivery) {
        this.customer.addressList?.forEach(a => a.primaryDelivery = false);
      }
      if (this.customer.addressList?.indexOf(this.address) == -1) {
        this.customer.addressList?.push(this.address);
      }
      this.address = {
        id: "",
        street: "",
        number: "",
        otherDetails: "",
        city: "",
        county: "",
        country: "",
        postalCode: "",
        primaryBilling: true,
        primaryDelivery: true
      };
      this.formMessage = "Success";
      this.showFormAddress();
    } else {
      this.formMessage = "Please complete name field";
    }
  }

  setPrimary(contact: Contact) {
    this.customer.contactList?.forEach(c => contact === c ? c.primary = true : c.primary = false);
  }

  setBillingAddress(address: Address) {
    this.customer.addressList?.forEach(a => address === a ? a.primaryBilling = true : a.primaryBilling = false);
  }

  setDeliveryAddress(address: Address) {
    this.customer.addressList?.forEach(a => address === a ? a.primaryDelivery = true : a.primaryDelivery = false);
  }

  showDeleteList() {
    this.deleteList = !this.deleteList;
  }

  deleteContact(contact: Contact) {
    this.customer.contactList?.splice(this.customer.contactList?.indexOf(contact));
    this.showDeleteList();
  }

  showEditList() {
    this.editList = !this.editList;
  }

  editSave(contact: Contact) {
    this.contact = contact;
    this.addContact = false;
    this.showEditList();
  }

  showAddressDeleteList() {
    this.addressDeleteList = !this.addressDeleteList;
  }

  deleteAddress(address: Address) {
    this.customer.addressList?.splice(this.customer.addressList?.indexOf(address));
    this.showAddressDeleteList();
  }
  showEditAddress() {
    this.editAddress = !this.editAddress;
  }
  editAddressList(address: Address) {
    this.address = address;
    this.addAddress = false;
    this.showEditAddress();
  }

}
