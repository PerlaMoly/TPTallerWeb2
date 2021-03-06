import sequelize, { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
  Default,
  HasMany,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  IsNull,
} from 'sequelize-typescript';
import { Course } from '../courses/courses.entity';

@Table({
  timestamps: true,
})
export class Detalle extends Model {
  @PrimaryKey
  @IsNull
  @AutoIncrement
  @Column
  id: number;

  @Column
  id_producto: number;

  @Column
  cantidad: number;

  @Column
  id_carrito: number;

  @Column
  precio: number;

  @BelongsTo(() => Course, 'id_producto')
  courses: Course[];
}

 /*
Detalle.hasMany(Course);
Course.belongsTo(Detalle);
 */