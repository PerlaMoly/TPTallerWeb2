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
    console.log("se llama a getCourses");
    return this.http.get<Course[]>(this.BASE_URL + '/courses');
  }

  getCourse(id: string): Observable<Course> {
    console.log("se llama a getCourse");
    return this.http.get<Course>('${this.BASE_URL}/courses/show/$id');
  }

  //20211125
  getFilterCourses(name: string): Observable<Course> {
    console.log("se llama a getFilterCourses");
    return this.http.get<Course>('${this.BASE_URL}/courses/filter/$name');
  }

}
