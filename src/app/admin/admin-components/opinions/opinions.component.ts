import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Opinion } from 'src/app/model/opinion';
import { OpinionService } from 'src/app/service/opinion.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss']
})
export class OpinionsComponent implements OnInit {

  dataSource =  new MatTableDataSource<Opinion>([]);
  displayedColumns: string[] = ['id', 'email', 'opinion', 'actions'];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private opinionService: OpinionService) { }

  ngOnInit(): void {
    this.getOpinions();
  }

  getOpinions() {
    this.opinionService.getOpinions().subscribe(
      (data: Opinion[]) => this.dataSource.data = data,
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

  deleteOpinion(id: number, email: string) {
    if(confirm("Biztos akarja törölni a " + email + " által beküldött véleményt?")) {
    this.opinionService.deleteOpinion(id).subscribe(() => {
        this.getOpinions(),
        (error: any) => console.log(error)
    });
    }
  }
}
