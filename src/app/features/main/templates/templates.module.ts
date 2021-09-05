import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListContainerModule } from 'src/app/common/list-container/list-container.module';
import { AddPeopleDialogComponent } from '../activities/add-people-dialog/add-people-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputModule } from 'src/app/common/input/input.module';
import { SelectModule } from 'src/app/common/select/select.module';
import { DialogModule } from 'src/app/common/dialog/dialog.module';



@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ListContainerModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSlideToggleModule,
    InputModule,
    SelectModule,
    DialogModule
  ],
  entryComponents: []
})
export class TemplatesModule { }
