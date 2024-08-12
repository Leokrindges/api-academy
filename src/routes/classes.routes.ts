import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';

export class ClassesRoutes {
  public static execute(): Router {
    const router = Router();

    router.get('/', [AuthMiddleware.validate]);

    return router;
  }
}
