import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  url = 'http://localhost:4000/api/logs/';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any> {
    return this.http.get(this.url);
  }
}
