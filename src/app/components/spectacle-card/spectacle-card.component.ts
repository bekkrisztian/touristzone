import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Spectacle } from 'src/app/model/spectacle';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { FilterComponent } from '../filter/filter.component';


@Component({
  selector: 'app-spectacle-card',
  templateUrl: './spectacle-card.component.html',
  styleUrls: ['./spectacle-card.component.scss']
})
export class SpectacleCardComponent implements OnInit, OnDestroy {

  spectacles: Spectacle[] = [];
  currentCountryId: number = 1;
  currentCountyId: number = 1;
  searchMode: boolean = false;
  previousCountry: number = 1;
  previousCounty: number = 1;

  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  pageSizeOptions = [5, 10, 25];
  isLoadingResults = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private spectacleService: SpectacleService,
    config: NgbPaginationConfig,
    public dialog: MatDialog) {
    config.maxSize = 3;
    config.boundaryLinks = true;
  }

  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe(() => {
      this.listSpectacles();

    });
  }

  // list spectacles by search or country or county
  listSpectacles() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    const hasCountyId: boolean = this.activatedRoute.snapshot.paramMap.has('id2');

    if (this.searchMode) {
      this.handleSearchSpectacles();
    } else if (hasCountyId) {
      this.handleListSpectaclesByCounty();
    } else {
      this.handleListSpectaclesByCountry();
    }
  }

  // spectacles show by country
  handleListSpectaclesByCountry() {
    const hasCountryId: boolean = this.activatedRoute.snapshot.paramMap.has('id1');

    if(hasCountryId) {
      this.currentCountryId = + this.activatedRoute.snapshot.paramMap.get('id1');
    } else {
      this.currentCountryId = 1;
    }

    if (this.previousCounty != this.currentCountyId) {
      this.currentPage = 1;
    }

    this.previousCountry = this.currentCountyId;

    this.isLoadingResults = true;
    this.spectacleService.getSpectacleByCountryId(this.currentCountryId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate(),
      (error: any) => console.log(error),
      () => {
        this.isLoadingResults = false;
      }
      );
  }

  // spectacles show by county
  handleListSpectaclesByCounty() {
    const hasCountyId: boolean = this.activatedRoute.snapshot.paramMap.has('id2');

    if(hasCountyId) {
      this.currentCountyId = + this.activatedRoute.snapshot.paramMap.get('id2');
    } else {
      this.currentCountyId = 1;
    }

    if (this.previousCounty != this.currentCountyId) {
      this.currentPage = 1;
    }

    this.previousCounty = this.currentCountyId;

    this.isLoadingResults = true;
    this.spectacleService.getSpectacleByCountyId(this.currentCountyId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate(),
      (error: any) => console.log(error),
      () => {
        this.isLoadingResults = false;
      }
      );
  }

  // spectacles show by search filter
  handleSearchSpectacles() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');

    this.isLoadingResults = true;
    this.spectacleService.searchSpectacles(keyword, this.currentPage - 1, this.pageSize).
      subscribe(
        this.processPaginate(),
        (error: any) => console.log(error),
        () => {
          this.isLoadingResults = false;
        }
      );
  }

  // pagination update
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listSpectacles();
  }

  // paging
  processPaginate() {
    return data => {
          this.spectacles = data.content;
          this.currentPage = data.number + 1;
          this.totalRecords = data.totalElements;
          this.pageSize = data.size;
    }
  }

  // dialog for filter
  openDialogWindow(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '400px',
      height: '400px'
    });
  }

  ngOnDestroy() {

  }
}
