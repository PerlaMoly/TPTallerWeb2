import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  BASE_URL: string = 'http://localhost:3000';
  data:any;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.BASE_URL + '/courses');
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>('${this.BASE_URL}/courses/show/$id');
  }

  //20211125
  getFilterCourses(name: string): Observable<Course[]> {
    return this.http.get<Course[]>(this.BASE_URL + '/courses/filter/' + name);
  }

  //20211125
  getFilterCoursesCategory(category: string): Observable<Course[]> {
      return this.http.get<Course[]>(this.BASE_URL + '/courses/category/' + category);
   }
}
