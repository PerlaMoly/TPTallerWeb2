import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { ValidUserIdPipe } from './../pipes/valid-user-id.pipe';
import { CourseDTO } from './course.dto';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class coursesController {
  constructor(private coursesService: CoursesService) {}

 
  @Get()
  getCourses(): Promise<CourseDTO[]> {
    return this.coursesService.getCourses();
  }


  @Get(':id')
    getCourseById(@Param('id') id: number): Promise<CourseDTO> {
    return this.coursesService.getCourse(id);
  }



  @Get('/filter/:name') //20211125
   getFilterCourses(@Param('name') name: string): Promise<CourseDTO[]> {
    return this.coursesService.getFilterCourses(name);
  }


  @Get('/category/:category') //20211125
  getFilterCoursesCategory(@Param('category') category: string): Promise<CourseDTO[]> {
    return this.coursesService.getFilterCoursesCategory(category);
  }
}
