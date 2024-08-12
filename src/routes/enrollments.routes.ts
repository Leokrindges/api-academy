import { Router } from 'express';
import { EnrollmentsController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

export class EnrollmentsRoutes {
  public static execute(): Router {
    const router = Router();

    router.post('/', [AuthMiddleware.validate], EnrollmentsController.create);

    // listagem das turmas em que o aluno logado está matriculado
    router.get('/', [AuthMiddleware.validate]);

    return router;
  }
}
