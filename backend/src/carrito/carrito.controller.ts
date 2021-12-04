import {
    Body,
    Controller,
    Delete,
    Get,
    Module,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth } from '@nestjs/swagger';
  import { CarritoDTO } from './carrito.dto';
  import { CarritoService } from './carrito.service';
  import { DetalleService } from '../detalle/detalle.service';
  import {Carrito} from "./carrito.entity";
  import {JwtAuthGuard} from "../auth/jwt-auth.guard";
  

  import { DetalleModule } from "../detalle/detalle.module";
import { Console } from 'console';

 
  @Controller('carrito')
  export class CarritoController {
    constructor(
      private carritoService: CarritoService,
      private detalleService: DetalleService
) {}



    // @Get()
    // @UseGuards(JwtAuthGuard)
    // async getAllCarrito(): Promise<CarritoDTO[]> {
    //   return await this.carritoService.getAllCarrito();
    // }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllCarrito(): Promise<CarritoDTO[]> {
      return this.carritoService.getAllCarrito();
    }


    // @Get('/buscarMiCarrito/:id/:estado')
    // async getCarritoById_Usuario(
    //   @Param('id', ParseIntPipe) id: number, @Param('estado', ParseIntPipe) estado: number,
    // ): Promise<CarritoDTO> {
    //    return await this.carritoService.getCarritoById_Usuario(id,estado);
    
    // }

    @Get('/buscarMiCarrito/:id/:estado')
    getCarritoById_Usuario(
      @Param('id', ParseIntPipe) id: number, @Param('estado', ParseIntPipe) estado: number,
    ): Promise<CarritoDTO> {
       return this.carritoService.getCarritoById_Usuario(id,estado);
    
    }


    // @Get('/buscarMisOrdenes/:id')
    // async buscarMisOrdenes(
    //   @Param('id', ParseIntPipe) id: number 
       
    // ): Promise<CarritoDTO> {
    //    return await this.carritoService.buscarMisOrdenes(id);
    
    // }

    @Get('/buscarMisOrdenes/:id')
    buscarMisOrdenes(
      @Param('id', ParseIntPipe) id: number 
       
    ): Promise<CarritoDTO> {
       return this.carritoService.buscarMisOrdenes(id);
    
    }

    
    // @Post()
    // async createCarrito(@Body() carrito: CarritoDTO): Promise<CarritoDTO> {
    //   return await this.carritoService.createCarrito(carrito);
    // }

    @Post()
    createCarrito(@Body() carrito: CarritoDTO): Promise<CarritoDTO> {
      return this.carritoService.createCarrito(carrito);
    }

    // @Get('/finalizarCarrito/:id')
    // async finalizarCarrito(
    //   @Param('id') id: number,
    // ): Promise<CarritoDTO> {
    //    const total=this.detalleService.dameTotal(id);
    //   const totalNumber  =(await total).precio;
    //   return await this.carritoService.finalizarCarrito(id,totalNumber);
    // }
    
    @Get('/finalizarCarrito/:id')
    finalizarCarrito(
      @Param('id') id: number,
    ): Promise<CarritoDTO> {

      return this.detalleService.dameTotal(id).then(detalle => {
        return this.carritoService.finalizarCarrito(id,detalle.precio);

      });
    } catch (e) {
      throw e;
    }

      

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<CarritoDTO> {
      return this.carritoService.deleteCarrito(id);
    }
  }