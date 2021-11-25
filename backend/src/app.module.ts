import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {AuthModule} from "./auth/auth.module";
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CoursesModule],
  controllers: [AppController],
})
export class AppModule {}
