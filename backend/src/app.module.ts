import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import {AuthModule} from "./auth/auth.module";
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { CarritoModule } from './carrito/carrito.module';
import { DetalleModule } from './detalle/detalle.module';
import {RegisterValidator} from "./middlewares/RegisterValidator";
import {LoginValidator} from "./middlewares/LoginValidator";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CarritoModule,
    DetalleModule,
    HomeModule,
    CoursesModule
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RegisterValidator).forRoutes("/auth/register");
    consumer.apply(LoginValidator).forRoutes("/auth/login");
  }
}
