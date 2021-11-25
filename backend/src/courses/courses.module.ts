import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { DatabaseModule } from '../database/database.module';
import { coursesController } from './courses.controller';
import { coursesProviders } from './courses.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [coursesController],
  providers: [CoursesService, ...coursesProviders],
  exports: [CoursesService],
})
export class CoursesModule {}
