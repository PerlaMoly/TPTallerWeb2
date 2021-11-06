import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthService} from "./auth/auth.service";
import {UsersService} from "./users/users.service";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
