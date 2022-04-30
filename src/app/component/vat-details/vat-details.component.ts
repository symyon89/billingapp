import {Component, OnInit} from '@angular/core';
import {Vat} from "../../interface/vat";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VatService} from "../../service/vat.service";

@Component({
  selector: 'app-vat-details',
  templateUrl: './vat-details.component.html',
  styleUrls: ['./vat-details.component.css']
})
export class VatDetailsComponent implements OnInit {

  vatId: any;
  formMessage: string = '';
  vat: Vat = {id: "", name: "", code: "", percentage: 0};
  vatForm!: FormGroup;

  constructor(private vatService:VatService,private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.vatId = this.route.snapshot.params['vatId'];
    if (this.vatId != undefined) {
      this.vatService.getByID(this.vatId).subscribe({
          next: vat => this.vat = vat,
          error: error => console.log(error)
        }
      );
    }
    this.vatForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      code: new FormControl(),
      percentage: new FormControl("", [Validators.min(0)])
    });
  }

  submitVat() {
    if (this.vatForm.valid) {
      if (this.vat.id === "") {
        this.vatService.save(this.vat).subscribe({
          next: data => {
            this.vat = data;
            this.formMessage = "Success";
            this.router.navigate(["/vat/" + data.id]);
          },
          error: error => {
            this.formMessage = "Save error";
            console.log(error);
          }
        });
      } else {
        this.vatService.update(this.vat).subscribe({
          next: data => {
            this.vat = data;
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
