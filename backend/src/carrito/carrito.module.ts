import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import {DatabaseModule} from "../database/database.module";
 import {carritoProviders} from "./carrito.providers";


@Module({
  imports: [DatabaseModule],
  controllers: [CarritoController],
  providers: [
    CarritoService,
    ...carritoProviders,
  ],
})
export class CarritoModule {}

 
 