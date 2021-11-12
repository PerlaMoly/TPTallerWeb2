import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (user) {
      const passIsValid = bcrypt.compareSync(pass, user.password);

      if (passIsValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async validateNewUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {

      const result = password.match(/^[a-zA-Z0-9]{6,}$/);

      return !!result;
    }
    return null;
  }

  async generateAccessToken(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data) {
    const user: any = await this.usersService.createUser(data);

    return {
      user,
    };
  }
}
