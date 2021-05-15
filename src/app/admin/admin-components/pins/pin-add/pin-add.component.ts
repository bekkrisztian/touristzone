import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pin } from 'src/app/model/pin';
import { SpectacleService } from 'src/app/service/spectacle.service';


@Component({
  selector: 'app-pin-add',
  templateUrl: './pin-add.component.html',
  styleUrls: ['./pin-add.component.scss']
})
export class PinAddComponent implements OnInit {

  pinForm: FormGroup;
  pins: Pin[];

  constructor(
    public dialogRef: MatDialogRef<PinAddComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private spectacleService: SpectacleService
  ) { }

  ngOnInit(): void {
    this.pinForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.spectacleService.getPins()
      .subscribe(
        data => {
          this.pins = data;
        },
        (error: any) => console.log(error)
      );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.spectacleService.createPin(this.pinForm.value)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
        this.router.navigate(['/dashboard/pins']);
      }, (error) => {
        console.log(error);
      });
      window.location.reload();
  }

}
