import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  url = 'http://localhost:4000/api/state/';

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(this.url);
  }
}
