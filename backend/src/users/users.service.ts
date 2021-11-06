import { Injectable } from '@nestjs/common';
import {UserDTO} from "./user.dto";

@Injectable()
export class UsersService {
  constructor() {}

  async getUserByName(username: string): Promise<any> {
    return username;
  }

  async getUserById(username: string): Promise<any> {
    return username;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return [];
  }
}
