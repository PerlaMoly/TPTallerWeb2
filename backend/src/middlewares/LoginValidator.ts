import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoginValidator implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
      errors.push('El campo email es requerido');
    }

    if (!password) {
      errors.push('El campo contraseña es requerido');
    }

    if (errors.length) {
      res.send({
        status: 400,
        message: errors,
      });
    } else {
      next();
    }
  }
}
