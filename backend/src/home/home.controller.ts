/*import {
    Get,
    Param,
} from '@nestjs/common';*/

import {Body, Controller, Post, Get, UnauthorizedException, Param} from '@nestjs/common';
import { HomeService } from './home.service'; 
//import { UsersService } from 'src/users/users.service';
import { UserDTO } from 'src/users/user.dto';


@Controller('home')
export class HomeController {
  [x: string]: any;
  constructor(private homeService: HomeService) {}

  @Get('getListCursos/:inputkeys')
    async getListCursos(@Param('inputkeys') inputkeys){
      return await this.homeService.getCursos(inputkeys);
    //return "Retorno Valor";
  }

}
