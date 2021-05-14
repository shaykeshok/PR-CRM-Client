import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsFeedsComponent } from './news-feeds/news-feeds.component';
import { EventsStatusListComponent } from './events-status-list/events-status-list.component';
import { EventStatusComponent } from './events-status-list/event-status/event-status.component';
import { SelectModule } from 'src/app/common/select/select.module';



@NgModule({
  declarations: [DashboardComponent, ChartsComponent, NewsFeedsComponent, EventsStatusListComponent, EventStatusComponent],
  imports: [
    CommonModule,
    MatTableModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    SelectModule
  ]
})
export class DashboardModule { }
