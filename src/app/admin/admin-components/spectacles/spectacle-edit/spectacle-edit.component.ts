import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryDto } from 'src/app/model/country-dto';
import { Pin } from 'src/app/model/pin';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { Editor, Toolbar } from "ngx-editor";
import { Spectacle } from 'src/app/model/spectacle';
import { County } from 'src/app/model/county';

@Component({
  selector: 'app-spectacle-edit',
  templateUrl: './spectacle-edit.component.html',
  styleUrls: ['./spectacle-edit.component.scss']
})
export class SpectacleEditComponent implements OnInit {

  spectacleForm: FormGroup;
  countryDto: CountryDto[];
  counties: County[];
  pins: Pin[];
  spectacle: Spectacle;

  editor: Editor;
  editor1: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.editor = new Editor();
    this.editor1 = new Editor();


    this.spectacleForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      description: ['', Validators.required],
      history: ['', Validators.required],
      county: this.formBuilder.group({
        id: ['', Validators.required],
        country: this.formBuilder.group({
          id: ['', Validators.required],
        })
      }),
      pin: this.formBuilder.group({
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

      this.spectacleService.getPins()
        .subscribe(
          data => {
            this.pins = data;
          },
          (error: any) => console.log(error)
        );

        this.spectacleService.getCounties()
          .subscribe(
            data => {
              this.counties = data;
            }
          )

        this.getSpectacle();
  }
  onSubmit() {
    this.spectacleService.updateSpectacle(this.spectacleForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/spectaclelist']);
      }, (error) => {
        console.log(error);
      });
  }

  getSpectacle() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.spectacleService.getSpectacle(id).subscribe(
      data => {
        this.spectacle = data;
        this.spectacleForm.patchValue({
          id: this.spectacle.id,
          name: this.spectacle.name,
          latitude: this.spectacle.latitude,
          longitude: this.spectacle.longitude,
          description: this.spectacle.description,
          history: this.spectacle.history,
          county: {
            id: this.spectacle.county.id,
            country: {
              id: this.spectacle.county.country.id
            },
          },
          pin: {
            id: this.spectacle.pin.id
          }
        })
      },
      (error: any) => console.log(error)
    );
  }
}
