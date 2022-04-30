import { Component, OnInit } from '@angular/core';
import {Product} from "../../interface/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {Manufacturer} from "../../interface/manufacturer";
import {Vat} from "../../interface/vat";
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { VatService } from 'src/app/service/vat.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:any;
  formMessage: string = '';
  manufacturerList!:Manufacturer[];
  vatList!:Vat[];
  manufacturer!:Manufacturer;
  vat!:Vat;
  product:Product = {
    id: "",
    name: "",
    sku: "",
    ean: "",
    description: "",
    price: 0,
    priceWithVat: 0,
    quantity: 0,
    manufacturer: this.manufacturer,
    vat: this.vat,
    dateAdded: new Date(),
    lastDateModified: new Date()
  };
  productForm!: FormGroup;
  constructor(private productService:ProductService,private manufacturerService:ManufacturerService,private vatService:VatService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    if (this.productId != undefined) {
      this.productService.getByID(this.productId).subscribe({
          next: product => {
            this.product = product;
            this.manufacturer = product.manufacturer;
            this.vat = product.vat;
          },
          error: error => console.log(error)
        }
      );

    }

    this.manufacturerService.getAll().subscribe({
      next: manufacturers => this.manufacturerList = manufacturers,
      error: error => console.log(error)
    });

    this.vatService.getAll().subscribe({
      next: vat => this.vatList = vat,
      error: error => console.log(error)
    });

    this.productForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      sku: new FormControl(),
      ean: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      priceWithVat: new FormControl(),
      quantity: new FormControl("",Validators.min(0)),
      manufacturer: new FormControl(),
      vat: new FormControl(),
      dateAdded: new FormControl("", [Validators.required]),
      lastDateModified: new FormControl("", [Validators.required]),
    });
  }

  submitProduct() {
    if (this.productForm.valid) {
      console.log(this.product.manufacturer);
      if (this.product.id === "") {
        this.product.lastDateModified=new Date();
        this.product.dateAdded=new Date();
        this.productService.save(this.product).subscribe({
          next: data => {
            this.product = data;
            this.formMessage = "Success";
            this.router.navigate(["/product/" + data.id]);
          },
          error: error => {
            this.formMessage = "Save error";
            console.log(error);
          }
        });
      } else {
        this.product.lastDateModified=new Date();
        this.productService.update(this.product).subscribe({
          next: data => {
            this.product = data;
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

  setManufacturer(manufacturer: Manufacturer) {
    this.manufacturer = manufacturer;
    this.product.manufacturer = manufacturer;
  }
  setVar(vat: Vat) {
    this.vat = vat;
    this.product.vat = vat;
  }
}
