import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {AuthModule} from "./auth/auth.module";
import { HomeModule } from './home/home.module';
import {UsersModule} from "./users/users.module";
import { CarritoModule } from './carrito/carrito.module';
import { DetalleModule } from './detalle/detalle.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    CarritoModule,
    DetalleModule,
    HomeModule
  ],
  controllers: [AppController],
})
export class AppModule {}
