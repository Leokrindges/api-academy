import { NextFunction, Request, Response } from 'express';
import { ErrorNotification } from '../../errors/error-notification';

export class LoginMiddleware {
  public static validateMissingFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (typeof email === 'undefined') {
      notifications.push({ field: 'email', message: 'Campo obrigatório' });
    }

    if (typeof password === 'undefined') {
      notifications.push({ field: 'password', message: 'Campo obrigatório' });
    }

    if (notifications.length) {
      return res.status(400).json({
        ok: false,
        message: 'Requisição inválida',
        errors: notifications,
      });
    }

    return next();
  }

  public static validateFieldTypes(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (typeof email !== 'string') {
      notifications.push({ field: 'email', message: 'Dado inválido' });
    }

    if (typeof password !== 'string') {
      notifications.push({
        field: 'password',
        message: 'Dado inválido',
      });
    }

    if (notifications.length) {
      return res.status(400).json({
        ok: false,
        message: 'Requisição inválida',
        errors: notifications,
      });
    }

    return next();
  }
}
