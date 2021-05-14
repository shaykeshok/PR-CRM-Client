import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
// export interface INav {
//   label: string;
//   // action: TSearchOption;
//   icon?: string;
//   // count?: Observable<number>;
// }
export interface INav {
  label: string;
  action?: string;
  icon?: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() isMobile = false;
  iconPath = 'assets/icons/';
  public get version(): string {
    return this.app.version;
  }
  public get navs(): INav[] {
    return this._navs;
  }
  private _navs: INav[] = [
    {
      label: 'Dashboard',
      action: 'dashboard',
      icon: 'dashboard.png'
    }, {
      label: 'Templates',
      action: 'templates',
      icon: 'templates.png'
    }, {
      label: 'Reports',
      action: 'reports',
      icon: 'reports.png'
    }, {
      label: 'Customers',
      action: 'customers',
      icon: 'customer.png'
    }
  ];

  btn = {
    setting: 'settings',
    signout: 'signout',
  };
  constructor(private app: AppService) { }
  ngOnInit() {
  }

  signout(){}
}
