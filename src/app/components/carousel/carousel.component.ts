import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // carousel images
  slides = [
    {'image': '/assets/img/carousel/carousel1.jpg'},
    {'image': '/assets/img/carousel/carousel2.jpg'},
    {'image': '/assets/img/carousel/carousel3.jpg'},
    {'image': '/assets/img/carousel/carousel4.jpg'},
    {'image': '/assets/img/carousel/carousel5.jpg'},
    {'image': '/assets/img/carousel/carousel6.jpg'}
  ];
}
