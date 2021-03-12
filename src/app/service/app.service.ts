import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../common/dialog/dialog.component';
import { DialogData } from '../common/dialog/dialog.model';
import { IUserResponse } from '../common/user.model';
const API = environment.api;
const ERROR_BODY = 'אנו מצטערים אבל משהו השתבש, אנא פנה לתמיכה';
const ERROR_TITLE = '😯אוי ואבוי';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  
  public showNav = false;

  
  
  version = 'version 1.0.0';

  public get Token(): string {
    return '';
    // return this._userService.Token;
  }

  constructor( 
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,

    ) { }

  post(url: string, body?: any): Observable<any> {
    return this.http.post(API + url, body);
  }
  connect(res: IUserResponse) {
  }
  reconnect() {
  }
  loaderOff() {
  }
  loaderOn(msg: string) { }

  public navTo(route = 'home', saveLastNav: boolean = true, params = {}) {
    if (saveLastNav) {

      // this.lastNav = this.router.url;
    }
    // console.log('lastNav',
    //   this.lastNav
    // );
    this.router.navigate([route], { queryParams: params, queryParamsHandling: 'merge' });

  }
  openDialog(data: DialogData) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: data.width ? data.width : '810px',
      height: data.height ? data.height : '527px',
      data,
      panelClass: 'dialog-' + data.type
    });

    return dialogRef.afterClosed();
  }

  public error(error, dialog: DialogData = { body: ERROR_BODY, title: ERROR_TITLE, type: 'error' }) {
    // this.logger.error(error, this.Email);
    this.loaderOff();
    return this.openDialog(dialog);
  }
}
