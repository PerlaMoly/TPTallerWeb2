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
  async getCourses(): Promise<CourseDTO[]> {
    return await this.coursesService.getCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number): Promise<CourseDTO> {
    return await this.coursesService.getCourse(id);
  }
}
