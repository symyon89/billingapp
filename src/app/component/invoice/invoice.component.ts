import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/interface/invoice';
import {InvoiceService} from "../../service/invoice.service";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceList: Invoice[] = [];
  formMessage:string = "Empty list";
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe({
      next: invoices => {this.invoiceList = invoices; console.log(invoices) },
      error: err => console.error(err)
    });
  }

  deleteInvoice(id: string) {
    this.invoiceService.deleteById(id).subscribe(() => {
      window.location.reload();
      console.log("Invoice deleted");
    });
  }

}
