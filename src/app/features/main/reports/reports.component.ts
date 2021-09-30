import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IInputConfig } from 'src/app/common/input/input.model';
import { Report } from 'src/app/common/interfaces.interface';
import { ReportDataResponse, ReportsResponse } from 'src/app/common/response.model';
import { ReportsService } from 'src/app/service/reports.service';
import { ReportPrintDialogComponent } from './report-print-dialog/report-print-dialog.component';



const FILTER: IInputConfig = {
  type: 'text',
  name: 'filter',
  label: 'Filter',
  formControl: 'filter',
  appearance: 'legacy',
  autocomplete: 'off'
};


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  filterInput = FILTER;
  ReportList$ = new BehaviorSubject<Report[]>(null);
  displayedColumns: string[] = ['ReportName', 'ReportDescription', 'pdf'];
  dataSource: MatTableDataSource<Report>;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('content', { static: true }) content: ElementRef;
  constructor(
    private reportsService: ReportsService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.SetDataSource();
  }

  public SetDataSource() {
    this.reportsService.GetReports()
      .pipe()
      .subscribe((res: ReportsResponse) => {
        this.ReportList$.next(res.Reports);
        this.dataSource = new MatTableDataSource<Report>(res.Reports);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportPDF(d) {
    const dialogData = { ReportId: d, ReportsFilters: this.ReportList$.value.find(item => item.ReportId === d).Filters };
    const dialogRef = this.dialog.open(ReportPrintDialogComponent, {
      width: '810px',
      height: '527px',
      panelClass: 'dialog-',
      data: dialogData,
    });

    return dialogRef.afterClosed().subscribe();
  }
}
