import { Router } from 'express';
import { singupUser, loginUser } from '../controllers/authController.js';

import cadastroSchemaValidationMiddleware from '../middlewares/authSchemaValidationMiddleware.js';
import loginSchemaValidationMiddleware from '../middlewares/authSchemaValidationMiddleware.js';

const authRouter = Router();
authRouter.post("/cadastro", cadastroSchemaValidationMiddleware, singupUser);
authRouter.post("/", loginSchemaValidationMiddleware, loginUser);

export default authRouter;


