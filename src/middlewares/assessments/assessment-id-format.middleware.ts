import { NextFunction, Request, Response } from 'express';
import { validate as validateUUID } from 'uuid';
import { ErrorNotification } from '../../errors';

export class AssessmentIdFormatMiddleware {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { assessmentId } = req.params;

    const notifications: Array<ErrorNotification> = [];

    if (!validateUUID(assessmentId)) {
      notifications.push({
        field: 'assessmentId',
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
