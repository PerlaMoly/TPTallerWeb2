import {
  Table,
  Column,
  Model,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
  Default,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  AllowNull,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Detalle } from '../detalle/detalle.entity';

@Table({
  timestamps: true,
})
export class Course extends Model {
  @PrimaryKey
  @AllowNull
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  hours: number;

  @Column
  price: number;

  @Column
  category: string; //20211125

  @Column
  imageURL: string;


  
  @HasMany(() => Detalle, 'id')
  detalle: Detalle;

}
