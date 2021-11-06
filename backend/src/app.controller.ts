import {Controller, Request, Response, Post, UseGuards, Get} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.generateAccessToken(req.user);
  }

  @Get('/ping')
  async ping(@Response() res) {
    return res.send({ message: "pong" });
  }
}
