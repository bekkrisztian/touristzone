import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryDto } from 'src/app/model/country-dto';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-county-add',
  templateUrl: './county-add.component.html',
  styleUrls: ['./county-add.component.scss']
})
export class CountyAddComponent implements OnInit {

  countyForm: FormGroup;
  countryDto: CountryDto[];

  constructor(public dialogRef: MatDialogRef<CountyAddComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService) { }

  ngOnInit(): void {
    this.countyForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: this.formBuilder.group({
        id: ['', Validators.required]
      })
    });

    this.spectacleService.getCountriesAndCounties()
      .subscribe(
        data => {
          this.countryDto = data;
        },
        (error: any) => console.log(error)
      );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.spectacleService.createCounty(this.countyForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/countylist']);
      }, (error) => {
        console.log(error);
      });
      window.location.reload();
  }

}
