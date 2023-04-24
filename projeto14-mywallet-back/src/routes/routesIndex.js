import { Router } from "express";
import cadastroRouter from './cadastroRouter.js';
import loginRouter from './loginRouter.js';
//importar as rotas aqui

const router = Router();

router.use(cadastroRouter);
router.use(loginRouter);


//router.use(userRouter);
export default router;