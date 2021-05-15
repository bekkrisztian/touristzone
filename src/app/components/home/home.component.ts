import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Spectacle } from 'src/app/model/spectacle';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  spectacles: Spectacle[];

  constructor(private brakepointObserver: BreakpointObserver,
              private spectacleService: SpectacleService
  ) { }

  ngOnInit(): void {

    // get spectacles
    this.spectacleService.getSpectacles().subscribe(
      data => {
        this.spectacles = data;
      },
      (error: any) => console.log(error)
    );
  }

  // for grid pictures
  cards = this.brakepointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if(matches) {
        return [
          {title: 'Térkép', imageName: 'maps.jpg', url: '/maps', content: 'Keresse meg a legszebb helyeket és tudjon meg róluk többet!', cols: 2, rows: 1},
          {title: 'Látványosságok', imageName: 'spectacles.jpg', url: '/spectacles', content: 'Nézze meg az országok látnivalóit!', cols: 2, rows: 1},
          {title: 'Rólunk', imageName: 'aboutus.jpg', url: '/aboutus', content: 'Tudjon meg többet a TouristZone - ról!', cols: 2, rows: 1}
        ];
      }

      return [
        {title: 'Térkép', imageName: 'maps.jpg', url: '/maps', content: 'Keresse meg a legszebb helyeket és tudjon meg róluk többet!', cols: 2, rows: 1},
        {title: 'Látványosságok', imageName: 'spectacles.jpg', url: '/spectacles', content: 'Nézze meg az országok látnivalóit!', cols: 1, rows: 1},
        {title: 'Rólunk', imageName: 'aboutus.jpg', url: '/aboutus', content: 'Tudjon meg többet a TouristZone - ról!', cols: 1, rows: 1}
      ];
    })
  );

  ngOnDestroy() {

  }
}
