import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;
    const valid = await this.authService.validateUser(email, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(email);
  }

  @Post('register')
  async register(@Body() registerDTO) {
    const { email, password } = registerDTO;
    const valid = await this.authService.validateNewUser(email, password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    return await this.authService.register(registerDTO);
  }
}
