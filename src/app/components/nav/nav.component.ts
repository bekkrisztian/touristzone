import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private brakepointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  // show sidebar
  isHandset$: Observable<boolean> = this.brakepointObserver
    .observe('(max-width: 1300px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
