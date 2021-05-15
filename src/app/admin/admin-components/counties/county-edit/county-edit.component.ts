import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryDto } from 'src/app/model/country-dto';
import { County } from 'src/app/model/county';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-county-edit',
  templateUrl: './county-edit.component.html',
  styleUrls: ['./county-edit.component.scss']
})
export class CountyEditComponent implements OnInit {

  countyForm: FormGroup;
  county: County;
  countryDto: CountryDto[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.countyForm = this.formBuilder.group({
      id: ['', Validators.required],
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

    this.getCounty();
  }

  onSubmit() {
    this.spectacleService.updateCounty(this.countyForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/countylist']);
      }, (error) => {
        console.log(error);
      });
  }

  getCounty() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.spectacleService.getCounty(id).subscribe(
      data => {
        this.county = data;
        this.countyForm.patchValue({
          id: this.county.id,
          name: this.county.name,
          country: {
            id: this.county.country.id
          }
        });
      },
      (error: any) => console.log(error)
    );
  }

}
