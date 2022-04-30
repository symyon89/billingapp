import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import {Product} from "../../interface/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productList: Product[] = [];
  formMessage:string = "Empty list";
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: products => this.productList = products,
      error: err => console.error(err)
    });
  }
  deleteProduct(id: string) {
    this.productService.deleteById(id).subscribe(() => {
      window.location.reload();
      console.log("Product deleted");
    });
  }

}
