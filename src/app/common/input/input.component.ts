import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { IInputConfig, IListItem } from './input.model';
import { takeUntil, map, debounceTime, filter, tap, switchMap, finalize, distinctUntilChanged } from 'rxjs/operators';
import { BaseComponent } from './../../common/base.component';

import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'PR-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
  ]
})
export class InputComponent extends BaseComponent implements OnInit, ControlValueAccessor {
  @Input() config: IInputConfig;
  isLoading = false;
  noResults = false;
  autoCompleteControl = new FormControl();
  control = new FormControl();
  listFromServer: IListItem[] = [];
  label = {
    is: 'is',
    required: 'required',
    noResults: 'no results'
  };
  error = {
    email: 'A valid email address must be entered',
    name: 'Only valid characters should be entered',
    error: '',
    tz: 'Invalid ID',
    minLength: 'Minimum characters '

  };
  required = false;
  public get Errors(): ValidationErrors {
    const errors = this.control ? this.control.errors : undefined;
    return errors;
  }
  public get value(): any {
    return this.control.value;
  }
  public set value(v: any) {
    if (this.config.type === 'autocomplete') {
      if (!v) {
        this.autoCompleteControl.reset();
      }
    }
    this.control.setValue(v);
  }

  constructor(private http: HttpClient) {
    super('input');
  }
  setControl() {
    const _validators = this.config.validators || [];
    this.required = _validators.indexOf(Validators.required) > -1;
    this.control.setValidators(_validators);
  }
  ngOnInit() {
    this.setControl();
    switch (this.config.type) {
      case 'autocomplete':
        this.registerAutoCompleteChange();

        break;

      default:

        this.registerInputChange();
        break;

    }
  }
  registerInputChange() {
    this.control.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      map(value => this.onChangefn(value))
    ).subscribe();

  }
  registerAutoCompleteChange() {
    this.autoCompleteControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(400),
      distinctUntilChanged(),
      filter(v => !!v && v.length > 1),
      tap(() => {
        this.isLoading = true;
        this.noResults = false;
      }),
      switchMap(value =>
        this.http.get(this.config.api + value)

          .pipe(finalize(() => this.isLoading = false)))
    )
      .subscribe((res: IListItem[]) => {
        this.listFromServer = res;
        this.noResults = !res || !res.length;
      },
        error => {
          // this.logger.error(error);
        });

  }
  onBlurAutoComplete(val?: any) {
    if (!val) {
      this.onChangefn(undefined);
    }
  }
  btnClick(value) {
    this.control.setValue(value);
  }
  autoCompleteClick(value) {
    this.onChangefn(value);
  }


  //#region CUSTOMER INPUT
  onChangefn = (_) => _;
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(onChange: (value: any) => void) {
    this.onChangefn = onChange;

  }
  registerOnTouched(): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {

      this.control.enable();
    }
  }


  //#endregion


}
