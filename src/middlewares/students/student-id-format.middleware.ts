import { NextFunction, Request, Response } from 'express';
import { validate as validateUUID } from 'uuid';
import { ErrorNotification } from '../../errors';

export class StudentIdFormatMiddleware {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { studenId } = req.params;

    const notifications: Array<ErrorNotification> = [];

    if (!validateUUID(studenId)) {
      notifications.push({
        field: 'studenId',
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
