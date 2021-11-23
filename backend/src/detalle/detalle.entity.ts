import {Table, Column, Model, DeletedAt, UpdatedAt, CreatedAt, Default} from 'sequelize-typescript';

 @Table({
    timestamps: true,
  })
  export class Detalle extends Model {
 
 
    @Column
  id_producto:number;

  @Column
  cantidad:number;
  
  @Column
  id_carrito:number;

  @Column
  precio:number;



}