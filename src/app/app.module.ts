import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './layout/login/login.component';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from './common/input/input.module';
import { ButtonModule } from './common/button/button.module';
import { MainModule } from './features/main/main.module';
import { SelectModule } from './common/select/select.module';
import { ReportsModule } from './features/main/reports/reports.module';
import { CustomersModule } from './features/main/Customers/customers.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogModule } from './common/dialog/dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    MainModule,
    SelectModule,
    ReportsModule,
    CustomersModule,
    MatSnackBarModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
