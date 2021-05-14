import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { IInputConfig } from 'src/app/common/input/input.model';

const FILTER: IInputConfig =
{
  type: 'text',
  name: 'filter',
  label: 'Filter',
  formControl: 'filter',
  appearance: 'legacy',
  autocomplete: 'off'
}

const DATA: ReportData[] = [{
  id: '1',
  name: "rep1",
  desc: "desc rep1"
}, {
  id: '2',
  name: "rep2",
  desc: "desc rep2"
}
  , {
  id: '3',
  name: "rep3",
  desc: "desc rep3"
}
  , {
  id: '4',
  name: "rep4",
  desc: "desc rep4"
}
, {
  id: '5',
  name: "rep4",
  desc: "desc rep4"
}
, {
  id: '6',
  name: "rep6",
  desc: "desc rep6"
}]

export interface ReportData {
  id: string;
  name: string;
  desc: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  filterInput = FILTER;

  displayedColumns: string[] = ['id', 'name', 'desc', 'pdf'];
  dataSource: MatTableDataSource<ReportData>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.SetDataSource();
  }

  public SetDataSource() {

    //   this.reports$.pipe(
    //     takeUntil(this.destroy$)

    //   ).subscribe((categories: Category[]) => {
    this.dataSource = new MatTableDataSource<ReportData>(DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //     // this.cdr.detectChanges();
    //   });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportPDF(d){
    console.log(d);
  }
}
