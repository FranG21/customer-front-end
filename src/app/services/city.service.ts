import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  url = 'http://localhost:4000/api/city/';

  constructor(private http: HttpClient) {}

  getCities(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}
