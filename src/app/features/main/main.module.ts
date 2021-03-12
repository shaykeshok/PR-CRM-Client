import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ]
})
export class MainModule { }
