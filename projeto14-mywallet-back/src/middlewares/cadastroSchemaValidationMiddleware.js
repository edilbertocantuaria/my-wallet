import cadastroSchema from "../schemas/cadastroSchema.js";

export default function cadastroSchemaValidationMiddleware(req, res, next) {
    const validation = cadastroSchema.validate(req.body);
    if (validation.error) {
        //return res.sendStatus(422);
        return res.status(422).send(validation.error);
    }

    next();
}