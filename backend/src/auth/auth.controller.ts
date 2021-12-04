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
import { MessageDto } from 'src/common/message.dto';
import { User } from 'src/users/users.entity';
const emailer = require('../middlewares/emailer');

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  login(@Body() loginDTO): Promise<{ access_token: string }> {
    try {
      const { email, password } = loginDTO;
      return this.authService.validateUser(email, password).then(response => {
        if (response.error) {
          throw new BadRequestException({
            message: response.message,
          });
        }
        return this.authService.generateAccessToken(email);
      });
    } catch (e) {
      throw e;
    }
  }

  @Post('register')
  register(@Body() registerDTO) {
    try {
      const { email } = registerDTO;

      const token = Math.random().toString(36).substr(2);

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
      return this.userService.getUserByToken(token).then(user => {
        if (user && user.token === token) {
          this.userService.actualizarUsuario(user.id);
          return new MessageDto('Confirmado');
        }
        return new MessageDto(`Error`);
      }).catch(error => {
        console.log(error);
      });
    } catch (e) {
      throw e;
    }
  }
}
