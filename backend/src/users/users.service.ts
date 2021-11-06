import { Injectable } from '@nestjs/common';
import { UserDTO } from "./user.dto";

@Injectable()
export class UsersService {
  constructor() {}

  async getUserByName(username: string): Promise<any> {
    return {
      username: 'mjalid',
      password: 'Owens2021.'
    };
  }

  async getUserById(username: string): Promise<any> {
    return username;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return [];
  }
}
