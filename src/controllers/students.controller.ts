import { Request, Response } from 'express';
import { prismaConnection } from '../database/prisma.connection';

export class StudentsController {
  public static async create(req: Request, res: Response) {
    try {
      const { name, age, document, email, password } = req.body;

      const documentAlreadyRegistered =
        await prismaConnection.student.findUnique({
          where: { documentIdentification: document },
        });

      if (documentAlreadyRegistered) {
        return res.status(400).json({
          ok: false,
          message: 'Documento CPF já registrado por outro aluno',
        });
      }

      const emailAlreadyRegistered = await prismaConnection.student.findUnique({
        where: { emailAddress: email },
      });

      if (emailAlreadyRegistered) {
        return res.status(400).json({
          ok: false,
          message: 'Endereço de e-mail já registrado por outro aluno',
        });
      }

      const newStudent = await prismaConnection.student.create({
        data: {
          name,
          age,
          password,
          documentIdentification: document,
          emailAddress: email,
        },
      });

      return res.status(201).json({
        ok: true,
        message: 'Aluno cadastrado com sucesso!',
        data: newStudent,
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

      let limitDefault = 10;
      let pageDefault = 1;

      if (limit) {
        limitDefault = Number(limit);
      }

      if (page) {
        pageDefault = Number(page);
      }

      const count = await prismaConnection.student.count({
        where: {
          deleted: false,
        },
      });

      if (!count) {
        return res.status(200).json({
          ok: true,
          message: 'Alunos listados com sucesso',
          data: [],
          pagination: {
            limit: limitDefault,
            page: 1,
            count: 0,
            totalPages: 1,
          },
        });
      }

      const students = await prismaConnection.student.findMany({
        skip: limitDefault * (pageDefault - 1),
        take: limitDefault,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          deleted: false,
        },
      });

      return res.status(200).json({
        ok: true,
        message: 'Alunos listados com sucesso',
        data: students,
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
      const { studenId } = req.params;

      const studentFound = await prismaConnection.student.findUnique({
        where: {
          id: studenId,
          deleted: false,
        },
      });

      if (!studentFound) {
        return res.status(404).json({
          ok: false,
          message: 'O aluno não encontrado na base de dados',
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Aluno encontrado',
        data: studentFound,
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
      const { studenId } = req.params;
      const { name, age } = req.body;

      const studentFound = await prismaConnection.student.findUnique({
        where: {
          id: studenId,
          deleted: false,
        },
      });

      if (!studentFound) {
        return res.status(404).json({
          ok: false,
          message: 'O aluno não encontrado na base de dados',
        });
      }

      const studentUpdated = await prismaConnection.student.update({
        where: {
          id: studenId,
          deleted: false,
        },
        data: {
          name: name,
          age: age,
        },
      });

      return res.status(200).json({
        ok: true,
        message: 'Aluno atualizado',
        data: studentUpdated,
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
      const { studenId } = req.params;

      const studentFound = await prismaConnection.student.findUnique({
        where: {
          id: studenId,
          deleted: false,
        },
      });

      if (!studentFound) {
        return res.status(404).json({
          ok: false,
          message: 'O aluno não encontrado na base de dados',
        });
      }

      const studentDeleted = await prismaConnection.student.update({
        where: { id: studenId, deleted: false },
        data: { deleted: true, deletedAt: new Date() },
      });

      return res.status(200).json({
        ok: true,
        message: 'Aluno deletado com sucesso',
        data: studentDeleted,
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
