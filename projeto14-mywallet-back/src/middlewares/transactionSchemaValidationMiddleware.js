import { transactionSchema } from "../schemas/transactionSchema.js";


export function transactionSchemaValidationMiddleware(req, res, next) {
    const validation = transactionSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("transaction middleware");
    }

    next();
}
