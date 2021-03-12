import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { SubmitComponent } from './submit/submit.component';


@NgModule({
  declarations: [SubmitComponent],
  exports:[SubmitComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
  ]
})
export class ButtonModule { }
