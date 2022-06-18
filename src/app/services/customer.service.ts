import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = 'http://localhost:4000/api/customer/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(this.url);
  }

  createCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.url, customer);
  }

  getCustomer(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editCustomer(id: string, customer: Customer): Observable<any> {
    return this.http.patch(this.url + id, customer);
  }

  removeCustomer(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
