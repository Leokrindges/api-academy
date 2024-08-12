import { NextFunction, Request, Response } from 'express';
import { ErrorNotification } from '../../errors';

export class UpdateStudentMiddleware {
  public static validateFieldTypes(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name, age } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (name && typeof name !== 'string') {
      notifications.push({ field: 'name', message: 'Dado inválido' });
    }

    if (age && typeof age !== 'number') {
      notifications.push({ field: 'age', message: 'Dado inválido' });
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
    const { name, age } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (name && name.length < 3) {
      notifications.push({
        field: 'name',
        message: 'Nome deve conter no mínimo 3 caracteres',
      });
    }

    if (age && age < 18) {
      notifications.push({
        field: 'age',
        message: 'Não são aceitos alunos menores de 18 anos',
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
