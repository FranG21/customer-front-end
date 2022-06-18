import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  url = 'http://localhost:4000/api/address/';

  constructor(private http: HttpClient) {}

  createAddress(address: Address): Observable<any> {
    return this.http.post(this.url, address);
  }

  getAddresses(id: string, htppHeaders: HttpHeaders): Observable<any> {
    return this.http.get(this.url + 'customer/' + id, {
      headers: htppHeaders,
      observe: 'response',
    });
  }

  getAddress(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editAddress(id: string, address: Address): Observable<any> {
    return this.http.patch(this.url + id, address);
  }

  removeAddress(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
