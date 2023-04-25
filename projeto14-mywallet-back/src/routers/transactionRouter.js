import { Router } from 'express';
import { transactionOperation, allTransactions } from '../controllers/transactionController.js';
import { transactionSchemaValidationMiddleware } from '../middlewares/transactionSchemaValidationMiddleware.js';

import { tokenValidation } from "../middlewares/tokenSchemaValidationMiddleware.js"

const transactionRouter = Router();

transactionRouter.use(tokenValidation)
transactionRouter.post("/newTransaction/:operation", transactionSchemaValidationMiddleware, transactionOperation);

transactionRouter.get("/home", allTransactions)


export default transactionRouter;


