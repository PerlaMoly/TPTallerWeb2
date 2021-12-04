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
  
  getCarritoById_Usuario(idusuario: number,estado:number): Promise<any> {
    const carrito = this.carritoRepository.findOne({
      where: { id_usuario: idusuario ,estado:estado},
    });

    return carrito;
  }

  buscarMisOrdenes(idusuario: number): Promise<any> {
    const carrito = this.carritoRepository.findAll({
      where: { id_usuario: idusuario ,estado:2},
    });

    return carrito;
  }
  

  getCarritoById(id: number): Promise<any> {
    return this.carritoRepository.findByPk(id);
  }

  getAllCarrito(): Promise<Carrito[]> {
    return this.carritoRepository.findAll<Carrito>();
  }

  createCarrito(data): Promise<CarritoDTO> {
    const { id_usuario, estado , total} = data;
    const dataToCreate: CarritoDTO = {
      id_usuario,
      estado,
      total,
    };
    const carrito = this.carritoRepository.create(dataToCreate);
    return carrito;
  }
  

  finalizarCarrito(id: number,total:number): Promise<any>  {
    return this.carritoRepository.findByPk(id).then(carrito=>{
      carrito.set({
        estado: '2',
        total:total
      });
     carrito.save();
     return new MessageDto(total+` actualizado`);
         
    }).catch(error => {console.log("error en Save")});
  }
    

  deleteCarrito(id: number): Promise<any> {
    return this.carritoRepository.findByPk(id).then(carrito=>{
    carrito.destroy();
    return new MessageDto(` eliminado`);
    }).catch(error=>{
      console.log('error al eliminar carrito')
    });
  }


  // async finalizarCarrito(id: number,total:number): Promise<any> {
  //   const carrito = this.carritoRepository.findByPk(id);
        
  //   (await carrito).set({
  //     estado: '2',
  //     total:total
  //   });
        
  //   (await (carrito)).save();

  //   return new MessageDto(total+` actualizado`);
  // }
 

  // async deleteCarrito(id: number): Promise<any> {
  //   const carrito = this.carritoRepository.findByPk(id);
  //   (await carrito).destroy();
  //   return new MessageDto(` eliminado`);
  // }

}
