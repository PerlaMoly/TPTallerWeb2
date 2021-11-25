import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.BASE_URL + '/courses');
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>('${this.BASE_URL}/courses/show/$id');
  }
}
