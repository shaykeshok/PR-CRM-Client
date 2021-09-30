import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { Values } from 'src/app/common/interfaces.interface';
import { ReportDataResponse } from 'src/app/common/response.model';
import { AppService } from 'src/app/service/app.service';
import { ReportsService } from 'src/app/service/reports.service';

@Component({
  selector: 'app-report-print-dialog',
  templateUrl: './report-print-dialog.component.html',
  styleUrls: ['./report-print-dialog.component.scss']
})
export class ReportPrintDialogComponent implements OnInit {
  UserCompanies$ = new BehaviorSubject<[{ Key: number, Value: string }]>(null);
  ReportData$ = new ReplaySubject<Values[]>(null);
  ReportData: Values[];
  ReportFields: string[] = ['id', 'three', 'foue'];
  ReportFields$ = new ReplaySubject<string[]>(null);
  filters = new FormGroup({
    Company: new FormControl(''),
    FromDt: new FormControl(''),
    ToDt: new FormControl(''),
    Campaign: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public ReportSettings: { ReportId: number, ReportFilters: string[] },
    private appService: AppService,
    private reportService: ReportsService
  ) { }

  ngOnInit() {
    const DATA = document.getElementById('htmlData').style.display = 'none';
    this.appService.userCompanies$
      .pipe(skipWhile(res => (res === undefined) || (res === null)))
      .subscribe((res: [{ key: number, Value: string }]) => {
        this.UserCompanies$.next(res);

      });
    this.appService.userCompanies$.pipe(map(item => console.log(item))).subscribe();


  }
  public SavePDF(): void {
    this.reportService.GetReportData(this.ReportSettings.ReportId)
      .subscribe((res: ReportDataResponse) => {
        const DATA = document.getElementById('htmlData');
        DATA.style.display = 'block';
        this.ReportData$.next(res.Rows);
        this.ReportFields$.next(res.Fields);

        DATA.style.display = 'block';
        setTimeout(() => {
          html2canvas(DATA).then(canvas => {

            const fileWidth = 208;
            const fileHeight = canvas.height * fileWidth / canvas.width;

            const FILEURI = canvas.toDataURL('image/png');
            const PDF = new jsPDF('p', 'mm', 'a4');
            const position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

            PDF.save('report.pdf');
          });
        },
          300);
      });
  }
}
