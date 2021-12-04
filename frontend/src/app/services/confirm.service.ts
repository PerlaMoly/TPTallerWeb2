import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  confirmUser(token: string): Observable<String> {
    return this.http.get<String>(this.BASE_URL + '/auth/' + token);
  }
}
