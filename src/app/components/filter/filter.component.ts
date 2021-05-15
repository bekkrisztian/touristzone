import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CountryDto } from 'src/app/model/country-dto';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  // dto
  countryDto: CountryDto[];

  constructor(private spectacleService: SpectacleService,
              public dialogRef: MatDialogRef<FilterComponent>
  ) { }

  ngOnInit(): void {
    // get countryDto
    this.spectacleService.getCountriesAndCounties()
      .subscribe(
        data => {
          this.countryDto = data;
        },
        (error: any) => console.log(error)
      );
  }

  // show counties in submenu
  showSubMenus(id) {
    document.querySelectorAll<HTMLElement>("#sub-menu" + id).forEach(el => {
      if(el.style.display = "none") {
        el.style.display = "block";
        document.querySelectorAll<HTMLElement>("#less" + id).forEach(el => {
          el.style.display = "block";
        })
        document.querySelectorAll<HTMLElement>("#more" + id).forEach(el => {
          el.style.display = "none";
        })
      }
    });
  }

  // hide counties in submenu
    hideSubMenus(id) {
      document.querySelectorAll<HTMLElement>("#sub-menu" + id).forEach(el => {
        if(el.style.display = "block") {
          el.style.display = "none";
          document.querySelectorAll<HTMLElement>("#less" + id).forEach(el => {
            el.style.display = "none";
          })
          document.querySelectorAll<HTMLElement>("#more" + id).forEach(el => {
            el.style.display = "block";
          })
        }
      });
  }
}
