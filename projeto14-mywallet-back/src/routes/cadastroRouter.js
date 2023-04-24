import { Router } from 'express';

import { postUser } from '../controllers/cadastroController.js';

import cadastroSchemaValidationMiddleware from '../middlewares/cadastroSchemaValidationMiddleware.js';

const cadastroRouter = Router();

cadastroRouter.post("/cadastro", cadastroSchemaValidationMiddleware, postUser);

export default cadastroRouter;