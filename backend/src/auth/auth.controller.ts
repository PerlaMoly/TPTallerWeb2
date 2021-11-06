import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async login(): Promise<string> {
    const userValidated = await this.authService.validateUser('mjalid', '111111');

    return 'mjalid';
  }
}
