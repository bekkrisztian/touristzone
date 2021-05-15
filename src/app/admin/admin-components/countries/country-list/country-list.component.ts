import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/model/country';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { CountryAddComponent } from '../country-add/country-add.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {


  dataSource =  new MatTableDataSource<Country>([]);
  displayedColumns: string[] = ['id', 'name', 'flag', 'image', 'actions'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spectacleService: SpectacleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.spectacleService.getCountries().subscribe(
      (data: Country[]) => this.dataSource.data = data,
      (error: any) => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteCountry(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű országot?")) {
    this.spectacleService.deleteCountry(id).subscribe(() => {
        this.getCountries(),
        (error: any) => console.log(error)
    });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CountryAddComponent, {
      width: '300px',
      height: '200px'
    });
  }

}
