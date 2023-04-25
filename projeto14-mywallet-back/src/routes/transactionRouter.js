import { Router } from 'express';
import { transactionOperation } from '../controllers/transactionController.js';
import { transactionSchemaValidationMiddleware } from '../middlewares/transactionSchemaValidationMiddleware.js';

import { tokenValidation } from "../middlewares/tokenSchemaValidationMiddleware.js"

const transactionRouter = Router();

transactionRouter.use(tokenValidation)
transactionRouter.post("/newTransaction/:operation", transactionSchemaValidationMiddleware, transactionOperation);


export default transactionRouter;


