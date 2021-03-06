import {BadRequestException,Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DetalleDTO } from "./detalle.dto";
import { Detalle} from "./detalle.entity";
import { Course} from "../courses/courses.entity";
import { MessageDto } from 'src/common/message.dto';
import sequelize, { literal } from 'sequelize';

@Injectable()
export class DetalleService {
  constructor(
    @Inject('DETALLE_REPOSITORY')
    private detalleRepository: typeof Detalle
  ) {}

  

  // async getDetalleById_Carrito(idCarrito: number): Promise<any> {

 
  //   const detalle = await this.detalleRepository.findAll({
     
  //     where: { id_carrito: idCarrito } ,  include:  [Course] ,
  //   }); 
  //   return detalle;


  // }


    getDetalleById_Carrito(idCarrito: number): Promise<any> {

    const detalle = this.detalleRepository.findAll({
     
      where: { id_carrito: idCarrito } ,  include:  [Course] ,
    }); 
    return detalle;


  }  


  dameTotal(idCarrito: number): Promise<Detalle> {

 
    const detalle = this.detalleRepository.findOne({
      attributes: [
         [sequelize.fn('SUM', literal('precio * cantidad') ), 'precio'],
       ]
      ,
      where: { id_carrito: idCarrito },
    });
  
    return detalle;


  }
  

  
  

  createDetalle(data): Promise<DetalleDTO>{
   const {id_producto,cantidad,id_carrito,precio} = data;
   const dataToCreate: DetalleDTO = {
    id_producto,
    cantidad,
    id_carrito,
    precio
  }
  const detalle =  this.detalleRepository.create(dataToCreate);
  return;
  } 

 


  async actualizarDetalle(id: number,data): Promise<any> {
    const {cantidad} = data;
 
    const detalle = await this.detalleRepository.findByPk(id);
    if(cantidad==0){
      await detalle.destroy();
    }else{
      
    detalle.set({
      cantidad:cantidad,
     });
    await detalle.save();

  }
    return new MessageDto(`2actualizado` + cantidad + "asd");
}



}
