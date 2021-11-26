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

  async getCourse(id: number): Promise<any> {
    return this.coursesRepository.findByPk(id);
  }

  async getCourses(): Promise<Course[]> {
    return this.coursesRepository.findAll<Course>();
  }

  //20211125
  async getCursos (name: string): Promise<any> {
    return this.coursesRepository.findAll({
      attributes: ['id', 'name'],
      where: {name: {[Op.like]: '%'+  name + '%'}}
    });
  }
  
  //20211125
  async getFilterCourses (name:String) : Promise<Course[]> {
    return this.coursesRepository.findAll<Course>({
      where: {name: {[Op.like]: '%'+  name + '%'}}
    });
  }


}
