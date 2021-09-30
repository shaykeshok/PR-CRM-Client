import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { MatTableModule } from '@angular/material/table';
import { InputModule } from 'src/app/common/input/input.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatSelectModule, MatSidenavModule, MatSortModule } from '@angular/material';
import { ReportPrintDialogComponent } from './report-print-dialog/report-print-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReportsComponent, ReportPrintDialogComponent],
  exports: [ReportsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    InputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule

  ],
  entryComponents: [ReportPrintDialogComponent]
})
export class ReportsModule { }
