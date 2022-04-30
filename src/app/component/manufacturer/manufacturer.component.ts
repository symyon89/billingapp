import { Component, OnInit } from '@angular/core';
import {Manufacturer} from "../../interface/manufacturer";
import {ManufacturerService} from "../../service/manufacturer.service";

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  manufacturerList:Manufacturer[] = [];
  formMessage:string = "Empty list";
  constructor(public manufacturerService:ManufacturerService) { }

  ngOnInit(): void {
    this.manufacturerService.getAll().subscribe({
      next: manufacturers => this.manufacturerList = manufacturers,
      error: err => console.error(err)
    });
  }

  deleteManufacturer(id: string) {
    this.manufacturerService.deleteById(id).subscribe(() => {
      window.location.reload();
      console.log("Manufacturer deleted");
    });
  }

}
