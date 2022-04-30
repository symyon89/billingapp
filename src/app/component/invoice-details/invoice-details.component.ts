import {Component, OnInit} from '@angular/core';
import {Customer} from "../../interface/customer";
import {Invoice} from "../../interface/invoice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from 'src/app/service/invoice.service';
import {CustomerService} from 'src/app/service/customer.service';
import {InvoiceQuantity} from "../../interface/invoice-quantity";
import {ProductService} from 'src/app/service/product.service';
import {Product} from 'src/app/interface/product';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceId: any;
  formMessage: string = '';
  invoiceNumber: any = null;
  customerList!: Customer[];
  customer!: Customer;
  invoiceQuantities: InvoiceQuantity[] = [];
  invoice: Invoice = {
    id: "",
    customer: this.customer,
    invoiceQuantities: this.invoiceQuantities,
    invoiceNumber: this.invoiceNumber,
    dateAdded: new Date(),
    lastDateModified: new Date()
  };
  productList!: Product[];
  invoiceForm!: FormGroup;
  selectedProduct!: any;
  quantity: number = 0;
  showAddForm: boolean = true;

  constructor(private invoiceService: InvoiceService, private productService: ProductService, private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['invoiceId'];
    if (this.invoiceId != undefined) {
      this.invoiceService.getByID(this.invoiceId).subscribe({
          next: invoice => {
            this.invoice = invoice;
            this.customer = invoice.customer;
            this.invoiceQuantities = invoice.invoiceQuantities;
          },
          error: error => console.log(error)
        }
      );
    }
    this.customerService.getAll().subscribe({
      next: customers => this.customerList = customers,
      error: error => console.log(error)
    });
    this.productService.getAll().subscribe({
      next: products => this.productList = products,
      error: error => console.log(error)
    });

    this.invoiceForm = new FormGroup({
      customer: new FormControl(),
      products: new FormControl(),
      invoiceNumber: new FormControl(),
      quantity: new FormControl("", Validators.min(0)),
      dateAdded: new FormControl("", [Validators.required]),
      lastDateModified: new FormControl("", [Validators.required])
    })
  }

  submitProduct() {
    if (this.invoiceForm.valid) {
      if (this.invoice.id === "") {
        this.invoice.lastDateModified = new Date();
        this.invoice.dateAdded = new Date();
        this.invoiceService.save(this.invoice).subscribe({
          next: data => {
            this.invoice = data;
            this.formMessage = "Success";
            this.router.navigate(["/invoice/" + data.id]);
          },
          error: error => {
            this.formMessage = "Save error";
            console.log(error);
          }
        });
      } else {
        this.invoice.lastDateModified = new Date();
        this.invoiceService.update(this.invoice).subscribe({
          next: data => {
            this.invoice = data;
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

  setCustomer(customer: Customer) {
    this.customer = customer;
    this.invoice.customer = customer;
  }

  deleteInvoiceQuantities(invoiceQuantities: InvoiceQuantity) {
    this.invoice.invoiceQuantities.splice(this.invoice.invoiceQuantities.indexOf(invoiceQuantities));
  }

  productSelected(product: Product) {
    this.selectedProduct = product;
    this.showAddForm = false;
  }

  addToInvoice() {
    if (this.quantity != 0) {
      this.invoice.invoiceQuantities.push({id: "", product: this.selectedProduct, quantity: this.quantity});
      this.selectedProduct = undefined;
      this.quantity = 0;
      this.showAddForm = true;
      this.formMessage = "Product added to invoice"
    } else {
      console.log(this.quantity)
      this.formMessage = "Cannot be 0"
    }
  }

  calculateTotal(): number {
    if (this.invoice.invoiceQuantities.length != 0) {
      return this.invoice.invoiceQuantities.map(invoiceQuantity => invoiceQuantity.product.price * invoiceQuantity.quantity).reduce((accumulator, currentValue) => accumulator + currentValue);
    }else {
      return 0;
    }

  }

  calculateTotalwithVat() : number {
    if (this.invoice.invoiceQuantities.length != 0) {
      return this.invoice.invoiceQuantities.map(invoiceQuantity => this.calculateVat(invoiceQuantity.product,invoiceQuantity.quantity)).reduce((accumulator, currentValue) => accumulator + currentValue);
    }else {
      return 0;
    }
  }
  calculateVat(product: Product,quantity: number):number {
    return (product.price +((product.price * product.vat.percentage) /100)) * quantity;
  }
}
