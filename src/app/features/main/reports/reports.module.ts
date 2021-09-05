import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { MatTableModule } from '@angular/material/table';
import { InputModule } from 'src/app/common/input/input.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material';


@NgModule({
  declarations: [ReportsComponent],
  exports:[ReportsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    InputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ]
})
export class ReportsModule { }
