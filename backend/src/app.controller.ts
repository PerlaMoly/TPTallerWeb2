import {Controller, Request, Response, Post, UseGuards, Get, Body, UnauthorizedException} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('/ping')
  async ping(@Response() res) {
    return res.send({ message: "pong" });
  }
}
