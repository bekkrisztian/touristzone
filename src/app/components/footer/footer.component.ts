import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpinionService } from 'src/app/service/opinion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private opinionService: OpinionService,
              private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.email],
      opinion: ['', Validators.maxLength(250)],
    });
  }

  getErrorMessage(control: AbstractControl): string {
    if (!control || control.valid) {
      return '';
    }

    if (control.hasError('required')) {
      return "Töltse ki a mezőt";
    }
    if (control.hasError('email')) {
      return "Valódi e-mail címet adjon meg";
    }
    if (control.hasError('opinion')) {
      const limit = control.getError('maxlength').requiredLength;
      return `Nem lehet több, mint ${limit} karakter`;
    }

    return "Helytelen mező";
  }

  onSubmit() {
    this.opinionService.addOpinion(this.formGroup.value)
      .subscribe(() => {
        alert("Vélemény sikeresen elküldve!");
      }, (error) => {
        console.log(error);
      });

      this.formGroup.reset()
      window.location.reload();
  }

  get emailField(): AbstractControl {
    return this.formGroup.get('email');
  }

  get feedbackField(): AbstractControl {
    return this.formGroup.get('opinion');
  }

}
