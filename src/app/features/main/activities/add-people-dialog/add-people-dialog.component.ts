import { Injector, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, pipe, combineLatest, BehaviorSubject } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Irole, Roles } from 'src/app/common/common.model';
import { Customer } from 'src/app/common/Customer.model';
import { CustomersFilters } from 'src/app/common/interfaces.interface';
import { ActivityService } from 'src/app/service/activity.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-people-dialog',
  templateUrl: './add-people-dialog.component.html',
  styleUrls: ['./add-people-dialog.component.scss']
})
export class AddPeopleDialogComponent implements OnInit {
  roles: Irole[] = Roles;
  data$: Observable<Customer[]>;
  selectedValue: string;
  selectedRole$ = new BehaviorSubject<number>(null);
  searchInput$ = new BehaviorSubject<string>(null);
  currentList: Customer[];
  private dialogRef = null;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  @Input() selectedEmployees = [];
  @ViewChild('searchInput', { static: true }) searchInput: any;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  constructor(
    private activityService: ActivityService,
    private injector: Injector,

    private _snackBar: MatSnackBar,
  ) { this.dialogRef = injector.get(MatDialogRef, null); }

  data: {
    staff?: [];
    cert?: boolean;
    catalog?: boolean;
    addedit?: boolean;
    maxParticipant?: string;
    linkType?: string;
    mone?: number;
    isTemplate: boolean;
  };

  ngOnInit() {
    const customers$ = combineLatest([
      this.selectedRole$,

    ]).pipe(
      debounceTime(150),
      switchMap(
        ([role]: [
          number,
        ]) => {
          const customersFilters: CustomersFilters = {
            role,
          };
          return this.activityService.getCustomers(customersFilters);
        }
      )
    );

    this.data$ = combineLatest([customers$, this.searchInput$]).pipe(
      map(([jbis, search]: [Customer[], string]) => {
        if (search) {
          const list = jbis
            .filter(
              (x) => x.FirstName.toLowerCase().includes(search.toLowerCase()) || x.LastName.toLowerCase().includes(search.toLowerCase())
            )
            .concat();
          this.currentList = list.concat();
          return list;
        } else {
          const list = jbis.concat();
          this.currentList = list.concat();
          return list;
        }
      })
    );
  }
  toggleRelevant($event) {

  }

  checkIfExists(customer: Customer) {
    return !!this.selectedEmployees.find((s) => s.Moneln === customer.Moneln) ? true : false;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  clickAdd(arg: Customer) {
    if (this.checkIfExists(arg)) {
      this.openSnackBar(arg.FirstName + ' ' + arg.LastName + ' is already in this group!', 'Got it');
    } else {
      this.selectedEmployees.push(arg);
    }
  }
  addAll() {
    if (!confirm(`Add all remaining members to this group?`)) { return; }
    this.currentList.map((u) => {
      if (!this.selectedEmployees.find((s) => s.Moneln === u.Moneln)) {
        this.selectedEmployees.push(u);
      }
    });
  }
  clickRemove(jbi: Customer) {
    if (!confirm(`Remove ${jbi.FirstName + ' ' + jbi.LastName} from this group?`)) { return; }
    this.selectedEmployees = this.removeItemOnce(this.selectedEmployees, jbi);
  }

  removeItemOnce(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  removeAllUsers() {
    if (!confirm(`Are you sure you want to remove ALL of the members?`)) { return; }
    this.selectedEmployees = [];
  }
  close() {
    if (confirm('Close without saving changes?')) {
      this.dialogRef.close();
    }
  }

  save() {
    this.dialogRef.close(this.selectedEmployees);
  }
  clearFilters() {
    this.searchInput.nativeElement.value = '';
    this.selectedRole$.next(null);
    this.searchInput$.next(null);
  }

  search(event) {
    this.searchInput$.next(event.target.value);
  }

  optionSelected(event: any, prop: string) {
    switch (prop) {
      case 'Role': {
        this.selectedRole$.next(event);
        break;
      }
    }
  }
}
