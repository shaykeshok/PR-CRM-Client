import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
    constructor(private name: string) {

    }
    public onDestroy$ = new Subject();
    ngOnDestroy(): void {
        console.log('BaseComponent ' + this.name);

        this.onDestroy$.next();
    }


}