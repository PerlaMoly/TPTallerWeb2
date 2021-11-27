import {Table, Column, Model, DeletedAt, UpdatedAt, CreatedAt, Default} from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class User extends Model {
  @Column
  name: string;

  @Column
  last_name: string;

  @Column
  address: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
