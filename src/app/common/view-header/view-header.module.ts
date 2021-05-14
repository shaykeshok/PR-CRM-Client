import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHeaderComponent } from './view-header.component';



@NgModule({
  declarations: [ViewHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [ViewHeaderComponent]
})
export class ViewHeaderModule { }
