import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Customer } from 'src/app/common/Customer.model';
import { IInputConfig } from 'src/app/common/input/input.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  inputs: IInputConfig[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      formControl: 'firstName',
      appearance: 'legacy',
      autocomplete: 'off',
      validators: [Validators.required]
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      formControl: 'lastName',
      appearance: 'legacy',
      autocomplete: 'off',
      validators: [Validators.required]
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      formControl: 'email',
      appearance: 'legacy',
      autocomplete: 'off'
    },
    {
      type: 'text',
      name: 'facebook',
      label: 'Facebook',
      formControl: 'facebook',
      appearance: 'legacy',
      autocomplete: 'off'
    },
    {
      type: 'text',
      name: 'linkedin',
      label: 'Linkedin',
      formControl: 'linkedin',
      appearance: 'legacy',
      autocomplete: 'off'
    },
    {
      type: 'tel',
      name: 'cellphone',
      label: 'Cellphone',
      formControl: 'cellPhone',
      appearance: 'legacy',
      autocomplete: 'off',
      pattern: '05[2,4,5,8]{1}-[0-9]{7}',
      hint: 'Foramt: 055-5555555'
    },

  ];
  _customer: number;
  private _currentCustomer$ = new ReplaySubject<Customer>(0);
  public get currentCustomer$(): Observable<Customer> {
    return this._currentCustomer$.asObservable();
  }
  public get currentCustomer(): number {
    return this._customer;
  }

  setCurrentCustomer(customer: Customer) {

    if (customer) {
      this._customer = customer.key;
    }
    this._currentCustomer$.next(customer);

  }

  constructor(private fb: FormBuilder) {
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
}
