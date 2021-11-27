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
  import { CarritoDTO } from './carrito.dto';
  import { CarritoService } from './carrito.service';
  import {Carrito} from "./carrito.entity";
  import {JwtAuthGuard} from "../auth/jwt-auth.guard";
  
  @Controller('carrito')
  export class CarritoController {
    constructor(private carritoService: CarritoService) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCarrito(): Promise<CarritoDTO[]> {
      return await this.carritoService.getAllCarrito();
    }
  
    @Get(':id')
    async getCarritoById_Usuario(@Param('id',ParseIntPipe) id: number): Promise<CarritoDTO> {
      return await this.carritoService.getCarritoById_Usuario(id);
    }
  
    
   @Post()
   async createCarrito(@Body() carrito: CarritoDTO): Promise<CarritoDTO> {
     return await this.carritoService.createCarrito(carrito);
   }


   @Put(':id')
   async finalizarCarrito(@Param('id',ParseIntPipe) id: number): Promise<CarritoDTO> {
    return await this.carritoService.finalizarCarrito(id);
   }
 

 

   @Delete(':id')
   async delete(@Param('id', ParseIntPipe) id: number): Promise<CarritoDTO> {
       return await this.carritoService.deleteCarrito(id)
   }


  }