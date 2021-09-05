import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  edit = false;
  rForm = this.customerService.getForm();
  btn = {
    edit: 'Edit Customer',
    save: 'Save',
    cancel: 'Cancel'
  };

  @Input() modalComponent = true;
  public get inputs() {
    return this.customerService.inputs;
  }


  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>) { }




  ngOnInit() {
    if (!this.modalComponent) {

      this.customerService.currentCustomer$.subscribe(res => {
        this.rForm.patchValue({ ...res });
        console.log(res);
      });
    }
  }

  save() {
    this.customerService.UpdateCustomer(this.customerService.currentCustomer, this.rForm);
  }

  addNewCustomer() {

  }
  cancel() {
    this.dialogRef.close();
  }

}
