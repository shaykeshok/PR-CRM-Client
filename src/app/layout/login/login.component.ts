import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
import { AppService } from '../../service/app.service';
import { IUserResponse } from '../../common/user.model';
import { Constans } from '../../common/common.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = {
    title: 'האישור האישי',
    welcome: 'ברוכים הבאים'
  };
  public get inputs() {
    return this.fs.inputs;
  }
  rForm = this.fs.getForm();
  btn = {
    submit: 'כניסה',
    forgot: 'שכחתם סיסמה?'
  };
  public get version() {
    return this.app.version;
  }
  constructor(private fs: FormService, private app: AppService) { }

  ngOnInit() {

    this.checkIfConnected();
    this.app.loaderOff();
  }
  checkIfConnected() {

    if (this.app.Token) {
      this.app.reconnect();
    }
  }
  save(form) {
    console.log(form);
    console.log('login');
    if (this.rForm.valid) {
      this.app.loaderOn('מתחבר...');
      this.app.post('user', form).subscribe((res: IUserResponse) => {
        const { rc, body, title } = res;
        debugger

        if (rc === Constans.SUCCESSCODE) {
          this.app.connect(res);
          this.app.navTo('main/dashboard', false);
        } else {
          console.log('rc !== Constans.SUCCESSCODE');
          this.app.openDialog({ title, body, type: 'error' }).subscribe(() => this.app.loaderOff());
        }
      },
        error => {
          this.app.error(error);
        });

    }
  }

}
