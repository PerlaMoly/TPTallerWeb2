import {BadRequestException,Inject, Injectable, Module, NotFoundException } from '@nestjs/common';
import { CarritoDTO } from "./carrito.dto";
import {Carrito} from "./carrito.entity";
import {Detalle} from "../detalle/detalle.entity";
import { MessageDto } from 'src/common/message.dto';
import sequelize, { literal } from 'sequelize';
 

@Injectable()
export class CarritoService {
  constructor(
    @Inject('CARRITO_REPOSITORY')
    private carritoRepository: typeof Carrito ,
    ) {}
  
  async getCarritoById_Usuario(idusuario: number,estado:number): Promise<any> {
    const carrito = this.carritoRepository.findOne({
      where: { id_usuario: idusuario ,estado:estado},
    });

    return carrito;
  }

  async buscarMisOrdenes(idusuario: number): Promise<any> {
    const carrito = this.carritoRepository.findAll({
      where: { id_usuario: idusuario ,estado:2},
    });

    return carrito;
  }
  

  async getCarritoById(id: number): Promise<any> {
    return this.carritoRepository.findByPk(id);
  }

  async getAllCarrito(): Promise<Carrito[]> {
    return this.carritoRepository.findAll<Carrito>();
  }

  async createCarrito(data): Promise<CarritoDTO> {
    const { id_usuario, estado , total} = data;
    const dataToCreate: CarritoDTO = {
      id_usuario,
      estado,
      total,
    };
    const carrito = this.carritoRepository.create(dataToCreate);
    return carrito;
  }

  async finalizarCarrito(id: number,total:number): Promise<any> {
    const carrito = this.carritoRepository.findByPk(id);
 
    (await carrito).set({
      estado: '2',
      total:total
    });
    await (await carrito).save();

    return new MessageDto(total+` actualizado`);
  }

  async deleteCarrito(id: number): Promise<any> {
    const carrito = this.carritoRepository.findByPk(id);
    (await carrito).destroy();
    return new MessageDto(` eliminado`);
  }
}
