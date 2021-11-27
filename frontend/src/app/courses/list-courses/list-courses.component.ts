import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/Course';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; //20211125

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {
  courses!: Course[];
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterIn: any) => {
      //20211125
      const { params } = parameterIn;
      //      console.log(parameterIn);
      if (params.category) {
        //20211125
        this.courseService.getFilterCoursesCategory(params.category).subscribe(
          (res) => (this.courses = res),
          (err) => console.log(err)
        );
      } else if (params.name) {
        //20211125
        this.courseService.getFilterCourses(params.name).subscribe(
          (res) => (this.courses = res),
          (err) => console.log(err)
        );
      } //20211125
      else {
        this.courseService.getCourses().subscribe(
          (res) => (this.courses = res),
          (err) => console.log(err)
        );
      }
    });
  }

  getCourses(id: number) {
    this.courseService.getCourses().subscribe(
      (res) => console.log(res),

      (err) => console.log(err)
    );
  }
}
