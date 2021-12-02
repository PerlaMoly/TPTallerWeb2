import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class DetalleValidator implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id_producto,cantidad,id_carrito,precio } = req.body;
    const errors = [];
 
 


    if (!id_producto) {
      errors.push('El producto  es requerido');
    }

    if (!cantidad) {
      errors.push('La cantidad es requerido');
    }

    if (!id_carrito) {
      errors.push('El carrito es requerido');
    }

    if (!precio) {
      errors.push('El precio es requerido');
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
