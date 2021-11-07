import {Inject, Injectable} from '@nestjs/common';
import { UserDTO } from "./user.dto";
import {User} from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async getUserByName(email: string): Promise<any> {
    return this.usersRepository.findOne({
      where: { email }
    });
  }

  async getUserById(id: string): Promise<any> {
    return this.usersRepository.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }
}
