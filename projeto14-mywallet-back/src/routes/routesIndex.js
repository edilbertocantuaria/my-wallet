import { Router } from "express";
import authRouter from './authRouter.js';
//importar as rotas aqui

const router = Router();
router.use(authRouter);

//router.use(userRouter);
export default router;