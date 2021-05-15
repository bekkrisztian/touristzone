import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/model/country';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  countryForm: FormGroup;
  country: Country;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.getCountry();
  }

  onSubmit() {
    this.spectacleService.updateCountry(this.countryForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/countrylist']);
      }, (error) => {
        console.log(error);
      });
  }

  getCountry() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.spectacleService.getCountry(id).subscribe(
      data => {
        this.country = data;
        this.countryForm.patchValue({
          id: this.country.id,
          name: this.country.name,
        });
      },
      (error: any) => console.log(error)
    );
  }
}
