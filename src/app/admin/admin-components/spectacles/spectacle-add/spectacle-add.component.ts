import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryDto } from 'src/app/model/country-dto';
import { Pin } from 'src/app/model/pin';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { Editor, Toolbar } from "ngx-editor";
import { Spectacle } from 'src/app/model/spectacle';

@Component({
  selector: 'app-spectacle-add',
  templateUrl: './spectacle-add.component.html',
  styleUrls: ['./spectacle-add.component.scss']
})
export class SpectacleAddComponent implements OnInit {

  spectacleForm: FormGroup;
  countryDto: CountryDto[];
  counties: Array<any>;
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
    public dialogRef: MatDialogRef<SpectacleAddComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService) { }

  ngOnInit(): void {

    this.editor = new Editor();
    this.editor1 = new Editor();

    this.spectacleForm = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      description: ['', Validators.required],
      history: ['', Validators.required],
      county: this.formBuilder.group({
        id: ['', Validators.required]
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
  }

  changeCountry(count) {
    this.counties = this.countryDto.find(con => con.name == count).counties;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.spectacleService.createSpectacle(this.spectacleForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/spectaclelist']);
      }, (error) => {
        console.log(error);
      });
      window.location.reload();
  }
}
