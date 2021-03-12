import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './features/main/dashboard/dashboard.component';
import { MainComponent } from './features/main/main.component';
import { LoginComponent } from './layout/login/login.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'main', component: MainComponent, children: [
          { path: 'dashboard', component: DashboardComponent},
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
