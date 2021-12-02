import {Inject, Injectable} from '@nestjs/common';
import { UserDTO } from "./user.dto";
import {User} from "./users.entity";
import {CreateUserDTO} from "./createUser.dto";
const bcrypt = require('bcrypt');

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

  async getUserById(id: string): Promise<any> {
    return this.usersRepository.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async createUser(data): Promise<UserDTO> {
    const { email, name, password, last_name, address } = data;
    const saltRounds = 10;
    const hashedPW = bcrypt.hashSync(password, saltRounds);

    const dataToCreate: CreateUserDTO = {
      email,
      name,
      last_name,
      address,
      password: hashedPW,
    }

    return this.usersRepository.create(dataToCreate);
  }
}

