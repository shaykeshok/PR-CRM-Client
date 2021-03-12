import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';
export class EprValidator {
    static get ValidateName(): ValidatorFn {
        return Validators.pattern('^[a-zA-Zא-ת\\s]+$');
    }
    static get ValidatePhone(): ValidatorFn[] {
        return [
            Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'),
            Validators.maxLength(15),
            Validators.minLength(8),
        ];
    }
    static get ValidatePassword(): ValidatorFn[] {
        return [
            Validators.required,
            Validators.minLength(4)
        ];
    }
    static get ValidateNoUniqueCharacters(): ValidatorFn {
        return Validators.pattern('^[0-9a-zA-Z\\s]+$');
    }
    static get ValidateMoney(): ValidatorFn {
        return Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$');
    }
    static get ValidateUrl(): ValidatorFn {
        const regex = new RegExp('(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z]{2,6})([\\/\\w\\.-]*)*\\/?');
        // console.log(regex);

        // return Validators.pattern('/(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z]{2,6})([\\/\\w\\.-]*)*\\/?/g');
        return Validators.pattern(regex);
    }
    static get ValidateTz(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!isValidIsraeliID(control.value)) {
                return { validTz: true };
            }
            return null;
        }
    }
}

function isValidIsraeliID(id: string): boolean {
    id = String(id).trim();
    if (id.length > 9 || id.length < 5 || Number(id)) {
        return false;
    }

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id;

    return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
}
