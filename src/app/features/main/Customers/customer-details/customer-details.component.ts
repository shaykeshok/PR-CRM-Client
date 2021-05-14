import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from 'src/app/common/input/input.component';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  edit: boolean = false;
  rForm = this.customerService.getForm();
  btn = {
    edit: 'Edit Customer',
    save: 'Save'
  };
  public get inputs() {
    return this.customerService.inputs;
  }


  constructor(private customerService: CustomerService) { }
  currentCustomer = this.customerService.currentCustomer$.subscribe(res => {
    this.rForm.patchValue({...res});
  }
  );

  ngOnInit() {
  }

  save() {
    // console.log('Valid?', form.valid); // true or false
    // console.log('Name', form.value.name);
    // console.log('Email', form.value.email);
    // console.log('Message', form.value.message);
    // console.log('input', this.input);
    
  }

}
