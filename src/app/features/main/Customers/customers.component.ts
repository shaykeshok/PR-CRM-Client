import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  _currentCustomer: number;
  currentCustomer = this.customerService.currentCustomer$.subscribe(res => {
    console.log('current:');
    console.log(res);
    this._currentCustomer = res.Moneln;
  }
  );
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    console.log(this._currentCustomer);
  }

}
