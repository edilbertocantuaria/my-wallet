import { Router } from "express";
import cadastroRouter from './cadastroRouter.js'
//importar as rotas aqui

const router = Router();

router.use(cadastroRouter);


//router.use(userRouter);
export default router;