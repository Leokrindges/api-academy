import { Router } from 'express';
import { StudentsController } from '../controllers';
import {
  CreateStudentMiddleware,
  PaginationParamsMiddleware,
  StudentIdFormatMiddleware,
  UpdateStudentMiddleware,
} from '../middlewares';

export class StudentsRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      '/',
      [
        CreateStudentMiddleware.validateMissingFields,
        CreateStudentMiddleware.validateFieldTypes,
        CreateStudentMiddleware.validateFieldsValue,
      ],
      StudentsController.create,
    );
    router.get(
      '/',
      [PaginationParamsMiddleware.validate],
      StudentsController.list,
    );
    router.get(
      '/:studenId',
      [StudentIdFormatMiddleware.validate],
      StudentsController.get,
    );
    router.delete(
      '/:studenId',
      [StudentIdFormatMiddleware.validate],
      StudentsController.delete,
    );

    router.put(
      '/:studenId',
      [
        StudentIdFormatMiddleware.validate,
        UpdateStudentMiddleware.validateFieldTypes,
        UpdateStudentMiddleware.validateFieldsValue,
      ],
      StudentsController.update,
    );

    return router;
  }
}
