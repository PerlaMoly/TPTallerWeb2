import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/Course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {
  courses!: Course[];

  constructor(private courseService: CourseService) {}
 
  ngOnInit(): void {

    this.courseService.getCourses().subscribe(
      (res) => (this.courses = res),
      (err) => console.log(err)
    );
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }
}

