import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CarritoValidator implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id_usuario,estado,total } = req.body;
    const errors = [];
 
    if (!id_usuario) {
      errors.push('El usuario  es requerido');
    }

    if (!estado) {
      errors.push('El estado es requerido');
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
