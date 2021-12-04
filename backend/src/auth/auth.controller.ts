import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
const emailer = require('../middlewares/emailer');

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDTO): Promise<{ access_token: string }> {
    try {
      const { email, password } = loginDTO;
      return this.authService.validateUser(email, password).then((isValid) => {
        if (!isValid) {
          throw new BadRequestException({
            message: 'Email o password invalidos.',
          });
        }
        return this.authService.generateAccessToken(email);
      });
    } catch (e) {
      throw e;
    }
  }

  @Post('register')
  async register(@Body() registerDTO) {
    try {
      const { email } = registerDTO;

      const token = Math.floor(1000 + Math.random() * 9000).toString();

      registerDTO.token = token;

      return this.authService.validateNewUser(email).then((isValid) => {
        if (!isValid) {
          throw new BadRequestException({
            message: 'Ya existe un usuario registrado con ese email.',
          });
        }

        emailer.sendMail(registerDTO, token);
        return this.authService.register(registerDTO);
      });
    } catch (e) {
      throw e;
    }
  }

  @Get(':token')
  async confirm(@Param('token') token: string) {
    try {
      // verificar la data

      const data = this.userService.getUserByToken(token);

      if (data == null) {
        return console.log('error');
      }

      const tokenUser = (await data).token;

      // Actualizar Usuario

      if (tokenUser === token) {
        (await data).status = true;
      }

      // redireccionar a la confirmacion

      return console.log('usuario confirmado');
    } catch (e) {
      throw e;
    }
  }
}
  


