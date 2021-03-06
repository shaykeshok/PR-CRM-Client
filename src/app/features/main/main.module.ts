import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ReportsModule } from './reports/reports.module';
import { TemplatesModule } from './templates/templates.module';
import { ActivitiesModule } from './activities/activities.module';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    DashboardModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    ReportsModule,
    TemplatesModule,
    ActivitiesModule
  ]
})
export class MainModule { }
