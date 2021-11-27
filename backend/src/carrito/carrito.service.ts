import {BadRequestException,Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CarritoDTO } from "./carrito.dto";
import {Carrito} from "./carrito.entity";
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class CarritoService {
  constructor(
    @Inject('CARRITO_REPOSITORY')
    private carritoRepository: typeof Carrito
  ) {}

  async getCarritoById_Usuario(idusuario: number): Promise<any> {
    const carrito = await this.carritoRepository.findOne({
      where: { id_usuario: idusuario }
    });

     
    return carrito;
  }

  async getCarritoById(id: string): Promise<any> {
    return this.carritoRepository.findByPk(id);
  }
  
  async getAllCarrito(): Promise<Carrito[]> {
    return this.carritoRepository.findAll<Carrito>();
  }


  async createCarrito(data): Promise<CarritoDTO>{
  const {id_usuario,estado} = data;
   const dataToCreate: CarritoDTO = {
      id_usuario,
      estado
  }
  const carrito = await this.carritoRepository.create(dataToCreate);
  return carrito;
  } 

  async finalizarCarrito(id: number): Promise<any> {
    const carrito = await this.carritoRepository.findByPk(id);

    carrito.set({
      estado: "2",
     });
    await carrito.save();

    return new MessageDto(` actualizado`);
}

async deleteCarrito(id: number): Promise<any> {
  const carrito = await this.carritoRepository.findByPk(id);
  await carrito.destroy();
  return new MessageDto(` eliminado`);

  


  
}


}
