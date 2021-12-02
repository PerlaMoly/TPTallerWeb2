import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { DetalleService } from '../detalle/detalle.service';
import { CarritoController } from './carrito.controller';
import {DatabaseModule} from "../database/database.module";
import {carritoProviders} from "./carrito.providers";

import {detalleProviders} from "../detalle/detalle.providers";
 import { DetalleModule } from "../detalle/detalle.module";


@Module({
  imports: [DatabaseModule,DetalleModule],
  controllers: [CarritoController],
  providers: [
    CarritoService,
    ...carritoProviders,
    DetalleService,
    ...detalleProviders,
  ],
})
export class CarritoModule {}

 
 