import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplatesDialogComponent } from './templates-dialog/templates-dialog.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { AddPeopleDialogComponent } from './add-people-dialog/add-people-dialog.component';
import { ListDialogComponent } from './list-dialog/list-dialog.component';



@NgModule({
  declarations: [ActivitiesComponent, TemplatesDialogComponent, TextBoxComponent, AddPeopleDialogComponent, ListDialogComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatListModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatListModule
  ],
  entryComponents: [TemplatesDialogComponent, AddPeopleDialogComponent, ListDialogComponent],
})
export class ActivitiesModule { }
