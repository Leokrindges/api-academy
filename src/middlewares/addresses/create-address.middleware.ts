import { NextFunction, Request, Response } from 'express';
import { ErrorNotification } from '../../errors';

export class CreateAddressMiddleware {
  public static validateMissingFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const {
      street,
      addressNumber,
      zipCode,
      complement,
      neighborhood,
      city,
      uf,
    } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (typeof street === 'undefined') {
      notifications.push({ field: 'street', message: 'Campo obrigatório' });
    }

    if (typeof addressNumber === 'undefined') {
      notifications.push({
        field: 'addressNumber',
        message: 'Campo obrigatório',
      });
    }

    if (typeof zipCode === 'undefined') {
      notifications.push({ field: 'zipCode', message: 'Campo obrigatório' });
    }

    if (typeof neighborhood === 'undefined') {
      notifications.push({
        field: 'neighborhood',
        message: 'Campo obrigatório',
      });
    }

    if (typeof city === 'undefined') {
      notifications.push({ field: 'city', message: 'Campo obrigatório' });
    }

    if (typeof uf === 'undefined') {
      notifications.push({ field: 'uf', message: 'Campo obrigatório' });
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
    const {
      street,
      addressNumber,
      zipCode,
      complement,
      neighborhood,
      city,
      uf,
    } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (typeof street !== 'string') {
      notifications.push({ field: 'street', message: 'Dado inválido' });
    }

    if (typeof addressNumber !== 'string') {
      notifications.push({ field: 'addressNumber', message: 'Dado inválido' });
    }

    if (typeof zipCode !== 'string') {
      notifications.push({ field: 'zipCode', message: 'Dado inválido' });
    }

    if (complement && typeof complement !== 'string') {
      notifications.push({ field: 'complement', message: 'Dado inválido' });
    }

    if (typeof neighborhood !== 'string') {
      notifications.push({ field: 'neighborhood', message: 'Dado inválido' });
    }

    if (typeof city !== 'string') {
      notifications.push({ field: 'city', message: 'Dado inválido' });
    }

    if (typeof uf !== 'string') {
      notifications.push({ field: 'uf', message: 'Dado inválido' });
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
    const {
      street,
      addressNumber,
      zipCode,
      complement,
      neighborhood,
      city,
      uf,
    } = req.body;

    const notifications: Array<ErrorNotification> = [];

    if (!street.length) {
      notifications.push({
        field: 'street',
        message: 'Rua não pode ser vazio',
      });
    }

    if (!addressNumber.length) {
      notifications.push({
        field: 'addressNumber',
        message: 'Número não pode ser vazio',
      });
    }

    if (zipCode.length !== 8) {
      notifications.push({
        field: 'zipCode',
        message: 'Deve ser informado um CEP válido (ex: 99884433)',
      });
    }

    if (!neighborhood.length) {
      notifications.push({
        field: 'neighborhood',
        message: 'Bairro não pode ser vazio',
      });
    }

    if (!city.length) {
      notifications.push({
        field: 'city',
        message: 'Cidade não pode ser vazio',
      });
    }

    if (uf.length !== 2) {
      notifications.push({
        field: 'uf',
        message: 'Deve ser informado uma UF válida (ex: RS)',
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
