import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {

  countryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CountryAddComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.spectacleService.createCountry(this.countryForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/countrylist']);
      }, (error) => {
        console.log(error);
      });
      window.location.reload();
  }
}
