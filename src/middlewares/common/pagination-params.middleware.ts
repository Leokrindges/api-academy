import { NextFunction, Request, Response } from 'express';
import { ErrorNotification } from '../../errors';

export class PaginationParamsMiddleware {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { limit, page } = req.query;

    const notifications: Array<ErrorNotification> = [];

    if (limit && isNaN(Number(limit))) {
      notifications.push({
        field: 'limit',
        message: 'Formato de parâmetro inválido',
      });
    }

    if (page && isNaN(Number(page))) {
      notifications.push({
        field: 'page',
        message: 'Formato de parâmetro inválido',
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
