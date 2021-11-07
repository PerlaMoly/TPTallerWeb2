import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {DatabaseModule} from "../database/database.module";
import {UsersController} from "./users.controller";
import {usersProviders} from "./users.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  exports: [UsersService],
})
export class UsersModule {}
