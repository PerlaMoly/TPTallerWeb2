import {Body, Controller, Post, Get, UnauthorizedException, Param} from '@nestjs/common';
import { HomeService } from './home.service';


@Controller('home')
export class HomeController {
  [x: string]: any;
  constructor(private homeService: HomeService) {}


  @Get('getListCursos/:inputkeys')
     getListCursos(@Param('inputkeys') inputkeys){
     return this.homeService.getCursos(inputkeys);
  }



}
