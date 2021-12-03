import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { DetalleDTO } from './detalle.dto';
  import { DetalleService } from './detalle.service';
  import {Detalle} from "./detalle.entity";
  import {JwtAuthGuard} from "../auth/jwt-auth.guard";
  
  @Controller('detalle')
  export class DetalleController {
    constructor(private detalleService: DetalleService) {}
  

    // @Post()
    // async createDetalle(@Body() detalle: DetalleDTO): Promise<DetalleDTO> {
    //   return await this.detalleService.createDetalle(detalle);
    // }

    @Post()
    createDetalle(@Body() detalle: DetalleDTO): Promise<DetalleDTO> {
      return  this.detalleService.createDetalle(detalle);
    }
  
 
    // @Get(':idCarrito')
    // async getdetalleCarrito(@Param('idCarrito',ParseIntPipe) idCarrito: number): Promise<DetalleDTO> {
    //   return await this.detalleService.getDetalleById_Carrito(idCarrito);
    // }

    @Get(':idCarrito')
    getdetalleCarrito(@Param('idCarrito',ParseIntPipe) idCarrito: number): Promise<DetalleDTO> {
      return this.detalleService.getDetalleById_Carrito(idCarrito);
    }
  
     

  //  @Put(':id')
  //  async detallesCantidad(@Param('id',ParseIntPipe) id: number,@Body() detalle: DetalleDTO): Promise<DetalleDTO> {
  //    return await this.detalleService.actualizarDetalle(id,detalle);
  //  }

   @Put(':id')
   detallesCantidad(@Param('id',ParseIntPipe) id: number,@Body() detalle: DetalleDTO): Promise<DetalleDTO> {
     return this.detalleService.actualizarDetalle(id,detalle);
   }
 
  }