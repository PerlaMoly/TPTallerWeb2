import {Inject, Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/users.service'; //cambiar luego por el de cursos

const bcrypt = require('bcrypt');



@Injectable()
export class HomeService {
  constructor(
    private usersService: UsersService
  ) {}

  async getCursos(inputkeys: string): Promise<any> {

      return this.usersService.getCursos(inputkeys);
 }

}