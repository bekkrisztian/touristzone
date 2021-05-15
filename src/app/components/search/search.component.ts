import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { SpectacleService } from 'src/app/service/spectacle.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyword: string;
  spectacleCtrl = new FormControl;
  filteredOptions: Observable<any>;

  constructor(private router: Router, private spectacleService: SpectacleService) { }

  ngOnInit(): void {
    this.filteredOptions = this.spectacleCtrl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.filter(value))
      );
  }

  // filtered value by name
  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.spectacleService.getSpectacles().pipe(
      filter(data => !!data),
      map((data) => {
        return data.filter(option => option.name.toLowerCase().includes(value))
      })
    );
  }

  // search by keyword
  searchSpectacles(keyword) {
    this.router.navigateByUrl('/search/' + keyword);
  }

  // clear input
  clearSerarchInput(serachInput) {
    serachInput = document.getElementById('search-value');
  }
}
