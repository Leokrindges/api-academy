import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import { prismaConnection } from '../database/prisma.connection';

export class EnrollmentsController {
  public static async create(req: Request, res: Response) {
    try {
      const { student, classId } = req.body;

      // validar se veio o classId e se o classId é um UUID

      const classFound = await prismaConnection.class.findUnique({
        where: { id: classId },
      });

      if (!classFound) {
        return res.status(404).json({
          ok: false,
          message: 'Turma não encontrada',
        });
      }

      // um aluno não pode se matricular duas vezes na mesma turma
      const enrollmentFound = await prismaConnection.enrollment.findFirst({
        where: {
          studentId: (student as Student).id,
          classId,
        },
      });

      if (enrollmentFound) {
        return res.status(400).json({
          ok: false,
          message: 'Já possui matricula nesta turma.',
        });
      }

      const enrollmentCreated = await prismaConnection.enrollment.create({
        data: {
          classId,
          studentId: (student as Student).id,
        },
        include: {
          class: {
            select: {
              name: true,
            },
          },
          student: {
            select: {
              name: true,
            },
          },
        },
      });

      return res.status(201).json({
        ok: true,
        message: 'Matricula efetivada',
        enrollmentCreated,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`,
      });
    }
  }
}
