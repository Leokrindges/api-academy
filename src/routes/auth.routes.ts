import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware, LoginMiddleware } from '../middlewares';

export class AuthRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      '/login',
      [
        LoginMiddleware.validateMissingFields,
        LoginMiddleware.validateFieldTypes,
      ],
      AuthController.login,
    );
    router.post('/logout', [AuthMiddleware.validate], AuthController.logout);

    return router;
  }
}
