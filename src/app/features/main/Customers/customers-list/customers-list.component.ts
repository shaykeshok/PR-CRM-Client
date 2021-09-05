import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../../../common/Customer.model';
import { IInputConfig } from 'src/app/common/input/input.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pipe, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { FormGroup } from '@angular/forms';

const ICONPATH = 'assets/icons/';

const FILTER: IInputConfig = {
  type: 'text',
  name: 'filter',
  label: 'Filter',
  formControl: 'filter',
  appearance: 'legacy',
  autocomplete: 'off'
};

// const DATA: Customer[] = [{
//   key: 1,
//   firstName: 'Shayke',
//   lastName: 'Shok',
//   facebook: 'https://www.facebook.com/shayke.shok',
//   linkedin: 'https://www.linkedin.com/in/shayke-shok-1a8480168/',
//   cellPhone: '054-4390155',
//   email: 'Shok.shayke@gmail.com'

// }, {
//   key: 2,
//   firstName: 'Shira',
//   lastName: 'Shok',
//   facebook: 'https://www.facebook.com/Shira.shok',
//   linkedin: 'https://www.linkedin.com/in/Shira-shok-1a8480168/',
//   cellPhone: '058-6817111',
//   email: 'Shok.Shira@gmail.com'
// }
//   , {
//   key: 3,
//   firstName: 'Yair',
//   lastName: 'Shok',
//   facebook: 'https://www.facebook.com/Yair.shok',
//   linkedin: 'https://www.linkedin.com/in/Yair-shok-1a8480168/',
//   cellPhone: '058-6817111',
//   email: 'Shok.Yair@gmail.com'
// }
//   , {
//   key: 4,
//   firstName: 'Neta',
//   lastName: 'Shok',
//   facebook: 'https://www.facebook.com/Neta.shok',
//   linkedin: 'https://www.linkedin.com/in/Neta-shok-1a8480168/',
//   cellPhone: '058-6817111',
//   email: 'Shok.Neta@gmail.com'
// }
//   , {
//   key: 5,
//   firstName: 'Yackov',
//   lastName: 'Shok',
//   facebook: 'https://www.facebook.com/Yackov.shok',
//   linkedin: 'https://www.linkedin.com/in/Yackov-shok-1a8480168/',
//   cellPhone: '058-6817111',
//   email: 'Shok.Yackov@gmail.com'
// }
//   , {
//   key: 6,
//   firstName: 'Bilha',
//   lastName: 'Shok',
//   facebook: 'https://www.facebook.com/Bilha.shok',
//   linkedin: 'https://www.linkedin.com/in/Bilha-shok-1a8480168/',
//   cellPhone: '0586817111',
//   email: 'Shok.Bilha@gmail.com'
// }];

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  filterInput = FILTER;
  iconPath = ICONPATH;

  displayedColumns: string[] = ['key', 'firstname', 'lastname', 'garbage'];
  dataSource: MatTableDataSource<Customer>;
  destroy$ = new Subject();
  customers$ = this.customerService.customersList$;

  customersList: Customer[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.customerService.getAllCustomers();
    this.SetDataSource();
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  public SetDataSource() {

    this.customers$.pipe(
      takeUntil(this.destroy$)

    ).subscribe((customers: Customer[]) => {
      this.customersList = customers;
      this.dataSource = new MatTableDataSource<Customer>(customers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customerSelected(customerId: number) {
    console.log('customerId: ' + customerId);
    const customer: Customer = this.customersList.find(el => el.Moneln === customerId);
    this.customerService.setCurrentCustomer(customer);
    console.log('current:' + this.customerService.currentCustomer);

  }
  deleteCustomer(customerId: number) {

    console.log('delete:' + customerId);

    this.customersList.forEach((item, index) => {
      if (item.Moneln === customerId) { this.customersList.splice(index, 1); }
    });
    this.dataSource = new MatTableDataSource<Customer>(this.customersList);
    const customer: Customer = this.customersList.find(el => el.Moneln === 0);
    console.log(customer);

    this.customerService.setCurrentCustomer(customer);
    this.customerService.deleteCustomer(customerId);
  }

  addCustomer() {
    const dialogRef = this.dialog.open(CustomerDetailsComponent, {
      width: '810px',
      height: '527px',
      panelClass: 'dialog-'
    });

    return dialogRef.afterClosed().subscribe((data: FormGroup) => {
      console.log('data from modal: ', data);
      console.log('firstname: ', data.controls.FirstName.value);
      const newCustomer: Customer = {
        Moneln: -1182,
        FirstName: data.controls.FirstName.value,
        LastName: data.controls.LastName.value,
        email: data.controls.Email.value,
        linkedin: data.controls.Linkedin.value,
        facebook: data.controls.Facebook.value,
        cellPhone: data.controls.Phone.value
      };
      this.customersList.push(newCustomer);
      this.dataSource = new MatTableDataSource<Customer>(this.customersList);


      this.customerService.setCurrentCustomer(newCustomer);
      this.customerService.addNewCustomer(newCustomer);
    });
  }
}
