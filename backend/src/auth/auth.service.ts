import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { response } from 'express';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, pass: string): Promise<any> {
    return this.usersService
      .getUserByEmail(email)
      .then((user) => {
        if (user) {
          if(user.status) {
            const passIsValid = bcrypt.compareSync(pass, user.password);

            if (passIsValid) {
              const { password, ...result } = user;
              return {
                error: false,
                message: result,
              };
            }
            return {
              error: true,
              message: 'El email o contraseña son invalidos.',
            };
          }
          return {
            error: true,
            message: 'El email ingresado no ha sido verificado.',
          };
        }
        return {
          error: true,
          message: 'El email ingresado no esta registrado.',
        };
      })
      .catch((error) => {
        console.log('error');
      });
  }

  validateNewUser(email: string): Promise<any> {
    return this.usersService
      .getUserByEmail(email)
      .then((response) => !response);
  }

  generateAccessToken(email: string) {
    return this.usersService.getUserByEmail(email).then((user) => {
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
    return this.usersService.createUser(data).then((reponse) => response);
  }
}
