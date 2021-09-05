import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { HorizontalPosition, Url, VerticalPosition } from 'src/app/common/common.model';
import { Customer } from 'src/app/common/Customer.model';
import { IInputConfig } from 'src/app/common/input/input.model';
import { AppService } from 'src/app/service/app.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private fb: FormBuilder,
    private appService: AppService) {
  }
  inputs: IInputConfig[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      formControl: 'FirstName',
      appearance: 'legacy',
      autocomplete: 'off',
      validators: [Validators.required]
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      formControl: 'LastName',
      appearance: 'legacy',
      autocomplete: 'off',
      validators: [Validators.required]
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      formControl: 'Email',
      appearance: 'legacy',
      autocomplete: 'off'
    },
    {
      type: 'text',
      name: 'facebook',
      label: 'Facebook',
      formControl: 'Facebook',
      appearance: 'legacy',
      autocomplete: 'off'
    },
    {
      type: 'text',
      name: 'linkedin',
      label: 'Linkedin',
      formControl: 'Linkedin',
      appearance: 'legacy',
      autocomplete: 'off'
    },
    {
      type: 'tel',
      name: 'cellphone',
      label: 'Cellphone',
      formControl: 'Phone',
      appearance: 'legacy',
      autocomplete: 'off',
      pattern: '05[2,4,5,8]{1}-[0-9]{7}',
      hint: 'Foramt: 055-5555555'
    },

  ];
  _customer: number;
  _Customerslist: Customer[];
  public _customersList$ = new ReplaySubject<Customer[]>(1);
  public get customersList$(): Observable<Customer[]> {
    return this._customersList$.asObservable();
  }
  private _currentCustomer$ = new ReplaySubject<Customer>(0);
  public get currentCustomer$(): Observable<Customer> {
    return this._currentCustomer$.asObservable();
  }
  public get currentCustomer(): number {
    return this._customer;
  }

  setCurrentCustomer(customer: Customer) {

    if (customer) {
      this._customer = customer.Moneln;
    }
    this._currentCustomer$.next(customer);

  }


  getForm(): FormGroup {
    const rForm = this.fb.group({});
    this.inputs.forEach(a => {
      const control = new FormControl(a.value);
      control.setValidators(a.validators);
      rForm.addControl(a.formControl, control);
    });
    console.log(rForm.value);

    return rForm;

  }

  public getAllCustomers() {
    //this.loaderOn();
    this.appService.get(Url.customer).subscribe(res => {
      const { JBI: list, desc } = res;

      console.log('query', desc);
      //this.loaderOff();
      this._Customerslist = list;
      this._customersList$.next(list);

    }, error => {
      // this.error(error);
    });
  }

  public UpdateCustomer(id: number, rForm: FormGroup) {
    console.log('rForm:' + rForm.value);
    console.log('id:' + id);
    const CustomerToUpdate = {
      Moneln: id,
      FirstName: rForm.value.FirstName,
      LastName: rForm.value.LastName,
      Facebook: rForm.value.Facebook,
      Linkedin: rForm.value.Linkedin,
      Phone: rForm.value.Phone,
      Email: rForm.value.Email
    };
    this.appService.post(Url.customer + '/UpdateJbi', CustomerToUpdate).subscribe(res => {
      console.log(res);
      this.appService.openSnanckBar('Update Success!', HorizontalPosition.center, VerticalPosition.bottom);
      this.getAllCustomers();
    });

  }
  deleteCustomer(customerId: number) {
    this.appService.get(Url.customer + '/DeleteJbi/' + customerId).subscribe(res => {
      console.log(res);
      this.appService.openSnanckBar('Delete Success!', HorizontalPosition.center, VerticalPosition.bottom);
      this.getAllCustomers();
    });
  }

  addNewCustomer(newCustomer: Customer) {

    this.appService.post(Url.customer + '/AddNewJbi', newCustomer).subscribe(res => {
      console.log(res);
      this.appService.openSnanckBar('Add new customer success!', HorizontalPosition.center, VerticalPosition.bottom);
      this.getAllCustomers();
    });
  }
}
