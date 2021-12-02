import { Inject, Injectable } from '@nestjs/common';
import { CourseDTO } from './course.dto';
import { Course } from './courses.entity';
const bcrypt = require('bcrypt');

//20211125
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like
}

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private coursesRepository: typeof Course,
  ) {}

  getCourse(id: number): Promise<Course> {
    return this.coursesRepository.findByPk(id);
  }

  getCourses(): Promise<Course[]> {
    return this.coursesRepository.findAll<Course>();
  }

  //20211125
  getCursos (name: string): Promise<any> {
    return this.coursesRepository.findAll({
      attributes: ['id', 'name'],
      where: {name: {[Op.like]: '%'+  name + '%'}}
    });
  }
  
  //20211125
  getFilterCourses (name:String) : Promise<Course[]> {
    return this.coursesRepository.findAll<Course>({
      where: {name: {[Op.like]: '%'+  name + '%'}}
    });
  }

  //20211125
  getFilterCoursesCategory (category:string) : Promise<Course[]> {
    return this.coursesRepository.findAll<Course>({
      where: {category}
    });
  }

}
