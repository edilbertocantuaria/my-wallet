import { Router } from 'express';
import { loginUser } from '../controllers/loginController.js';

import loginSchemaValidationMiddleware from '../middlewares/loginSchemaValidationMiddleware.js';

const loginRouter = Router();
loginRouter.post("/", loginSchemaValidationMiddleware, loginUser);

export default loginRouter;