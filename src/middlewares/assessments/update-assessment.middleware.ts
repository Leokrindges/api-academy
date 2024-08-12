import { isValid } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import { ErrorNotification } from '../../errors';

export class UpdateAssessmentMiddleware {
  public static validateFieldTypes(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { title, rate, deadline } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (title && typeof title !== 'string') {
      notifications.push({ field: 'title', message: 'Dado inválido' });
    }

    if (rate && typeof rate !== 'number') {
      notifications.push({ field: 'rate', message: 'Dado inválido' });
    }

    if (deadline && typeof deadline !== 'string') {
      notifications.push({ field: 'deadline', message: 'Dado inválido' });
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

  public static validateFieldsValue(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { title, rate, deadline } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (title && title.length < 3) {
      notifications.push({
        field: 'title',
        message: 'Título deve conter no mínimo 3 caracteres',
      });
    }

    if (rate && rate >= 0 && rate <= 10) {
      notifications.push({
        field: 'rate',
        message: 'A nota deve ser um valor númerico entre 0 e 10',
      });
    }

    if (deadline && !isValid(new Date(deadline))) {
      notifications.push({
        field: 'deadline',
        message: 'Deve ser informado uma data válida',
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
