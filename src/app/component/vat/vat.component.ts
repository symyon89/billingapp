import { Component, OnInit } from '@angular/core';
import {Manufacturer} from "../../interface/manufacturer";
import {ManufacturerService} from "../../service/manufacturer.service";
import {Vat} from "../../interface/vat";
import {VatService} from "../../service/vat.service";

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.css']
})
export class VatComponent implements OnInit {

  vatList:Vat[] = [];
  formMessage:string = "Empty list";
  constructor(private vatService:VatService) { }

  ngOnInit(): void {
    this.vatService.getAll().subscribe({
      next: vat => this.vatList = vat,
      error: err => console.error(err)
    });
  }

  deleteVat(id: string) {
    this.vatService.deleteById(id).subscribe(() => {
      window.location.reload();
      console.log("Vat deleted");
    });
  }

}
