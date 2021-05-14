import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BaseComponent } from '../base.component';
import { ISelectItem } from './select.model';

@Component({
  selector: 'PR-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
  ]
})
export class SelectComponent extends BaseComponent implements OnInit,ControlValueAccessor {
  @Input() options: ISelectItem[];
  @Input() label = 'Choose';
  @Input() class = 'header';
  @Input() none = false;  
  control = new FormControl();
  clear = 'ללא';
  choose = 'Choose';
  public get value(): any {
    return this.control.value;
  }
  public set value(v: any) {
    this.control.setValue(v);
  }
  constructor() {
    super('select');
  }

  ngOnInit() {
    this.control.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged(),
      map(val => {
        this.onChangefn(val);
      })
    ).subscribe();
  }
  onChangefn = (_) => _;

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
  writeValue(obj: any): void {
    this.value = obj;
  }
}
