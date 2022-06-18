import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:4000/api/users/login';

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    return this.http.post(this.url, login);
  }
}
