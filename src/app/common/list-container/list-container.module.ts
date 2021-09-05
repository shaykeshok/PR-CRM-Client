import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContainerComponent } from './list-container.component';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [ListContainerComponent],
  exports: [ListContainerComponent],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class ListContainerModule { }
