import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../../common/Customer.model';
import { IInputConfig } from 'src/app/common/input/input.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';

const ICONPATH = 'assets/icons/';

const FILTER: IInputConfig = {
  type: 'text',
  name: 'filter',
  label: 'Filter',
  formControl: 'filter',
  appearance: 'legacy',
  autocomplete: 'off'
};

const DATA: Customer[] = [{
  key: 1,
  firstName: 'Shayke',
  lastName: 'Shok',
  facebook: 'https://www.facebook.com/shayke.shok',
  linkedin: 'https://www.linkedin.com/in/shayke-shok-1a8480168/',
  cellPhone: '054-4390155',
  email: 'Shok.shayke@gmail.com'

}, {
  key: 2,
  firstName: 'Shira',
  lastName: 'Shok',
  facebook: 'https://www.facebook.com/Shira.shok',
  linkedin: 'https://www.linkedin.com/in/Shira-shok-1a8480168/',
  cellPhone: '058-6817111',
  email: 'Shok.Shira@gmail.com'
}
  , {
  key: 3,
  firstName: 'Yair',
  lastName: 'Shok',
  facebook: 'https://www.facebook.com/Yair.shok',
  linkedin: 'https://www.linkedin.com/in/Yair-shok-1a8480168/',
  cellPhone: '058-6817111',
  email: 'Shok.Yair@gmail.com'
}
  , {
  key: 4,
  firstName: 'Neta',
  lastName: 'Shok',
  facebook: 'https://www.facebook.com/Neta.shok',
  linkedin: 'https://www.linkedin.com/in/Neta-shok-1a8480168/',
  cellPhone: '058-6817111',
  email: 'Shok.Neta@gmail.com'
}
  , {
  key: 5,
  firstName: 'Yackov',
  lastName: 'Shok',
  facebook: 'https://www.facebook.com/Yackov.shok',
  linkedin: 'https://www.linkedin.com/in/Yackov-shok-1a8480168/',
  cellPhone: '058-6817111',
  email: 'Shok.Yackov@gmail.com'
}
  , {
  key: 6,
  firstName: 'Bilha',
  lastName: 'Shok',
  facebook: 'https://www.facebook.com/Bilha.shok',
  linkedin: 'https://www.linkedin.com/in/Bilha-shok-1a8480168/',
  cellPhone: '0586817111',
  email: 'Shok.Bilha@gmail.com'
}];

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  filterInput = FILTER;
  iconPath = ICONPATH;

  displayedColumns: string[] = ['key', 'firstname', 'lastname', 'garbage'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.SetDataSource();
  }

  public SetDataSource() {

    //   this.reports$.pipe(
    //     takeUntil(this.destroy$)

    //   ).subscribe((categories: Category[]) => {
    this.dataSource = new MatTableDataSource<Customer>(DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //     // this.cdr.detectChanges();
    //   });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customerSelected(customerId: number) {
    console.log(customerId);
    const customer: Customer = DATA.find(el => el.key === customerId);
    this.customerService.setCurrentCustomer(customer);
    console.log('current:' + this.customerService.currentCustomer);

  }
  deleteCustomer(customerId: number) {

    console.log('delete:' + customerId);

    DATA.forEach((item, index) => {
      if (item.key === customerId) { DATA.splice(index, 1); }
    });
    this.dataSource = new MatTableDataSource<Customer>(DATA);
    const customer: Customer = DATA.find(el => el.key === 0);
    console.log(customer);
    
    this.customerService.setCurrentCustomer(customer);
  }
}
