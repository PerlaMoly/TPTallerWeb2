import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import {response} from "express";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  validateUser(email: string, pass: string): Promise<any> {
    return this.usersService.getUserByEmail(email).then(user => {
      if (user) {
        const passIsValid = bcrypt.compareSync(pass, user.password);

        if (passIsValid) {
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    }).catch(error => {
      console.log('error');
    });
  }

  validateNewUser(email: string): Promise<any> {
    return this.usersService.getUserByEmail(email).then(response => !response);
  }

  generateAccessToken(email: string) {
    return this.usersService.getUserByEmail(email).then(user => {
      const payload = {
        id: user.id,
        email: user.email,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    });
  }

  register(data) {
    return this.usersService.createUser(data).then(reponse => response);
  }
}