import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IInputConfig } from './../../common/input/input.model';
import { EprValidator } from './../../common/public-api';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  inputs: IInputConfig[] = [
    {
      type: 'number',
      name: 'userId',
      label: 'תעודת זהות',
      formControl: 'userId',
      appearance: 'legacy',
      autocomplete: 'off',
      validators: [Validators.required]
    },
    {
      formControl: 'pass',
      name: 'pass',
      type: 'password',
      label: 'סיסמה',
      appearance: 'legacy',
      validators: EprValidator.ValidatePassword
    },

  ];
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
