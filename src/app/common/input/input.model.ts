import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
export interface IListItem {
    value: any;
    label: string;
    icon?: string;
}
export interface IInputConfig {
    type: 'text' | 'select' | 'password' | 'email' | 'number' | 'button-group' | 'autocomplete' | 'tel';
    label?: string;
    formControl: string;
    name?: string;
    placeholder?: string;
    validators?: ValidatorFn[];
    hint?: string;
    api?: string;
    error?: string;
    autocomplete?: 'on' | 'off';
    value?: any;
    list?: IListItem[];
    asyncList?: Observable<IListItem[]>;
    appearance: 'legacy' | 'outline' | 'standard' | 'none' | 'fill';
    pattern?: string;

}


