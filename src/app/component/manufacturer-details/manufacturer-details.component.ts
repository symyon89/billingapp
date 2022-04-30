import { Component, OnInit } from '@angular/core';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import {Manufacturer} from "../../interface/manufacturer";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-manufacturer-details',
  templateUrl: './manufacturer-details.component.html',
  styleUrls: ['./manufacturer-details.component.css']
})
export class ManufacturerDetailsComponent implements OnInit {

  manufacturerId:any;
  formMessage: string = '';
  manufacturer:Manufacturer = {
    id:"",
    name: "",
    description: "",
    dateAdded: new Date(),
    lastDateModified: new Date()
  };
  manufacturerForm!: FormGroup;
  constructor(private manufacturerService:ManufacturerService,private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.manufacturerId = this.route.snapshot.params['manufacturerId'];
    if (this.manufacturerId != undefined) {
      this.manufacturerService.getByID(this.manufacturerId).subscribe({
          next: manufacturer => this.manufacturer = manufacturer,
          error: error => console.log(error)
        }
      );
    }
    this.manufacturerForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      description: new FormControl(),
      dateAdded: new FormControl("", [Validators.required]),
      lastDateModified: new FormControl("", [Validators.required]),
    });
  }
  submitManufacturer() {
    if (this.manufacturerForm.valid) {
      if (this.manufacturer.id === "") {
        this.manufacturer.lastDateModified=new Date();
        this.manufacturer.dateAdded=new Date();
        this.manufacturerService.save(this.manufacturer).subscribe({
          next: data => {
            this.manufacturer = data;
            this.formMessage = "Success";
            this.router.navigate(["/manufacturer/" + data.id]);
          },
          error: error => {
            this.formMessage = "Save error";
            console.log(error);
          }
        });
      } else {
        this.manufacturer.lastDateModified=new Date();
        this.manufacturerService.update(this.manufacturer).subscribe({
          next: data => {
            this.manufacturer = data;
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
}

