import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule,  UsersModule],
  controllers: [HomeController],
  providers: [
    HomeService,
  ],
  exports: [HomeService],
})
export class HomeModule {}
