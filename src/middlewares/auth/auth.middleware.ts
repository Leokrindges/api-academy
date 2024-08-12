import { NextFunction, Request, Response } from 'express';
import { prismaConnection } from '../../database/prisma.connection';

export class AuthMiddleware {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        ok: false,
        message: 'Token é obrigatório',
        errors: [],
      });
    }

    const studentFound = await prismaConnection.student.findFirst({
      where: { authToken: headers.authorization },
    });

    if (!studentFound) {
      return res.status(401).json({
        ok: false,
        message: 'Usuário não autorizado',
        errors: [],
      });
    }

    req.body.student = studentFound;

    return next();
  }
}
