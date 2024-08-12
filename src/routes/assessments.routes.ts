import { Router } from 'express';
import { AssessmentsController } from '../controllers';
import {
  AssessmentIdFormatMiddleware,
  AuthMiddleware,
  CreateAssessmentMiddleware,
  PaginationParamsMiddleware,
} from '../middlewares';

export class AssessmentsRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      '/',
      [
        AuthMiddleware.validate,
        CreateAssessmentMiddleware.validateMissingFields,
        CreateAssessmentMiddleware.validateFieldTypes,
        CreateAssessmentMiddleware.validateFieldsValue,
      ],
      AssessmentsController.create,
    );
    router.get(
      '/',
      [AuthMiddleware.validate, PaginationParamsMiddleware.validate],
      AssessmentsController.list,
    );
    router.get(
      '/:assessmentId',
      [AuthMiddleware.validate, AssessmentIdFormatMiddleware.validate],
      AssessmentsController.get,
    );
    router.put(
      '/:assessmentId',
      [AuthMiddleware.validate, AssessmentIdFormatMiddleware.validate],
      AssessmentsController.update,
    );
    router.delete(
      '/:assessmentId',
      [AuthMiddleware.validate, AssessmentIdFormatMiddleware.validate],
      AssessmentsController.delete,
    );

    return router;
  }
}
