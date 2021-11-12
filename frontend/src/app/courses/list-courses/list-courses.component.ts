import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css'],
})
export class ListCoursesComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {}

  getProducts() {
    this.courseService.getCourses();

    .subscribe{
      
    }
  }
}
