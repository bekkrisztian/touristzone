import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { County } from 'src/app/model/county';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { CountyAddComponent } from '../county-add/county-add.component';

@Component({
  selector: 'app-county-list',
  templateUrl: './county-list.component.html',
  styleUrls: ['./county-list.component.scss']
})
export class CountyListComponent implements OnInit {

  dataSource =  new MatTableDataSource<County>([]);
  displayedColumns: string[] = ['id', 'name', 'country', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spectacleService: SpectacleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCounties();
  }

  getCounties() {
    this.spectacleService.getCounties().subscribe(
      (data: County[]) => this.dataSource.data = data,
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

  deleteCounty(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű megyét?")) {
    this.spectacleService.deleteCounty(id).subscribe(() => {
        this.getCounties(),
        (error: any) => console.log(error)
    });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CountyAddComponent, {
      width: '400px',
      height: '300px'
    });
  }

}
