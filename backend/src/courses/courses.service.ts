import { Inject, Injectable } from '@nestjs/common';
import { CourseDTO } from './course.dto';
import { Course } from './courses.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private coursesRepository: typeof Course,
  ) {}

  async getCourse(id: number): Promise<any> {
    return this.coursesRepository.findByPk(id);
  }

  async getCourses(): Promise<Course[]> {
    return this.coursesRepository.findAll<Course>();
  }
}
