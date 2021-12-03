import {BadRequestException, Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDTO): Promise<{ access_token: string }> {
    try {
      const { email, password } = loginDTO;
      return this.authService.validateUser(email, password).then(isValid => {
        if (!isValid) {
          throw new BadRequestException({
            message: 'Email o password invalidos.'
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
      return this.authService.validateNewUser(email).then(isValid => {
        if (!isValid) {
          throw new BadRequestException({
             message: 'Ya existe un usuario registrado con ese email.'
          });
        }

        return this.authService.register(registerDTO);
      });
    } catch (e) {
      throw e;
    }
  }
}