import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersComponent } from './customers.component';
import { MatTableModule } from '@angular/material/table';
import { InputModule } from 'src/app/common/input/input.module';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/common/button/button.module';
import { ViewHeaderModule } from '../../../common/view-header/view-header.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CustomersListComponent, CustomerDetailsComponent, CustomersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    InputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    ButtonModule,
    ViewHeaderModule,
    MatButtonModule
  ]
})
export class CustomersModule { }
