import {Table, Column, Model, DeletedAt, UpdatedAt, CreatedAt, Default} from 'sequelize-typescript';

 @Table({
    timestamps: true,
  })
  export class Carrito extends Model {
     @Column
    id_usuario:number;

    @Column
    estado:number;

    @Column
    total:number;

}