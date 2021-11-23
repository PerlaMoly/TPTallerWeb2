import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/users.entity';
import { Carrito } from '../carrito/carrito.entity';
import { Detalle } from '../detalle/detalle.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'tallerWeb22',
      });
      sequelize.addModels([User,Carrito,Detalle]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
