import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Spectacle } from 'src/app/model/spectacle';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { SpectacleAddComponent } from '../spectacle-add/spectacle-add.component';

@Component({
  selector: 'app-spectacle-list',
  templateUrl: './spectacle-list.component.html',
  styleUrls: ['./spectacle-list.component.scss']
})
export class SpectacleListComponent implements OnInit {

  dataSource =  new MatTableDataSource<Spectacle>([]);
  displayedColumns: string[] = ['id', 'name', 'longitude', 'latitude', 'county', 'country', 'sources', 'actions'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spectacleService: SpectacleService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSpectacles();
  }

  getSpectacles() {
    this.spectacleService.getSpectacles().subscribe(
      (data: Spectacle[]) => this.dataSource.data = data,
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

  deleteSpectacle(id: number, name: string) {
    if(confirm("Biztos akarja törölni a " + name + " nevű látványosságot?")) {
    this.spectacleService.deleteSpectacle(id).subscribe(() => {
        this.getSpectacles(),
        (error: any) => console.log(error)
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SpectacleAddComponent, {
      width: '800px',
      height: '700px'
    });
  }
}
