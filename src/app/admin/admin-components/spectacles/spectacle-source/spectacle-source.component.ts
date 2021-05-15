import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Spectacle } from 'src/app/model/spectacle';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-spectacle-source',
  templateUrl: './spectacle-source.component.html',
  styleUrls: ['./spectacle-source.component.scss']
})
export class SpectacleSourceComponent implements OnInit {

  spectacle: Spectacle;
  image: File = null;
  images: string[] = [];
  sourceForm: FormGroup;
  otherForm: FormGroup;

  constructor(private spectacleService: SpectacleService,
    private activatedRoute: ActivatedRoute,
     private http: HttpClient,
     private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getSpectacle();

    this.sourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      source: ['', Validators.required]
    });

    this.otherForm = this.formBuilder.group({
      name: ['', Validators.required],
      source: ['', Validators.required]
    });
  }

  getSpectacle() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.spectacleService.getSpectacle(id).subscribe(
      (data: Spectacle) => this.spectacle = data,
      (error: any) => console.log(error)
    )
  }

  onCoverSelected(event) {
    this.image = <File>event.target.files[0];
  }

  onCoverUpload() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    const formData = new FormData();
    formData.append('image', this.image, this.image.name);
    this.http.post(`http://localhost:8080/api/v1/cover/save/${id}`, formData).subscribe(res => {
      console.log(res);
    }, (error: any) => console.log(error));
    window.location.reload();
  }

  onImageSelected (event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.images.push(event.target.files[i]);
    }
  }

  onImageUpload () {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    const formData = new FormData();

    for (var i = 0; i < this.images.length; i++) {
      formData.append("image", this.images[i]);
    }

    this.http.post(`http://localhost:8080/api/v1/images/save/${id}`, formData).subscribe(res => {
      console.log(res);
    }, (error: any) => console.log(error));
    window.location.reload();
  }

  deleteSource(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű forrást?")) {
    this.spectacleService.deleteSource(id).subscribe(() => {
        this.getSpectacle(),
        (error: any) => console.log(error)
    });
    }
  }

  deleteOther(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű egyéb forrást?")) {
    this.spectacleService.deleteOther(id).subscribe(() => {
        this.getSpectacle(),
        (error: any) => console.log(error)
    });
    }
  }

  deleteImage(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű képet?")) {
    this.spectacleService.deleteImage(id).subscribe(() => {
        this.getSpectacle(),
        (error: any) => console.log(error)
    });
    }
  }

  deleteCover(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű borítóképet?")) {
    this.spectacleService.deleteCover(id).subscribe(() => {
        this.getSpectacle(),
        (error: any) => console.log(error)
    });
    }
  }

  onSubmit() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.spectacleService.createSources(this.sourceForm.value, id)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
      }, (error) => {
        console.log(error);
      });
      window.location.reload();
  }

  onSubmit1() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.spectacleService.createOthers(this.otherForm.value, id)
      .subscribe(() => {
        alert("Adatok sikeresen hozzáadva!");
      }, (error) => {
        console.log(error);
      });
      window.location.reload();
  }
}
