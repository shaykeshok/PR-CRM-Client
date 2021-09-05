import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Url } from '../common/common.model';
import { Customer } from '../common/Customer.model';
import { CustomersFilters } from '../common/interfaces.interface';
import { ApiResponse, JBIResponse } from '../common/response.model';
import { AppService } from './app.service';


const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private httpClient: HttpClient,
    private appService: AppService) { }


  getCustomers(filters?: CustomersFilters): Observable<Customer[]> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.append(key, filters[key].value);
        }
      });
    }
    return this.httpClient
      .get<JBIResponse>(`${API + "/" + Url.customer}/GetFilterJBIList`, { params })
      .pipe(map((res: JBIResponse) => res.JBI));
  }
}
