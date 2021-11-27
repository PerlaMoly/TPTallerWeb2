import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [DatabaseModule,  UsersModule, CoursesModule],
  controllers: [HomeController],
  providers: [
    HomeService,
  ],
  exports: [HomeService],
})
export class HomeModule {}
