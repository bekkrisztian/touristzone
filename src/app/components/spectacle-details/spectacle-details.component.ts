import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Spectacle } from 'src/app/model/spectacle';
import { SpectacleService } from 'src/app/service/spectacle.service';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-spectacle-details',
  templateUrl: './spectacle-details.component.html',
  styleUrls: ['./spectacle-details.component.scss']
})
export class SpectacleDetailsComponent implements OnInit, OnDestroy {

  spectacle: Spectacle;
  isLoadingResults = false;

  constructor(private activatedRoute: ActivatedRoute, private spectacleService: SpectacleService) { }

  ngOnInit(): void {

    Mapboxgl.accessToken = environment.mapboxKey;

    this.activatedRoute.paramMap.subscribe(
      () => {
        this.getSpectacleInfo();
      }
    )

    // content box show and hide
    const accordation = document.getElementsByClassName('contentBox');
    for (let index = 0; index < accordation.length; index++) {
      accordation[index].addEventListener('click', function(){
        this.classList.toggle('active')
      })
    }
  }

  getSpectacleInfo() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.isLoadingResults = true;
    this.spectacleService.getSpectacle(id).subscribe(
      data => {
          this.spectacle = data;

          let lat = this.spectacle.latitude;
          let lng = this.spectacle.longitude;

          let map = new Mapboxgl.Map({
              container: 'spectacle-map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [lng, lat],
              zoom: 15,
              interactive: false
          });

          let spectacle = [{
              coordinates: [lng, lat]
          }];

          spectacle.forEach(function(spectacle) {
          let marker = new Mapboxgl.Marker({
            draggable: false
          })
          .setLngLat(spectacle.coordinates)
          .addTo(map);
        }), this.isLoadingResults = false;
      }
    )
  }

  // carousel settings
  config: SwiperOptions = {
    mousewheel: true,
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  ngOnDestroy() {

  }
}
