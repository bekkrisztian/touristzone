import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/model/country';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss']
})
export class CountryFlagComponent implements OnInit {

  country: Country;
  image: File = null;

  constructor(private spectacleService: SpectacleService, private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.spectacleService.getCountry(id).subscribe(
      (data: Country) => this.country = data,
      (error: any) => console.log(error)
    )
  }

  onFlagSelected(event) {
    this.image = <File>event.target.files[0];
  }

  onFlagUpload() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    const formData = new FormData();
    formData.append('image', this.image, this.image.name);
    this.http.post(`http://localhost:8080/api/v1/flag/save/${id}`, formData).subscribe(res => {
      console.log(res);
    }, (error: any) => console.log(error));
    window.location.reload();
  }

  deleteFlag(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű zászlót?")) {
    this.spectacleService.deleteFlag(id).subscribe(() => {
        this.getCountry(),
        (error: any) => console.log(error)
    });
    }
  }

}
