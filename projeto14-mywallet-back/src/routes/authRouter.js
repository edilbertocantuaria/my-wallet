import { Router } from 'express';
import { singupUser, loginUser } from '../controllers/authController.js';

import singupUserSchemaValidationMiddleware from '../middlewares/authSchemaValidationMiddleware.js';
import loginSchemaValidationMiddleware from '../middlewares/authSchemaValidationMiddleware.js';

const authRouter = Router();
authRouter.post("/singupUser", singupUserSchemaValidationMiddleware, singupUser);
authRouter.post("/", loginSchemaValidationMiddleware, loginUser);

export default authRouter;


