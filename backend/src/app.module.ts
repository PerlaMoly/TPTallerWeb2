import {MiddlewareConsumer, Module, NestModule,RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import {AuthModule} from "./auth/auth.module";
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { CarritoModule } from './carrito/carrito.module';
import { DetalleModule } from './detalle/detalle.module';
import { RegisterValidator } from "./middlewares/RegisterValidator";
import { CarritoValidator } from "./middlewares/CarritoValidator";
import { DetalleValidator } from "./middlewares/DetalleValidator";
import { LoginValidator } from "./middlewares/LoginValidator";
import { ValidateModule } from './validate/validate.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    CarritoModule,
    DetalleModule,
    HomeModule,
    CoursesModule,
    ValidateModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RegisterValidator).forRoutes('/auth/register');
    consumer.apply(LoginValidator).forRoutes('/auth/login');
    consumer
      .apply(CarritoValidator)
      .forRoutes({ path: 'carrito', method: RequestMethod.POST });
    consumer
      .apply(DetalleValidator)
      .forRoutes({ path: 'detalle', method: RequestMethod.POST });
  }
}
