import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-top',
  templateUrl: './arrow-top.component.html',
  styleUrls: ['./arrow-top.component.scss']
})
export class ArrowTopComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;

  constructor() { }

  ngOnInit(): void {
  }

  // scroll to top
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
