import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { HorizontalPosition, VerticalPosition } from 'src/app/common/common.model';
import { Customer } from 'src/app/common/Customer.model';
import { Activity, ActivityFilters, Templates, TextBox } from 'src/app/common/interfaces.interface';
import { ActivityService } from 'src/app/service/activity.service';
import { AppService } from 'src/app/service/app.service';
import { ReportData } from '../reports/reports.component';
import { AddPeopleDialogComponent } from './add-people-dialog/add-people-dialog.component';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
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
  dataSource: MatTableDataSource<Activity>;
  PerosnList: Customer[] = [];
  indexItem = 0;
  displayedColumns: string[] = ['ActivityTitle', 'Company', 'SendingType', 'InsertDate', 'TrackMail', 'Text', 'JBIlist'];
  displayedColumnsPerosn: string[] = ['name'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  foods: Food[] = [
    { value: '1', viewValue: 'Steak' },
    { value: '2', viewValue: 'Pizza' },
    { value: '3', viewValue: 'Tacos' }
  ];
  tableDataSubscription: Subscription;
  stDate$: BehaviorSubject<string> = new BehaviorSubject<string>('01-01-2019');
  enDate$: BehaviorSubject<string> = new BehaviorSubject<string>(new Date().toLocaleDateString());

  stDate: Date;
  enDate: Date;
  selectedCompany$: BehaviorSubject<number> = new BehaviorSubject(null);
  times = ['minutes', 'hours', 'days', 'weeks'];
  timesText = 'minutes';
  freeText: string;
  disabledCompany = true;
  disabledPersonalRequest = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('menuSidebar', { static: true }) menuSidebar: MatSidenav;
  @ViewChild('sendingTypeId', { static: true }) sendingTypeId: MatSlideToggle;
  @ViewChild('addButtonsId', { static: true }) addButtonsId: MatSlideToggle;
  freeText$: BehaviorSubject<string> = new BehaviorSubject(null);
  sort$: BehaviorSubject<Sort> = new BehaviorSubject<Sort>(null);
  sendingType = 0;
  showButtons = false;
  stopButton$: BehaviorSubject<number> = new BehaviorSubject(null);
  PersonalRequest$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  UserCompanies$: Observable<[{ key: number, val: string }]>;
  textBoxList: TextBox[] = [];

  constructor(
    private dialog: MatDialog,
    private activityService: ActivityService,
    private appService: AppService,
  ) { }

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
    Button1: new FormControl(''),
    Button2: new FormControl(''),
    Button3: new FormControl(''),
    Company: new FormControl(''),
    PersonalRequest: new FormControl('Dear'),
    TrackEmails: new FormControl(''),
    MessagesPerPerson: new FormControl(''),
    PeriodBetweenSending: new FormControl(''),
  });


  ngOnInit() {
    this.SetDataSource();
    // this.setDateFilters();

    this.UserCompanies$ = this.appService.userCompanies$;
    this.UserCompanies$.pipe(map(item => console.log(item))).subscribe();
    this.appService.userCompanies$.pipe(map(item => console.log(item))).subscribe();

    this.tableDataSubscription = combineLatest([
      this.stDate$,
      this.enDate$,
      this.selectedCompany$
    ])
      .pipe(
        debounceTime(150),
        switchMap(
          ([stDate, enDate, selectedCompany]: [string, string, number]
          ) => {
            const filters: ActivityFilters = {
              company: selectedCompany,
              stDate: stDate,
              enDate: enDate,
            };
            return combineLatest([
              this.activityService.getActivities(filters),
              this.freeText$,
            ]);
          })).subscribe(([data, freeText]: [Activity[], string]) => {
            this.dataSource = new MatTableDataSource(data);
            if (this.dataSource.data && freeText) {
              this.dataSource.filter = freeText.trim().toLowerCase();
            }

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          });
  }
  disabledPersonalReq(event: MatCheckboxChange) {
    if (event.checked) {
      this.PersonalRequest$.next(false);
      this.settings.get('PersonalRequest').disable();
    } else {
      this.PersonalRequest$.next(true);
      this.settings.get('PersonalRequest').enable();
    }
  }

  changeTime(text) {
    const index = this.times.indexOf(text.target.innerHTML);
    this.timesText = this.times[index === this.times.length - 1 ? 0 : index + 1];
    text.target.innerHTML = this.timesText;
  }
  ChangeSendingType(event: MatSlideToggleChange) {
    this.sendingType = event.checked ? 1 : 0;
  }

  openJBI(row: Activity) {
    console.log(row);
    const dialogRef = this.dialog.open(ListDialogComponent, {
      data: row.JBIlist
    });

    dialogRef.afterClosed().subscribe();
  }

  stopButton(button) {
    if (this.stopButton$.value === button) {
      this.stopButton$.next(null);
    } else {
      this.stopButton$.next(button);
    }

  }
  // setDateFilters() {
  //   this.filters.get('fromDt').markAsDirty();
  //   this.filters
  //     .get('fromDt')
  //     .patchValue(
  //       new Date(
  //         new Date(
  //           new Date(new Date().toLocaleDateString('en-US')).setDate(0)
  //         ).setDate(1)
  //       )
  //     );
  //   this.filters.get('toDt').markAsDirty();
  //   this.filters
  //     .get('toDt')
  //     .patchValue(new Date(new Date().toLocaleDateString('en-US')));
  // }
  public SetDataSource() {
    this.activityService.getActivities().subscribe(activities => {
      this.dataSource = new MatTableDataSource<Activity>(activities);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }



  close() {
    const a = confirm('Close without saving changes?');
    if (a) {
      this.sidenav.toggle();
      this.resetSideBar();
    }
  }

  resetSideBar() {
    this.textBoxList.length = 0; // Remove all the elements from the array
    this.indexItem = 0;
    // this.addTextBox();
    this.stopButton$.next(null);
    this.settings.reset();
    this.settings.get('Button1').setValue('')
    this.settings.get('PersonalRequest').setValue('Dear');
    this.sendingType = 0;
    this.PersonalRequest$.next(true);
    this.stopButton$.next(null);
    this.PerosnList.length = 0;
    this.timesText = 'minutes';

    //add new item to textBoxList
    //reset all toggle slide on dom

    this.sendingTypeId.checked = false;
    this.addButtonsId.checked = false;
  }

  save() {
    const newActivity: Activity = {
      ActivityTitle: this.settings.get('ActivityTitle').value,
      SendingType: this.sendingType,
      Buttons: [this.settings.get('Button1').value, this.settings.get('Button2').value, this.settings.get('Button3').value],
      PersonalRequest: this.PersonalRequest$.value,
      JBIlist: this.PerosnList,
      TextBoxList: [...this.textBoxList],
      TrackMail: this.settings.get('TrackEmails').value
    };


    if (!this.disabledCompany && this.settings.get('Company').value !== 0) {
      newActivity.Company = this.settings.get('Company').value;
    }
    if (this.PersonalRequest$.value) {
      if (this.settings.get('PersonalRequest').value !== '') {
        newActivity.PersonalRequestText = this.settings.get('PersonalRequest').value;
      } else {
        newActivity.PersonalRequest = false;
      }
    }
    if (this.sendingType === 1) {
      newActivity.MessagesPerPerson = this.settings.get('MessagesPerPerson').value;
      newActivity.ButtonToStopSend = this.stopButton$.value - 1;
      newActivity.PeriodBetweenSendingType = this.times.indexOf(this.timesText);
      newActivity.PeriodBetweenSending = this.settings.get('PeriodBetweenSending').value;
    }

    this.activityService.addNewActivity(newActivity).subscribe(res => {
      if (res.rc === 0) {
        this.sidenav.toggle();
        this.resetSideBar();
        this.appService.openSnanckBar('Activity created successfuly!', HorizontalPosition.center, VerticalPosition.bottom);
      } else {
        // open dialog with error!
      }
    });

  }

  addButtons(event: MatSlideToggleChange) {
    this.showButtons = event.checked;
    if (!this.showButtons) {
      this.settings.get('Button1').setValue('');
      this.settings.get('Button2').setValue('');
      this.settings.get('Button3').setValue('');
    }
  }

  openPersonsList() {
    const dialogRef = this.dialog.open(AddPeopleDialogComponent);

    dialogRef.afterClosed().subscribe((result: Customer[]) => {
      this.PerosnList = result;
    });
  }


  addActivity() {
    const dialogRef = this.dialog.open(TemplatesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      let TextBoxNum = 1;
        this.activityService.getTemplates().subscribe((res: Templates[]) => {
          debugger
          let temp = res.find((x) => x.TemplateId === result);
          if(temp){
            TextBoxNum=temp.TextBoxNum;
          }
          for (let i = 1; i <= TextBoxNum; i++) {
            this.addTextBox();
          }
          this.sidenav.toggle();

        });
      
     
    });
  }


  // -------Filters-------

  onFreeTextChanged(event) {
    this.freeText$.next(event.target.value);
    debugger
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  clearFilters() {
    this.selectedCompany$.next(null);
    this.freeText$.next(null);
    this.stDate$.next('01-01-2019');
    this.enDate$.next(new Date().toLocaleDateString());
    this.freeText = null;
    this.filters.markAsDirty();
    this.filters.reset();
  }

  dateChanged(start: boolean, date: string) {
    start ? this.stDate$.next(date) : this.enDate$.next(date);
  }

  companyChanged(company: string) {
    this.selectedCompany$.next(Number(company));
  }

  // -------TextBox-------
  addTextBox() {
    const textBox: TextBox = { boxId: ++this.indexItem, text: '', color: '#000000', fontSize: 10, bold: false };
    this.textBoxList.push(textBox);
  }
  removeTextBox(boxId) {
    this.textBoxList = this.textBoxList.filter(obj => obj.boxId !== boxId);
  }

  updateTextBox(event) {
    console.log(event);
    this.textBoxList[this.textBoxList.findIndex(item => item.boxId === event.boxId)] = event;
  }
}
