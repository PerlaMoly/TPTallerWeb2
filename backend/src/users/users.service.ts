import {Inject, Injectable} from '@nestjs/common';
import { UserDTO } from "./user.dto";
import {User} from "./users.entity";
import {CreateUserDTO} from "./createUser.dto";
const bcrypt = require('bcrypt');

//recordar borrar esta funcion PERLA, pasarla a producto 20211122
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.usersRepository.findOne({
      where: {email}
    });
  }
//recordar borrar esta funcion PERLA, pasarla a producto 20211122
  async getCursos(email: string): Promise<any> {
    return this.usersRepository.findAll({
      attributes: ['name', 'email'],
      where: {email: {[Op.like]: '%'+  email + '%'}}
    });
  }

  async getUserById(id: string): Promise<any> {
    return this.usersRepository.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async createUser(data): Promise<UserDTO> {
    const { email, name, password } = data;
    const saltRounds = 10;
    const hashedPW = bcrypt.hashSync(password, saltRounds);

    const dataToCreate: CreateUserDTO = {
      email,
      name,
      password: hashedPW,
    }
    const user = await this.usersRepository.create(dataToCreate);

    return user;
  }
}

