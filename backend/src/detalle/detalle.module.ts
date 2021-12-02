import { Module } from '@nestjs/common';
import { DetalleService } from './detalle.service';
import { DetalleController } from './detalle.controller';
import {DatabaseModule} from "../database/database.module";
 import {detalleProviders} from "./detalle.providers";


@Module({
  imports: [DatabaseModule],
  controllers: [DetalleController],
  providers: [
    DetalleService,
    ...detalleProviders,
  ],
})
export class DetalleModule {}

 
 