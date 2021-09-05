import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export class Url {
    static login = 'user/login';
    static reconnect = 'user';
    static customer = 'JBI';
    static data = 'data';
    static report = 'report';
    static invoice = 'invoice';

}

export class VerticalPosition {
    static bottom: MatSnackBarVerticalPosition = 'bottom';
    static top: MatSnackBarVerticalPosition = 'top';
}
export class HorizontalPosition {
    static start: MatSnackBarHorizontalPosition = 'start';
    static center: MatSnackBarHorizontalPosition = 'center';
    static end: MatSnackBarHorizontalPosition = 'end';
    static left: MatSnackBarHorizontalPosition = 'left';
    static right: MatSnackBarHorizontalPosition = 'right';

}
export class Constans {
    static SUCCESSCODE = 0;
    static ERRORCODE = 99;
    static IPAD_WIDTH = '(max-width: 834px)';
    static IPAD_WIDTH_LANDSCAPE = '(max-width: 1194px)';
    static MOBILE_WIDTH = '(max-width: 430px)';
    static MOBILE_WIDTH_PX = 450;
    static TABLET_WIDTH_PX = 834;
    static DESKTOP_WIDTH_PX = 1024;


}
export class OrderStatus {
    static APPROVED_BY_ME = -1;
    static APPROVE = 14;
    static WAIT = 1;
    static COMPLETEDETAILS = 2;
    static DECLINE = 103;

}

export class OrderStatusActions {
    static APPROVED_BY_ME = -1;
    static APPROVE = 0;
    static WAIT = 241;
    static COMPLETEDETAILS = 242;
    static DECLINE = 103;

}
export const IMGPATH = 'assets/Images/';
export interface Ilist {
    key: number;
    value: string;
}

export interface Irole {
    key: number;
    value: string;
}

export const Roles: Irole[] = [{ key: 1, value: 'Reporter' }, { key: 2, value: 'news reporter' }]


export function generateUrlParams(params: any, names: string[]): string {
    if (!params) {
        return '';
    }
    let url = '?';

    names.forEach(n => {
        const val = params[n];
        if (val) {
            url += `${n}=${val}&`;
        }
    });
    const str = url.substring(0, url.length - 1);
    console.log(str);

    return str;
}
