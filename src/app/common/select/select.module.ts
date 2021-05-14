import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SelectComponent],
  exports:[SelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class SelectModule { }
