import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { prismaConnection } from '../database/prisma.connection';

export class AuthController {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const studentFound = await prismaConnection.student.findUnique({
        where: {
          emailAddress: email,
          password: password,
        },
      });

      if (!studentFound) {
        return res.status(401).json({
          ok: false,
          message: 'Credencias inválidas',
        });
      }

      const authToken = randomUUID();

      await prismaConnection.student.update({
        where: { id: studentFound.id },
        data: { authToken },
      });

      return res.status(200).json({
        ok: true,
        message: 'Aluno autenticado',
        data: authToken,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }

  public static async logout(req: Request, res: Response) {
    try {
      const { student } = req.body;

      await prismaConnection.student.update({
        where: { id: student.id },
        data: { authToken: null },
      });

      return res.status(200).json({
        ok: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }
}
