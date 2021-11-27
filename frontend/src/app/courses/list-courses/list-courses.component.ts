import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/Course';
import { CourseService } from '../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  getCourses(id: number) {
    this.courseService.getCourses().subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }

  showCourse(id: number) {
    this.courseService.getCourse(id).subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }
}

