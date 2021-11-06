import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO): Promise<{ access_token: string }> {
    return Promise.resolve({ access_token: 'login' });
    const { name, pass } = loginDTO;
    const valid = await this.authService.validateUser(name, pass);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(name);
  }
}
