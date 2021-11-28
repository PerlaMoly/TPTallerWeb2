import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RegisterValidator implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name, last_name, email, address, password } = req.body;
    const errors = [];

    if (!name) {
      errors.push('El campo nombre es requerido');
    }

    if (!last_name) {
      errors.push('El campo apellido es requerido');
    }

    if (!email) {
      errors.push('El campo email es requerido');
    }

    if (!address) {
      errors.push('El campo direccion es requerido');
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
