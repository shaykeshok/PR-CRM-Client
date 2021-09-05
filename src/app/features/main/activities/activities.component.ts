import { animate, state, style, transition, trigger } from '@angular/animations';
import { NumberFormatStyle } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Customer } from 'src/app/common/Customer.model';
import { ReportData } from '../reports/reports.component';
import { AddPeopleDialogComponent } from './add-people-dialog/add-people-dialog.component';
import { TemplatesDialogComponent } from './templates-dialog/templates-dialog.component';
interface Food {
  value: string;
  viewValue: string;
}
export interface Person {
  id: number;
  name: string;
  order: number;
}
interface TextBox {
  boxId: number;
  text: string;
  bold: boolean;
  fontSize: number;
  color: string;
}

const DATA: ReportData[] = [{
  id: '1',
  name: "rep1",
  desc: "desc rep1"
}, {
  id: '2',
  name: "rep2",
  desc: "desc rep2"
}
  , {
  id: '3',
  name: "rep3",
  desc: "desc rep3"
}
  , {
  id: '4',
  name: "rep4",
  desc: "desc rep4"
}
  , {
  id: '5',
  name: "rep4",
  desc: "desc rep4"
}
  , {
  id: '6',
  name: "rep6",
  desc: "desc rep6"
}]
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ActivitiesComponent implements OnInit {
  dataSource: MatTableDataSource<ReportData>;
  PerosnList: Customer[] = [];
  indexItem = 0;
  displayedColumns: string[] = ['id', 'name', 'desc', 'pdf'];
  displayedColumnsPerosn: string[] = ['name'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  freeText: string;
  selectedCat: number;
  selectedSubCat: number;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('menuSidebar', { static: true }) menuSidebar: MatSidenav;
  freeText$: BehaviorSubject<string> = new BehaviorSubject(null);
  sort$: BehaviorSubject<Sort> = new BehaviorSubject<Sort>(null);

  // pageSizeOptions = [10, 20, 30];

  textBoxList: TextBox[] = [];

  constructor(private dialog: MatDialog) { }

  filters = new FormGroup({
    free: new FormControl(''),
    catx: new FormControl(''),
    subx: new FormControl(''),
    fromDt: new FormControl(''),
    toDt: new FormControl(''),
    showArchive: new FormControl(''),
    showDone: new FormControl(''),
  });

  settings = new FormGroup({
    ActivityTitle: new FormControl(''),
  });


  setDateFilters() {
    this.filters.get('fromDt').markAsDirty();
    this.filters
      .get('fromDt')
      .patchValue(
        new Date(
          new Date(
            new Date(new Date().toLocaleDateString('en-US')).setDate(0)
          ).setDate(1)
        )
      );
    this.filters.get('toDt').markAsDirty();
    this.filters
      .get('toDt')
      .patchValue(new Date(new Date().toLocaleDateString('en-US')));
  }
  public SetDataSource() {
    //this.PerosnList = new MatTableDataSource<Person>();

    this.dataSource = new MatTableDataSource<ReportData>(DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.SetDataSource();
    this.setDateFilters();
    const textBox: TextBox = { boxId: this.indexItem, text: '', color: '#000000', fontSize: 10, bold: false };
    this.textBoxList.push(textBox);
  }

  dateChanged() { }

  openPersonsList() {
    const dialogRef = this.dialog.open(AddPeopleDialogComponent);

    dialogRef.afterClosed().subscribe((result: Customer[]) => {
      //result.map((x) => console.log(x.FirstName));
      this.PerosnList = result;

    });
  }

  onSelectCat(event) {
    // this.selectedCat$.next(event);
    // this.selectedSubCat$.next(null);
    this.filters.get('subx').markAsDirty();
    this.filters.get('subx').patchValue('', { emitEvent: true });

  }
  onSelectSubCat(event: number) {
    // this.selectedSubCat$.next(event);

  }
  onFreeTextChanged(event: string) {
    this.freeText$.next(event);
  }

  test() {
    this.filters.get('fromDt').patchValue(new Date());
  }
  clearFilters() {
    // this.selectedCat$.next(null);
    // this.selectedSubCat$.next(null);
    this.freeText$.next(null);
    // this.enDate$.next(null);
    this.selectedSubCat = null;
    this.selectedCat = null;
    this.freeText = null;
    this.filters.markAsDirty();
    this.filters.reset();
    this.filters.get('catx').markAsDirty();
    this.filters.get('catx').patchValue('', { emitEvent: false });
    this.filters.get('subx').markAsDirty();
    this.filters.get('subx').patchValue('', { emitEvent: false });

  }
  onSort(event: Sort) {
    this.sort$.next(event);
  }

  dateExpired(date: string) {
    const expDate = new Date(date);
    const today = new Date();
    if (today.getTime() < expDate.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  addActivity() {
    const dialogRef = this.dialog.open(TemplatesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (Number(result)) {
        console.log('number!');
        this.sidenav.toggle();
      }
    });
  }
  addTextBox() {
    const textBox: TextBox = { boxId: ++this.indexItem, text: '', color: '#000000', fontSize: 10, bold: false };
    this.textBoxList.push(textBox);
  }
  removeTextBox(boxId) {
    this.textBoxList = this.textBoxList.filter(obj => obj.boxId !== boxId);

  }

  updateTextBox(event) {
    this.textBoxList[this.textBoxList.findIndex(item => item.boxId === event.boxId)] = event;

  }
}
