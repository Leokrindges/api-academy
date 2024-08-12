import { cpf } from 'cpf-cnpj-validator';
import * as EmailValidator from 'email-validator';
import { NextFunction, Request, Response } from 'express';
import { ErrorNotification } from '../../errors';

export class CreateStudentMiddleware {
  public static validateMissingFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name, age, document, email, password } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (typeof name === 'undefined') {
      notifications.push({ field: 'name', message: 'Campo obrigatório' });
    }

    if (typeof age === 'undefined') {
      notifications.push({ field: 'age', message: 'Campo obrigatório' });
    }

    if (typeof document === 'undefined') {
      notifications.push({ field: 'document', message: 'Campo obrigatório' });
    }

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
    const { name, age, document, email, password } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (typeof name !== 'string') {
      notifications.push({ field: 'name', message: 'Dado inválido' });
    }

    if (typeof age !== 'number') {
      notifications.push({ field: 'age', message: 'Dado inválido' });
    }

    if (typeof document !== 'string') {
      notifications.push({ field: 'document', message: 'Dado inválido' });
    }

    if (typeof email !== 'string') {
      notifications.push({ field: 'email', message: 'Dado inválido' });
    }

    if (typeof password !== 'string') {
      notifications.push({ field: 'password', message: 'Dado inválido' });
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
    const { name, age, document, email, password } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (name.length < 3) {
      notifications.push({
        field: 'name',
        message: 'Nome deve conter no mínimo 3 caracteres',
      });
    }

    if (age < 18) {
      notifications.push({
        field: 'age',
        message: 'Não é possível cadastrar aluno com idade menor que 18 anos',
      });
    }

    if (!cpf.isValid(document)) {
      notifications.push({
        field: 'document',
        message: 'Deve ser informado um CPF válido',
      });
    }

    if (!EmailValidator.validate(email)) {
      notifications.push({
        field: 'email',
        message: 'Deve ser informado um e-mail válido',
      });
    }

    if (password.length < 6) {
      notifications.push({
        field: 'password',
        message: 'Senha deve conter no mínimo 6 caracteres',
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
