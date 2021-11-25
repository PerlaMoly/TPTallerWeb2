import { Sequelize } from 'sequelize-typescript';
import { Course } from 'src/courses/courses.entity';
import { User } from '../users/users.entity';

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
        database: 'tallerWeb2',
      });
      sequelize.addModels([User]);
      sequelize.addModels([Course]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
