import { Request, Response } from 'express';
import { prismaConnection } from '../database/prisma.connection';

export class AssessmentsController {
  public static async create(req: Request, res: Response) {
    try {
      const { student, title, rate, deadline } = req.body;

      const assessmentCreated = await prismaConnection.assessment.create({
        data: {
          deadline: new Date(deadline),
          rate: rate ?? 0,
          title: title,
          studentId: student.id,
        },
      });

      return res.status(201).json({
        ok: true,
        message: 'Avaliação cadastrada com sucesso',
        data: assessmentCreated,
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

  public static async list(req: Request, res: Response) {
    try {
      let { limit, page } = req.query;
      const { student } = req.body;

      let limitDefault = 10;
      let pageDefault = 1;

      if (limit) {
        limitDefault = Number(limit);
      }

      if (page) {
        pageDefault = Number(page);
      }

      const count = await prismaConnection.assessment.count({
        where: { studentId: student.id, deleted: false },
      });

      if (!count) {
        return res.status(200).json({
          ok: true,
          message: 'Avaliações listadas com sucesso',
          data: [],
          pagination: {
            limit: limitDefault,
            page: 1,
            count: 0,
            totalPages: 1,
          },
        });
      }

      const assessments = await prismaConnection.assessment.findMany({
        where: { studentId: student.id, deleted: false },
        orderBy: { createdAt: 'desc' },
        skip: limitDefault * (pageDefault - 1),
        take: limitDefault,
      });

      return res.status(201).json({
        ok: true,
        message: 'Avaliações listadas com sucesso',
        data: assessments,
        pagination: {
          limit: limitDefault,
          page: pageDefault,
          count: count,
          totalPages: Math.ceil(count / limitDefault),
        },
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

  public static async get(req: Request, res: Response) {
    try {
      const { assessmentId } = req.params;
      const { student } = req.body;

      const assessmentFound = await prismaConnection.assessment.findUnique({
        where: { id: assessmentId, studentId: student.id, deleted: false },
      });

      if (!assessmentFound) {
        return res.status(404).json({
          ok: false,
          message: 'Avaliação não encontrada na base de dados',
        });
      }

      return res.status(201).json({
        ok: true,
        message: 'Avaliação encontrada com sucesso',
        data: assessmentFound,
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

  public static async update(req: Request, res: Response) {
    try {
      const { assessmentId } = req.params;
      const { student, title, rate, deadline } = req.body;

      const assessmentFound = await prismaConnection.assessment.findUnique({
        where: { id: assessmentId, studentId: student.id, deleted: false },
      });

      if (!assessmentFound) {
        return res.status(404).json({
          ok: false,
          message: 'Avaliação não encontrada na base de dados',
        });
      }

      const assessmentUpdated = await prismaConnection.assessment.update({
        where: { id: assessmentId, studentId: student.id, deleted: false },
        data: {
          title: title,
          rate: rate,
          deadline: new Date(deadline),
        },
      });

      return res.status(201).json({
        ok: true,
        message: 'Avaliação atualizada com sucesso',
        data: assessmentUpdated,
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

  public static async delete(req: Request, res: Response) {
    try {
      const { assessmentId } = req.params;
      const { student } = req.body;

      const assessmentFound = await prismaConnection.assessment.findUnique({
        where: { id: assessmentId, studentId: student.id, deleted: false },
      });

      if (!assessmentFound) {
        return res.status(404).json({
          ok: false,
          message: 'Avaliação não encontrada na base de dados',
        });
      }

      const assessmentDeleted = await prismaConnection.assessment.update({
        where: { id: assessmentId, studentId: student.id, deleted: false },
        data: { deleted: true, deletedAt: new Date() },
      });

      return res.status(201).json({
        ok: true,
        message: 'Avaliação deletada com sucesso',
        data: assessmentDeleted,
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
