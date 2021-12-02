import {Inject, Injectable} from '@nestjs/common';
import {CoursesService} from 'src/courses/courses.service'; //20211125

const bcrypt = require('bcrypt');

@Injectable()
export class HomeService {
  constructor(
    private courseService: CoursesService
  ) {}

//   async getCursos(inputkeys: string): Promise<any> {
//     return this.courseService.getCursos(inputkeys);
//  }

 getCursos(inputkeys: string): Promise<any> {
  return this.courseService.getCursos(inputkeys);
}

}