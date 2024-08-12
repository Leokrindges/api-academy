import { Router } from 'express';
import { AddressesController } from '../controllers';
import {
  AuthMiddleware,
  CreateAddressMiddleware,
  UpdateAddressMiddleware,
} from '../middlewares';

export class AddressesRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      '/',
      [
        AuthMiddleware.validate,
        CreateAddressMiddleware.validateMissingFields,
        CreateAddressMiddleware.validateFieldTypes,
        CreateAddressMiddleware.validateFieldsValue,
      ],
      AddressesController.create,
    );
    router.get('/', [AuthMiddleware.validate], AddressesController.get);
    router.put(
      '/',
      [
        AuthMiddleware.validate,
        UpdateAddressMiddleware.validateFieldTypes,
        UpdateAddressMiddleware.validateFieldsValue,
      ],
      AddressesController.update,
    );
    router.delete('/', [AuthMiddleware.validate], AddressesController.delete);

    return router;
  }
}
