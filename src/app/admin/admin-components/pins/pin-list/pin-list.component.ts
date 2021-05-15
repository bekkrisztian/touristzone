import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pin } from 'src/app/model/pin';
import { SpectacleService } from 'src/app/service/spectacle.service';
import { PinAddComponent } from '../pin-add/pin-add.component';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss']
})
export class PinListComponent implements OnInit {

  dataSource =  new MatTableDataSource<Pin>([]);
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spectacleService: SpectacleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPins();
  }

  getPins() {
    this.spectacleService.getPins().subscribe(
      (data: Pin[]) => this.dataSource.data = data,
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

  deletePin(id: number) {
    if(confirm("Biztos akarja törölni a pint?")) {
    this.spectacleService.deletePin(id).subscribe(() => {
        this.getPins(),
        (error: any) => console.log(error)
    });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PinAddComponent, {
      width: '400px',
      height: '300px'
    });
  }
}
