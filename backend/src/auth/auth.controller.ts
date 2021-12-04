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
      // verificar la data

      const data = await this.userService.getUserByToken(token);

      if (data == null) {
        return new MessageDto(`Error`);
      }

      const tokenUser = (await data).token;

      // Actualizar Usuario

      if (tokenUser === token) {
        (await data).status = true;
        this.userService.actualizarUsuario((await data).id);
        return new MessageDto(`Confirmado`);
      } else {
        return new MessageDto(`Error`);
      }
    } catch (e) {
      throw e;
    }
  }
}
