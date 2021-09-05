import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './features/main/Customers/customers.component';
import { DashboardComponent } from './features/main/dashboard/dashboard.component';
import { MainComponent } from './features/main/main.component';
import { ReportsComponent } from './features/main/reports/reports.component';
import { ActivitiesComponent } from './features/main/activities/activities.component';
import { LoginComponent } from './layout/login/login.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'main', component: MainComponent, children: [
          { path: 'dashboard', component: DashboardComponent},
          { path: 'reports', component: ReportsComponent},
          { path: 'customers', component: CustomersComponent},
          { path: 'activities', component: ActivitiesComponent},

          // { path: 'invoices', component: InvoiceListComponent },
          // { path: 'reports', component: ReportListComponent },

      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
