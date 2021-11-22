import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {AuthModule} from "./auth/auth.module";
import { HomeModule } from './home/home.module';
import {UsersModule} from "./users/users.module";


@Module({
  imports: [
    AuthModule,
    UsersModule,
    HomeModule
  ],
  controllers: [AppController],
})
export class AppModule {}
