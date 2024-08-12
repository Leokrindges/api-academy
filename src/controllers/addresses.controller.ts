import { Request, Response } from 'express';
import { prismaConnection } from '../database/prisma.connection';

export class AddressesController {
  public static async create(req: Request, res: Response) {
    try {
      const {
        street,
        addressNumber,
        zipCode,
        complement,
        neighborhood,
        city,
        uf,
        student,
      } = req.body;

      const addressAlreadyRegistered =
        await prismaConnection.address.findUnique({
          where: { studentId: student.id, deleted: false },
        });

      if (addressAlreadyRegistered) {
        return res.status(400).json({
          ok: false,
          message: 'Já existe um endereço cadastrado para o aluno.',
        });
      }

      const newAddress = await prismaConnection.address.create({
        data: {
          street,
          addressNumber,
          zipCode,
          complement,
          neighborhood,
          city,
          uf,
          studentId: student.id,
        },
      });

      return res.status(200).json({
        ok: true,
        message: 'Endereço cadastrado',
        data: newAddress,
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
      const { student } = req.body;

      const addressFound = await prismaConnection.address.findUnique({
        where: { studentId: student.id, deleted: false },
      });

      if (!addressFound) {
        return res.status(404).json({
          ok: false,
          message: 'Nenhum endereço encontrado para o aluno.',
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Endereço encontrado com sucesso',
        data: addressFound,
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
      const {
        street,
        addressNumber,
        zipCode,
        complement,
        neighborhood,
        city,
        uf,
        student,
      } = req.body;

      const addressFound = await prismaConnection.address.findUnique({
        where: { studentId: student.id, deleted: false },
      });

      if (!addressFound) {
        return res.status(404).json({
          ok: false,
          message: 'Nenhum endereço encontrado para o aluno.',
        });
      }

      const addressUpdated = await prismaConnection.address.update({
        where: { id: addressFound.id },
        data: {
          street,
          addressNumber,
          zipCode,
          complement,
          neighborhood,
          city,
          uf,
        },
      });

      return res.status(200).json({
        ok: true,
        message: 'Endereço atualizado com sucesso',
        data: addressUpdated,
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
      const { student } = req.body;

      const addressFound = await prismaConnection.address.findUnique({
        where: { studentId: student.id, deleted: false },
      });

      if (!addressFound) {
        return res.status(404).json({
          ok: false,
          message: 'Nenhum endereço encontrado para o aluno.',
        });
      }

      const addressDeleted = await prismaConnection.address.update({
        where: { id: addressFound.id },
        data: { deleted: true, deletedAt: new Date() },
      });

      return res.status(200).json({
        ok: true,
        message: 'Endereço deletado com sucesso',
        data: addressDeleted,
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
