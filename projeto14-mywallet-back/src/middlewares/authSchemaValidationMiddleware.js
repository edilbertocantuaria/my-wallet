import { singupUserSchema, loginSchema } from "../schemas/authSchema.js";


export function singupUserSchemaValidationMiddleware(req, res, next) {
    const validation = singupUserSchema.validate(req.body);
    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}

export function loginSchemaValidationMiddleware(req, res, next) {
    const validation = loginSchema.validate(req.body);
    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}