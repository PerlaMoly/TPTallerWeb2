import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/users.entity';
import { Carrito } from '../carrito/carrito.entity';
import { Detalle } from '../detalle/detalle.entity';
import { Course } from '../courses/courses.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '4868',
        database: 'tallerweb2',
      });

      sequelize.addModels([User,Carrito,Detalle,Course]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
